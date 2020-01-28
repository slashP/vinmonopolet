using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Api;
using Vinmonopolet.Data;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class ApiController : Controller
    {
        readonly ApplicationDbContext _db;
        readonly IStaticBeerProvider _staticBeerProvider;

        public ApiController(ApplicationDbContext db, ITime time, IStaticBeerProvider staticBeerProvider)
        {
            _db = db;
            _staticBeerProvider = staticBeerProvider;
        }

        [HttpGet]
        [Route("api/beers")]
        public JsonResult ApiBeers(string query = "Porter stout")
        {
            var beerCategory = BeerCategoryFromQuery(query);

            var beers =
                _staticBeerProvider.AllLocations()
                    .Where(x => x.StockStatus == StockStatus.InStock && (query != "*"
                                    ? x.WatchedBeer.Name.ContainsCaseInsensitive(query) ||
                                      x.WatchedBeer.BeerCategory == beerCategory ||
                                      x.WatchedBeer.Brewery.ContainsCaseInsensitive(query)
                                    : x.StockLevel > 0))
                    .ToList()
                .GroupBy(x => x.WatchedBeer.MaterialNumber)
                .ToList();

            var frontendBeerLocations = BeerWithStockMapper.BuildBeers(beers, _staticBeerProvider.UntappdBeers());
            return Json(frontendBeerLocations);
        }

        [HttpGet("api/new")]
        public JsonResult ApiNew()
        {
            var toBeAnnounced =
                _staticBeerProvider.AllLocations()
                    .Where(x => x.StockStatus == StockStatus.ToBeAnnounced)
                    .ToList()
                .GroupBy(x => x.WatchedBeer.MaterialNumber)
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