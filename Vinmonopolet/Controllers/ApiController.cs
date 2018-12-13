using System.Linq;
using System.Threading.Tasks;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Api;
using Vinmonopolet.Data;
using Vinmonopolet.Models;

namespace Vinmonopolet.Controllers
{
    public class ApiController : Controller
    {
        readonly ApplicationDbContext _db;
        private readonly BeerWithStockMapper _beerWithStockMapper;

        public ApiController(ApplicationDbContext db)
        {
            _db = db;
            _beerWithStockMapper = new BeerWithStockMapper();
        }

        [HttpGet]
        [Route("api/beers")]
        public async Task<JsonResult> ApiBeers(string query = "Porter stout")
        {
            var beerCategory = BeerCategoryFromQuery(query);

            var beers =
                (await _db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store)
                    .Where(x => x.StockStatus == StockStatus.InStock && (query != "*" ? (x.WatchedBeer.Name.Contains(query) || x.WatchedBeer.BeerCategory == beerCategory) : x.StockLevel > 0))
                    .ToListAsync())
                .GroupBy(x => x.WatchedBeer.MaterialNumber)
                .ToList();

            var UntappdIds = beers.SelectMany(x => x.Select(y => y.WatchedBeer.UntappdId)).Distinct().ToList();
            var untappdBeers = _db.UntappdBeers.Where(x => UntappdIds.Contains(x.Id)).ToList();

            var frontendBeerLocations = _beerWithStockMapper.BuildBeers(beers, untappdBeers);

            return Json(frontendBeerLocations);
        }

        private static BeerCategory BeerCategoryFromQuery(string query)
        {
            var beerCategory = WatchedBeer.Category(query);
            if (beerCategory == BeerCategory.Unknown)
            {
                var enumValue = query.DehumanizeTo(typeof(BeerCategory), OnNoMatch.ReturnsNull);
                if (enumValue != null)
                {
                    return (BeerCategory)enumValue;
                }
            }

            return beerCategory;
        }
    }
}