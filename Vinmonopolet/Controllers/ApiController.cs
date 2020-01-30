using System.Linq;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Vinmonopolet.Api;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class ApiController : Controller
    {
        readonly IStaticBeerProvider _staticBeerProvider;

        public ApiController(IStaticBeerProvider staticBeerProvider)
        {
            _staticBeerProvider = staticBeerProvider;
        }

        [HttpGet]
        [Route("api/beers")]
        public JsonResult ApiBeers(string query = "Porter stout")
        {
            var beerCategory = BeerCategoryFromQuery(query);

            var beers =
                _staticBeerProvider.AllBeers()
                    .Where(x => x.BeerLocations.Any(l => l.StockStatus == StockStatus.InStock) && (query != "*"
                                    ? x.Name.ContainsCaseInsensitive(query) ||
                                      x.BeerCategory == beerCategory ||
                                      x.Brewery.ContainsCaseInsensitive(query)
                                    : x.BeerLocations.Any(l => l.StockLevel > 0)))
                    .ToList();

            var frontendBeerLocations = BeerWithStockMapper.BuildBeers(beers, _staticBeerProvider.UntappdBeers());
            return Json(frontendBeerLocations);
        }

        [HttpGet("api/new")]
        public JsonResult ApiNew()
        {
            var toBeAnnounced =
                _staticBeerProvider.AllBeers()
                    .Where(x => x.VinmonopoletStatus == "lanseres")
                    .ToList();
            var frontendBeerLocations = BeerWithStockMapper.BuildBeers(toBeAnnounced, _staticBeerProvider.UntappdBeers());
            return Json(frontendBeerLocations);
        }

        private static BeerCategory? BeerCategoryFromQuery(string query)
        {
            var beerCategory = WatchedBeer.Category(query);
            if (beerCategory != BeerCategory.Unknown) return beerCategory;
            var enumValue = query.DehumanizeTo(typeof(BeerCategory), OnNoMatch.ReturnsNull);
            return (BeerCategory?) enumValue;
        }
    }
}