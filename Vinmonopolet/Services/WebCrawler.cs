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
            foreach (var visibleInSearch in new[] { "true", "false" })
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

            var productInfo = htmlDoc.DocumentNode.FirstElementWithClass("div", "product__all-info");
            var siblingOfElementStartingWithInnerText = productInfo.SiblingOfElementStartingWithInnerText("dt", "Alkoholprosent");
            var alcohol = siblingOfElementStartingWithInnerText?.InnerText.ExtractDecimal();
            if (!alcohol.HasValue)
            {
                return null;
            }

            var beerType = productInfo.SiblingOfElementStartingWithInnerText("dt", "Varetype")?.InnerText?.Split(',').LastOrDefault()?.Trim().Substring(64);
            return new WatchedBeer
            {
                Name = htmlDoc.DocumentNode.FirstElementWithClass("div", "product")?.Descendants("h1").First().InnerText.RemoveEmptyCharacters().Substring(256),
                AlcoholPercentage = alcohol.Value,
                Type = beerType,
                //Brewery = productInfo.SiblingOfElementStartingWithInnerText("dt", "Produsent")?.InnerText,
                //Country = productInfo.SiblingOfElementStartingWithInnerText("dt", "Land")?.InnerText.RemoveEmptyCharacters().Split(',').First(),
                //Volume = (htmlDoc.DocumentNode.FirstElementWithClass("span", "product__amount")?.InnerText.ExtractDecimal() ?? 0) / 100,
                MaterialNumber = basicProduct.ProductNumber,
                Price = htmlDoc.DocumentNode.FirstElementWithClass("span", "product__price")?.InnerText.ExtractDecimal() ?? 0,
                BeerCategory = WatchedBeer.Category(beerType)
            };
        }

        static async Task<HtmlDocument> HtmlFromSearchPage(HttpClient client, string storeId, int pageNumber, string visibleInSearch)
        {
            var html = await client.GetStringAsync(
                $"vmpSite/search?q=%3Arelevance%3AavailableInStores%3A{storeId}%3AmainCategory%3A%C3%B8l%3AvisibleInSearch%3A{visibleInSearch}&page={pageNumber}");
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
                        StockStatusString = x.FirstElementWithClass("div", "product-stock-status")?.InnerText
                                                .Trim() ?? string.Empty
                    }
                ).Where(x => x.LinkToProductPage != null)
                .Select(x =>
                {
                    var quantityInStock = x.StockStatusString?.RemoveEmptyCharacters()
                        .Split(':').LastOrDefault()
                        ?.Replace("på lager", string.Empty).ExtractInteger();
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

            return stockStatusString.Contains("lanseres") ? StockStatus.ToBeAnnounced : StockStatus.Unknown;
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