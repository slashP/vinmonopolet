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
        readonly BeerWithStockMapper _beerWithStockMapper;
        readonly ITime _time;
        readonly IStaticBeerProvider _staticBeerProvider;

        public ApiController(ApplicationDbContext db, ITime time, IStaticBeerProvider staticBeerProvider)
        {
            _db = db;
            _beerWithStockMapper = new BeerWithStockMapper();
            _time = time;
            _staticBeerProvider = staticBeerProvider;
        }

        [HttpGet]
        [Route("api/beers")]
        public async Task<JsonResult> ApiBeers(string query = "Porter stout")
        {
            var beerCategory = BeerCategoryFromQuery(query);

            var beers =
                _staticBeerProvider.All()
                    .Where(x => x.StockStatus == StockStatus.InStock && (query != "*"
                                    ? x.WatchedBeer.Name.ContainsCaseInsensitive(query) ||
                                      x.WatchedBeer.BeerCategory == beerCategory ||
                                      x.WatchedBeer.Brewery.ContainsCaseInsensitive(query)
                                    : x.StockLevel > 0))
                    .ToList()
                .GroupBy(x => x.WatchedBeer.MaterialNumber)
                .ToList();

            var UntappdIds = beers.SelectMany(x => x.Select(y => y.WatchedBeer.UntappdId)).Distinct().ToList();
            var untappdBeers = await _db.UntappdBeers.Where(x => UntappdIds.Contains(x.Id)).ToListAsync();

            var frontendBeerLocations = _beerWithStockMapper.BuildBeers(beers, untappdBeers);

            return Json(frontendBeerLocations);
        }

        [HttpGet("api/new")]
        public JsonResult ApiNew()
        {
            var toBeAnnounced =
                _staticBeerProvider.All()
                    .Where(x => x.StockStatus == StockStatus.ToBeAnnounced)
                    .ToList()
                .GroupBy(x => x.WatchedBeer.MaterialNumber)
                .ToList();

            var untappdIds = toBeAnnounced.SelectMany(x => x.Select(y => y.WatchedBeer.UntappdId)).ToList();
            var untappdBeers = _db.UntappdBeers.Where(x => untappdIds.Contains(x.Id)).ToList();

            var frontendBeerLocations = _beerWithStockMapper.BuildBeers(toBeAnnounced, untappdBeers);

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