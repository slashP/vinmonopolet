using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;
using Vinmonopolet.Models;
using Vinmonopolet.Models.BeerViewModels;

namespace Vinmonopolet.Controllers
{
    public class BeerController : Controller
    {
        readonly ApplicationDbContext _db;

        public BeerController(ApplicationDbContext db)
        {
            _db = db;
        }

        [Route("")]
        public async Task<ActionResult> Pol(string query = "Stout")
        {
            var groupedBeers =
                (await _db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store)
                    .Where(x => x.WatchedBeer.Name.Contains(query) || x.WatchedBeer.Type.Contains(query))
                    .ToListAsync())
                .GroupBy(x => x.Store.Name)
                .OrderByDescending(x => x.Count())
                .ToList();
            var types = await _db.WatchedBeers.Select(x => x.Type).Distinct().ToListAsync();
            return View(new PolViewModel
            {
                GroupedBeers = groupedBeers,
                Types = types,
                SearchTerm = query
            });
        }

        [Route("new")]
        public async Task<ActionResult> ToBeAnnounced()
        {
            var toBeAnnounced = await _db.BeerLocations
                .Include(x => x.Store)
                .Include(x => x.WatchedBeer)
                .Where(x => x.StockStatus == StockStatus.ToBeAnnounced).ToListAsync();
            return View(toBeAnnounced.GroupBy(x => x.Store.Name));
        }
    }
}