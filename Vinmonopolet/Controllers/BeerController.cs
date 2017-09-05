using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Humanizer;
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
        public async Task<ActionResult> Pol(string query = "PorterStout")
        {
            var beerCategory = BeerCategoryFromQuery(query);

            var groupedBeers =
                (await _db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store)
                    .Where(x => x.WatchedBeer.Name.Contains(query) || x.WatchedBeer.BeerCategory == beerCategory)
                    .ToListAsync())
                .GroupBy(x => x.Store.Name)
                .OrderByDescending(x => x.Count())
                .ToList();
            return View(new PolViewModel
            {
                GroupedBeers = groupedBeers,
                Types = await BeerTypes(),
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
        public async Task<ActionResult> My(string query = "PorterStout")
        {
            var beerCategory = BeerCategoryFromQuery(query);
            var user = await _userManager.GetUserAsync(User);
            var userStoreIds = await _db.UserStorePreferences.Include(x => x.Store)
                .Where(x => x.ApplicationUserId == user.Id).Select(x => x.StoreId).ToListAsync();
            var groupedBeers =
                (await _db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store)
                    .Where(x => userStoreIds.Contains(x.StoreId) &&
                                (x.WatchedBeer.Name.Contains(query) || x.WatchedBeer.BeerCategory == beerCategory))
                    .ToListAsync())
                .GroupBy(x => x.Store.Name)
                .OrderByDescending(x => x.Count())
                .ToList();
            return View("Pol", new PolViewModel
            {
                GroupedBeers = groupedBeers,
                Types = await BeerTypes(),
                SearchTerm = query
            });
        }

        private static BeerCategory BeerCategoryFromQuery(string query)
        {
            var beerCategory = WatchedBeer.Category(query);
            if (beerCategory == BeerCategory.Unknown)
            {
                var enumValue = query.DehumanizeTo(typeof(BeerCategory), OnNoMatch.ReturnsNull);
                if (enumValue != null)
                {
                    return (BeerCategory) enumValue;
                }
            }

            return beerCategory;
        }

        private async Task<IEnumerable<string>> BeerTypes()
        {
            var types = await _db.WatchedBeers.Select(x => x.BeerCategory).Distinct().ToListAsync();
            return types.Select(x => x.Humanize()).OrderBy(x => x);
        }
    }
}