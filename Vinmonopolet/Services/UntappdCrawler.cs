using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Services
{
    public class UntappdCrawler
    {
        static readonly string[] SingleCharacterTerms = {" ", ".", ",", ":"};

        static readonly string[] UseLessTerms = new[] {
            "ipa", "barleywine", "barley wine", "double", "quad", "strong ale", "tripel", "blonde ale", "bock",
            "doppelbock", "helles", "brown ale", "cider", "dark ale", "bitter", "fruit beer", "heffeweizen",
            "new england", "imperial", "stout", "lager", "lambic", "mead", "old ale", "pale ale", "pilsner", "porter",
            "red ale", "saison", "sour", "berliner weisse", "flanders", "oud bruin", "gose", "geuze", "wit", "edition",
            "ed.", "barrel aged", "imp.", "christmas"
        }.Select(x => SingleCharacterTerms.Select(y => new[] { $"{y}{x}", $"{x}{y}" })).SelectMany(x => x).SelectMany(x => x).ToArray();

        public async Task<BasicBeer> CrawlBeer(WatchedBeer watchedBeer)
        {
            var client = new HttpClient
            {
                BaseAddress = new Uri("https://untappd.com")
            };
            var searchTerm = watchedBeer.Name;
            var beers = await BeerSearchResults(client, searchTerm);

            var beer = FindSuitableBeer(beers, watchedBeer);
            var newSearchTerm = RemoveCommonTermsFromName(searchTerm);
            if (beer == null && newSearchTerm != searchTerm)
            {
                beers = await BeerSearchResults(client, newSearchTerm);
                beer = FindSuitableBeer(beers, watchedBeer);
            }

            if (beer != null)
            {
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
                    Abv = beer.Abv,
                    AverageScore = beer.Rating,
                    Description = beerInfo.Description,
                    Ibu = beer.Ibu,
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

            Debug.WriteLine($"Could not find beer with name {watchedBeer}.");
            return null;
        }

        static string RemoveCommonTermsFromName(string beerName)
        {
            return UseLessTerms.Aggregate(beerName,
                (current, useLessTerm) => Regex.Replace(current, useLessTerm, string.Empty, RegexOptions.IgnoreCase));
        }

        static UntappdSearchResult FindSuitableBeer(List<UntappdSearchResult> beers, WatchedBeer watchedBeer)
        {
            if (!beers.Any())
            {
                return null;
            }

            bool AbvDifferenceLessThan(UntappdSearchResult x, double diff) => Math.Abs(x.Abv - (double)watchedBeer.AlcoholPercentage) < diff;

            var beer = beers.First();
            if (!AbvDifferenceLessThan(beer, .2))
            {
                return beers.FirstOrDefault(x => AbvDifferenceLessThan(x, .01));
            }

            return beer;
        }

        static async Task<List<UntappdSearchResult>> BeerSearchResults(HttpClient client, string searchTerm)
        {
            var html = await HtmlFromPage(client, $"search?q={WebUtility.UrlEncode(searchTerm)}");
            var beers = html.ElementsWithClass("div", "beer-item").Select(x => new UntappdSearchResult
            {
                Link = x.Element("a").GetAttributeValue("href", string.Empty),
                Image = x.Element("a").Element("img").GetAttributeValue("src", string.Empty),
                Name = x.FirstElementWithClass("p", "name")?.InnerText,
                Brewery = x.FirstElementWithClass("p", "brewery")?.InnerText,
                Style = x.FirstElementWithClass("p", "style")?.InnerText,
                Abv = x.FirstElementWithClass("p", "abv")?.InnerText?.Replace("ABV", string.Empty).Trim().ExtractDouble() ?? 0,
                Ibu = x.FirstElementWithClass("p", "ibu")?.InnerText?.Replace("IBU", string.Empty).Trim().ExtractDouble() ?? 0,
                Rating = x.FirstElementWithClass("span", "num")?.InnerText.ExtractDouble() ?? 0
            }).ToList();
            return beers;
        }

        static async Task<HtmlNode> HtmlFromPage(HttpClient client, string requestUri)
        {
            var html = await client.GetStringAsync(requestUri);
            var htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);
            return htmlDoc.DocumentNode;
        }

        class UntappdSearchResult
        {
            public string Link { get; set; }
            public string Image { get; set; }
            public string Name { get; set; }
            public string Brewery { get; set; }
            public string Style { get; set; }
            public double Abv { get; set; }
            public double Ibu { get; set; }
            public double Rating { get; set; }
        }
    }
}