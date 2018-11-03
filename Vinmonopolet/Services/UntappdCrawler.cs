using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Services
{
    public class UntappdCrawler
    {

        public async Task<BasicBeer> CrawlBeer(string beerName)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://untappd.com")
            };
            var html = await HtmlFromPage(client, $"search?q={WebUtility.UrlEncode(beerName)}");
            var beers = html.ElementsWithClass("div", "beer-item").Select(x => new
            {
                Link = x.Element("a").GetAttributeValue("href", string.Empty),
                Image = x.Element("a").Element("img").GetAttributeValue("src", string.Empty),
                Name = x.FirstElementWithClass("p", "name")?.InnerText,
                Brewery = x.FirstElementWithClass("p", "brewery")?.InnerText,
                Style = x.FirstElementWithClass("p", "style")?.InnerText,
                Abv = x.FirstElementWithClass("p", "abv")?.InnerText?.Replace("ABV", string.Empty).Trim(),
                Ibu = x.FirstElementWithClass("p", "ibu")?.InnerText?.Replace("IBU", string.Empty).Trim(),
                Rating = x.FirstElementWithClass("span", "num")?.InnerText
            }).ToList();

            if (beers.Any())
            {
                var beer = beers.First();
                var beerHtml = await HtmlFromPage(client, beer.Link);
                var stats = beerHtml.FirstElementWithClass("div", "stats");
                var beerInfo = new
                {
                    TotalCheckins = stats.SiblingOfElementStartingWithInnerText("span", "Total")?.InnerText,
                    TotalUserCount = stats.SiblingOfElementStartingWithInnerText("span", "Unique")?.InnerText,
                    MonthlyCheckins = stats.SiblingOfElementStartingWithInnerText("span", "Monthly")?.InnerText,
                    Description = beerHtml.FirstElementWithClass("div", "desc")?.Descendants("div").OrderByDescending(x => x.InnerText?.Length).FirstOrDefault()?.InnerText,
                    Ratings = beerHtml.FirstElementWithClass("p", "raters")?.InnerText?.Replace("Ratings", string.Empty).Trim()
                };

                return new BasicBeer
                {
                    Id = beer.Link.Split('/').Last(),
                    Abv = beer.Abv.ExtractDouble() ?? 0,
                    AverageScore = beer.Rating.ExtractDouble() ?? 0,
                    Description = beerInfo.Description,
                    Ibu = beer.Ibu.ExtractDouble() ?? 0,
                    LabelUrl = beer.Image,
                    MonthlyCheckins = beerInfo.MonthlyCheckins.ExtractInteger() ?? 0,
                    Name = beer.Name,
                    Ratings = beerInfo.Ratings.ExtractInteger() ?? 0,
                    Style = beer.Style,
                    TotalCheckins = beerInfo.TotalCheckins.ExtractInteger() ?? 0,
                    TotalUserCount = beerInfo.TotalUserCount.ExtractInteger() ?? 0,
                    UpdatedAt = DateTime.UtcNow
                };
            }

            Debug.WriteLine($"Could not find beer with name {beerName}.");
            return null;
        }

        static async Task<HtmlNode> HtmlFromPage(HttpClient client, string requestUri)
        {
            var html = await client.GetStringAsync(requestUri);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc.DocumentNode;
        }
    }
}