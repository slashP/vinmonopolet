using System;
using System.Collections.Generic;
using System.Linq;
using Vinmonopolet.Api.DTOs;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Api
{
    public class BeerWithStockMapper
    {
        public static IList<BeerWithStocks> BuildBeers(
            IEnumerable<WatchedBeer> watchedBeers,
            IReadOnlyDictionary<string, BasicBeer> untappdBeers,
            Func<BeerLocation, bool> locationSelector)
        {
            var returnlist = new List<BeerWithStocks>();
            foreach (var beer in watchedBeers)
            {
                untappdBeers.TryGetValue(beer.UntappdId ?? string.Empty, out var uBeer);
                var newBeer = new BeerWithStocks
                {
                    MaterialNumber = beer.MaterialNumber,
                    Name = uBeer?.Name ?? beer.Name,
                    Brewery = uBeer?.Brewery ?? beer.Brewery,
                    Type = beer.Type,
                    Price = beer.Price,
                    UntappdId = beer.UntappdId,
                    LabelUrl = uBeer?.LabelUrl,
                    Style = uBeer?.Style,
                    Volume = beer?.Volume,
                    Abv = (decimal?) uBeer?.Abv ?? beer.AlcoholPercentage,
                    Ibu = (decimal?) uBeer?.Ibu,
                    Ratings = uBeer?.Ratings,
                    AverageScore = (decimal?) uBeer?.AverageScore,
                    TotalCheckins = uBeer?.TotalCheckins,
                    MonthlyCheckins = uBeer?.MonthlyCheckins,
                    TotalUserCount = uBeer?.TotalUserCount,
                    Description = uBeer?.Description,
                    OnNewProductList = beer.OnNewProductList,
                    StoreStocks = beer.BeerLocations.Where(locationSelector).Select(x => new StoreStock
                    {
                        StockLevel = x.StockLevel,
                        StoreId = x.StoreId,
                        StoreName = x.Store.Name
                    }).ToList()
                };
                returnlist.Add(newBeer);
            }

            return returnlist;
        }
    }
}
