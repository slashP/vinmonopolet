using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NodaTime;
using NodaTime.Extensions;
using Vinmonopolet.Data;
using Vinmonopolet.Models;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class AdminController : Controller
    {
        readonly IWebCrawler _webCrawler;
        readonly ApplicationDbContext _db;
        readonly ITime _time;

        public AdminController(IWebCrawler webCrawler, ApplicationDbContext db, ITime time)
        {
            _webCrawler = webCrawler;
            _db = db;
            _time = time;
        }

        [Route("admin/fetch")]
        [HttpPost]
        public async Task<string> Jj()
        {
            var stores = await _db.Stores.Where(x => x.IsActive).ToListAsync();
            var materialNumbers = new HashSet<string>(await _db.WatchedBeers.Select(x => x.MaterialNumber).ToListAsync());
            foreach (var store in stores)
            {
                var products = await _webCrawler.Products(store.Id);
                var unknownProducts = products.Where(x => materialNumbers.Contains(x.ProductNumber) == false).ToList();
                foreach (var unknownProduct in unknownProducts)
                {
                    var product = await _webCrawler.ProductFromProductPage(unknownProduct);
                    _db.WatchedBeers.Add(product);
                }

                await _db.SaveChangesAsync();
                foreach (var basicProduct in products)
                {
                    var beer = await _db.WatchedBeers.Include(x => x.BeerLocations).FirstAsync(x => x.MaterialNumber == basicProduct.ProductNumber);
                    var location = await _db.BeerLocations.FirstOrDefaultAsync(x => x.WatchedBeerId == beer.MaterialNumber && x.StoreId == store.Id);
                    var stockLevel = basicProduct.QuantityInStock ?? 0;
                    if (location != null)
                    {
                        location.StockLevel = stockLevel;
                        location.StockStatus = basicProduct.StockStatus;
                    }
                    else
                    {
                        _db.BeerLocations.Add(new BeerLocation
                        {
                            StoreId = store.Id,
                            WatchedBeerId = beer.MaterialNumber,
                            StockLevel = stockLevel,
                            StockStatus = basicProduct.StockStatus,
                            AnnouncedDate = basicProduct.StockStatus == StockStatus.ToBeAnnounced ? _time.OsloDate : (DateTime?) null
                        });
                    }
                }

                await _db.SaveChangesAsync();
            }

            return "ok";
        }
    }
}