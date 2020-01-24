using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Vinmonopolet.Dto;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models;

namespace Vinmonopolet.Services
{
    public class WebCrawler : IWebCrawler
    {
        internal static readonly Uri BaseAddress = new Uri("https://www.vinmonopolet.no");

        public async Task<IReadOnlyCollection<BasicProduct>> Products(string storeId)
        {
            var client = Client();
            var products = new List<BasicProduct>();
            foreach (var visibleInSearch in new[] {"true", "false" })
            {
                var htmlDoc = await HtmlFromSearchPage(client, storeId, 0, visibleInSearch);
                var totalNumberOfProducts = htmlDoc.DocumentNode.FirstElementWithClass("div", "in-page-nav")?.InnerText.ExtractInteger() ?? 0;
                var firstPageProducts = BasicProductInfo(htmlDoc);
                products.AddRange(firstPageProducts);
                var productsPerPage = firstPageProducts.Count;
                if (productsPerPage == 0)
                {
                    continue;
                }

                var numberOfPages = (int)Math.Ceiling((decimal)totalNumberOfProducts / productsPerPage) - 1;
                foreach (var pageNumber in Enumerable.Range(1, numberOfPages))
                {
                    var html = await HtmlFromSearchPage(client, storeId, pageNumber, visibleInSearch);
                    products.AddRange(BasicProductInfo(html));
                }
            }

            return products;
        }

        public async Task<WatchedBeer> ProductFromProductPage(BasicProduct basicProduct)
        {
            var client = Client();
            var html = await client.GetStringAsync(basicProduct.LinkToProductPage);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);

            var productInfo = htmlDoc.DocumentNode.FirstElementWithClass("ul", "product__tab-list");
            var alcohol = htmlDoc.DocumentNode.ElementWithInnerText("li", "Alkoholprosent")?.Descendants("span")?.FirstOrDefault()?.InnerText.ExtractDecimal();
            if (!alcohol.HasValue)
            {
                return null;
            }

            var beerType = productInfo.SiblingOfElementStartingWithInnerText("span", "Varetype")?.InnerText?.Split(',').LastOrDefault()?.Trim().SafeSubstring(64);
            return new WatchedBeer
            {
                Name = htmlDoc.DocumentNode.FirstElementWithId("page").Descendants("h1").First().InnerText.RemoveEmptyCharacters().SafeSubstring(256),
                AlcoholPercentage = alcohol.Value,
                Type = beerType,
                Brewery = htmlDoc.DocumentNode.ElementWithInnerText("span", "Produsent")?.ParentNode?.InnerText?.Replace("Produsent", string.Empty).RemoveEmptyCharacters(),
                Volume = (htmlDoc.DocumentNode.FirstElementWithClass("span", "product__amount")?.InnerText.ExtractDecimal() ?? 0),
                MaterialNumber = basicProduct.ProductNumber,
                Price = htmlDoc.DocumentNode.FirstElementWithClass("span", "product__price")?.InnerText.ExtractDecimal() ?? 0,
                BeerCategory = WatchedBeer.Category(beerType)
            };
        }

        public async Task<List<string>> MaterialnrsFromNewProductsList()
        {
            var client = Client();
            var products = new List<BasicProduct>();
            var htmlDoc = await HtmlFromNewProductList(client,0);
            var totalNumberOfProductsNode = htmlDoc.DocumentNode.FirstElementWithClass("div", "in-page-nav");
            var totalNumberOfProducts = totalNumberOfProductsNode?.InnerText.ExtractInteger() ?? 0;
            var firstPageProducts = BasicProductInfo(htmlDoc);
            products.AddRange(firstPageProducts);
            var productsPerPage = firstPageProducts.Count;
            if (productsPerPage == 0)
            {
                return null;
            }

            var numberOfPages = (int)Math.Ceiling((decimal)totalNumberOfProducts / productsPerPage) - 1;
            foreach (var pageNumber in Enumerable.Range(1, numberOfPages))
            {
                var html = await HtmlFromNewProductList(client, pageNumber);
                products.AddRange(BasicProductInfo(html));
            }

            return products.Select(x => x.ProductNumber).ToList();
        }

        static async Task<HtmlDocument> HtmlFromSearchPage(HttpClient client, string storeId, int pageNumber, string visibleInSearch)
        {
            var html = await client.GetStringAsync(
                $"search?q=%3Arelevance%3AavailableInStores%3A{storeId}%3AmainCategory%3A%C3%B8l%3AvisibleInSearch%3A{visibleInSearch}&page={pageNumber}");
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;
        }

        static async Task<HtmlDocument> HtmlFromNewProductList(HttpClient client, int pageNumber)
        {
            var html = await client.GetStringAsync(
                $"/search?q=%3Arelevance%3AvisibleInSearch%3Atrue%3AmainCategory%3A%25C3%25B8l%3AnewProducts%3Atrue&page={pageNumber}");

            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc;
        }

        static IReadOnlyCollection<BasicProduct> BasicProductInfo(HtmlDocument htmlDoc)
        {
            var k = htmlDoc.DocumentNode
                .ElementsWithClass("article", "product-item__inner-container")
                .Select(x => new
                    {
                        LinkToProductPage = x.FirstElementsAttributeValue("a", "href"),
                        StockStatusString = x.FirstElementWithClass("div", "product-stock-status")?.InnerText.Trim() ?? x.FirstElementWithClass("div", "product-item__actions")?.InnerText.Trim()
                }
                ).Where(x => x.LinkToProductPage != null)
                .Select(x =>
                {
                    var quantityInStock = x.StockStatusString?.RemoveEmptyCharacters()
                        .Split('\n').FirstOrDefault()?.ExtractInteger();
                    return new BasicProduct
                    {
                        LinkToProductPage = x.LinkToProductPage,
                        ProductNumber = x.LinkToProductPage.Split('/').Last(),
                        QuantityInStock = quantityInStock,
                        StockStatus = Status(quantityInStock, x.StockStatusString)
                    };
                }).ToList();
            return k;
        }

        static StockStatus Status(int? quantityInStock, string stockStatusString)
        {
            if (quantityInStock.HasValue)
            {
                return quantityInStock.Value > 0 ? StockStatus.InStock : StockStatus.OutOfStock;
            }

            if (stockStatusString == null)
            {
                return StockStatus.Unknown;
            }

            return stockStatusString.ToLower().Contains("lanseres") ? StockStatus.ToBeAnnounced : StockStatus.Unknown;
        }

        static HttpClient Client()
        {
            return new HttpClient
            {
                BaseAddress = BaseAddress
            };
        }
    }
}