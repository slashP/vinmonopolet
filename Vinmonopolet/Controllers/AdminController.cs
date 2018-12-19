using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;
using Vinmonopolet.Dto;
using Vinmonopolet.Extensions;
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
            foreach (var store in stores)
            {
                var products = await _webCrawler.Products(store.Id);
                var materialNumbers = new HashSet<string>(await _db.WatchedBeers.AsNoTracking().Select(x => x.MaterialNumber).ToListAsync());
                var unknownProducts = products.Where(x => materialNumbers.Contains(x.ProductNumber) == false).ToList();
                foreach (var unknownProduct in unknownProducts)
                {
                    var product = await _webCrawler.ProductFromProductPage(unknownProduct);
                    _db.WatchedBeers.Add(product);
                }

                var productsNoLongerOnWeb =
                    (await _db.BeerLocations.AsNoTracking().Where(x => x.StoreId == store.Id)
                        .Select(x => x.WatchedBeerId).ToListAsync()).Except(products.Select(x => x.ProductNumber));
                foreach (var removedProductId in productsNoLongerOnWeb)
                {
                    var location = await _db.BeerLocations.FirstOrDefaultAsync(x => x.WatchedBeerId == removedProductId && x.StoreId == store.Id);
                    if (location != null)
                    {
                        location.StockLevel = 0;
                        location.StockStatus = StockStatus.OutOfStock;
                    }
                }

                await _db.SaveChangesAsync();
                foreach (var basicProduct in products)
                {
                    var beer = await _db.WatchedBeers.AsNoTracking().Include(x => x.BeerLocations).FirstAsync(x => x.MaterialNumber == basicProduct.ProductNumber);
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

        [Route("admin/updateProducts")]
        [HttpPost]
        public string UpdateProducts([CanBeNull] string materialNumbers)
        {
            var updateCount = 0;
            var products = materialNumbers?.Split(",").ToList() ?? _db.WatchedBeers.Where(x => x.Brewery == null).OrderByDescending(x => x.AlcoholPercentage).Select(x => x.MaterialNumber).ToList();
            foreach (var watchedBeer in products)
            {
                var basicProduct = new BasicProduct
                {
                    LinkToProductPage = $"http://www.vinmonopolet.no/p/{watchedBeer}",
                    ProductNumber = watchedBeer
                };
                var newWatchedInfo = new WatchedBeer();
                try
                {
                    newWatchedInfo = _webCrawler.ProductFromProductPage(basicProduct).Result;
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    throw;
                }

                var dbObject = _db.WatchedBeers.SingleOrDefault(x => x.MaterialNumber == newWatchedInfo.MaterialNumber);
                if (dbObject != null)
                {
                    dbObject.AlcoholPercentage = newWatchedInfo.AlcoholPercentage;
                    dbObject.Brewery = newWatchedInfo.Brewery;
                    dbObject.Price = newWatchedInfo.Price;
                    dbObject.Volume = newWatchedInfo.Volume;
                    _db.SaveChanges();
                    updateCount++;
                }
            }

            return $"{updateCount} products updated.";
        }

        [Route("admin/updateNewProductList")]
        [HttpPost]
        public async Task<string> UpdateNewProductList()
        {
            var oldNewProducts = _db.WatchedBeers.Where(x => x.OnNewProductList == true);
            foreach (WatchedBeer beer in oldNewProducts)
            {
                beer.OnNewProductList = false;
            }

            var newProductnumbers = await _webCrawler.MaterialnrsFromNewProductsList();
            var newProducts = _db.WatchedBeers.Where(x => newProductnumbers.Contains(x.MaterialNumber));
            var changedProducts = newProducts.Count();
            foreach (WatchedBeer beer in newProducts)
            {
                beer.OnNewProductList = true;
            }

            await _db.SaveChangesAsync();

            return $"{changedProducts} new products added to newlist";
        }

        [Route("admin/linkids")]
        [HttpPost]
        public async Task<string> LinkIds(string matnr, string bid)
        {
            _db.WatchedBeers.Find(matnr).UntappdId = bid;
            await _db.SaveChangesAsync();
            return $"All OK. Matnr: {matnr} now corresponds to Untappd Id: {bid}";
        }
    }
}