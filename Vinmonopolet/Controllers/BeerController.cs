using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;
using Vinmonopolet.Models;
using Vinmonopolet.Models.BeerViewModels;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class BeerController : Controller
    {
        readonly ApplicationDbContext _db;
        readonly UserManager<ApplicationUser> _userManager;
        readonly ITime _time;

        public BeerController(ApplicationDbContext db, UserManager<ApplicationUser> userManager, ITime time)
        {
            _db = db;
            _userManager = userManager;
            _time = time;
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
                .Where(x => x.StockStatus == StockStatus.ToBeAnnounced
                        || (x.AnnouncedDate != null && x.AnnouncedDate > _time.OsloDate.AddMonths(-3))).ToListAsync();
            return View(toBeAnnounced.GroupBy(x => x.Store.Name));
        }

        [Route("my")]
        [Authorize]
        public async Task<ActionResult> My(string query = "Stout")
        {
            var user = await _userManager.GetUserAsync(User);
            var userStoreIds = await _db.UserStorePreferences.Include(x => x.Store)
                .Where(x => x.ApplicationUserId == user.Id).Select(x => x.StoreId).ToListAsync();
            var groupedBeers =
                (await _db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store)
                    .Where(x => userStoreIds.Contains(x.StoreId) &&
                                (x.WatchedBeer.Name.Contains(query) || x.WatchedBeer.Type.Contains(query)))
                    .ToListAsync())
                .GroupBy(x => x.Store.Name)
                .OrderByDescending(x => x.Count())
                .ToList();
            var types = await _db.WatchedBeers.Select(x => x.Type).Distinct().ToListAsync();
            return View("Pol", new PolViewModel
            {
                GroupedBeers = groupedBeers,
                Types = types,
                SearchTerm = query
            });
        }
    }
}