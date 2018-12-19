using System.Collections.Generic;
using System.Linq;
using Vinmonopolet.Api.DTOs;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Api
{
    public class BeerWithStockMapper
    {
        public IList<BeerWithStocks> BuildBeers(
            List<IGrouping<string, BeerLocation>> locationsGroupedByMatnr, IList<BasicBeer> UntappdBeers)
        {
            var returnlist = new List<BeerWithStocks>();
            foreach (var matnr in locationsGroupedByMatnr)
            {
                var watchedBeer = matnr.First().WatchedBeer;
                var uBeer = UntappdBeers.FirstOrDefault(x => x.Id == matnr.Select(y => y.WatchedBeer.UntappdId).First());
                var newBeer = new BeerWithStocks
                {
                    MaterialNumber = matnr.Key,
                    Name = uBeer?.Name ?? watchedBeer.Name,
                    Brewery = uBeer?.Brewery ?? watchedBeer.Brewery,
                    Type = watchedBeer.Type,
                    Price = watchedBeer.Price,
                    UntappdId = watchedBeer.UntappdId,
                    LabelUrl = uBeer?.LabelUrl,
                    Style = uBeer?.Style,
                    Volume = watchedBeer?.Volume,
                    Abv = (decimal?) uBeer?.Abv ?? watchedBeer.AlcoholPercentage,
                    Ibu = (decimal?) uBeer?.Ibu,
                    Ratings = uBeer?.Ratings,
                    AverageScore = (decimal?) uBeer?.AverageScore,
                    TotalCheckins = uBeer?.TotalCheckins,
                    MonthlyCheckins = uBeer?.MonthlyCheckins,
                    TotalUserCount = uBeer?.TotalUserCount,
                    Description = uBeer?.Description,
                    OnNewProductList = watchedBeer.OnNewProductList,
                    StoreStocks = matnr.Select(x => new StoreStock()
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
