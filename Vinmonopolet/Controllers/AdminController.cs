using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EFCore.BulkExtensions;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;
using Vinmonopolet.Dto;
using Vinmonopolet.Models;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class AdminController : Controller
    {
        readonly IWebCrawler _webCrawler;
        readonly ApplicationDbContext _db;
        readonly ITime _time;
        readonly IStaticBeerProvider _staticBeerProvider;

        public AdminController(IWebCrawler webCrawler, ApplicationDbContext db, ITime time, IStaticBeerProvider staticBeerProvider)
        {
            _webCrawler = webCrawler;
            _db = db;
            _time = time;
            _staticBeerProvider = staticBeerProvider;
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
            
            await _staticBeerProvider.Update();
            return "ok";
        }

        [Route("admin/stockInfo")]
        [HttpPost]
        public async Task<string> StockInfo([FromBody] ProductsUpdateRequest request)
        {
            var products = request.Products;

            var updateBeerLocations = new List<BeerLocation>();
            var insertBeerLocations = new List<BeerLocation>();
            var allBeers = await _db.WatchedBeers.AsNoTracking().Include(x => x.BeerLocations).ToListAsync();

            foreach (var basicProduct in products)
            {
                var beer = allBeers.First(x => x.MaterialNumber == basicProduct.ProductNumber);
                var locations = beer.BeerLocations;
                foreach (var store in basicProduct.Stores)
                {
                    var location = locations.FirstOrDefault(x => x.StoreId == store.StoreId);
                    var stockLevel = store.QuantityInStock ?? 0;
                    if (location != null)
                    {
                        location.StockLevel = stockLevel;
                        location.StockStatus = StockStatus.InStock;
                        updateBeerLocations.Add(location);
                    }
                    else
                    {
                        insertBeerLocations.Add(new BeerLocation
                        {
                            StoreId = store.StoreId,
                            WatchedBeerId = beer.MaterialNumber,
                            StockLevel = stockLevel,
                            StockStatus = StockStatus.InStock
                        });
                    }
                }

                var storesWithProduct = basicProduct.Stores.Select(y => y.StoreId).ToList();
                foreach (var location in locations.Where(x => !storesWithProduct.Contains(x.StoreId)))
                {
                    location.StockLevel = 0;
                    location.StockStatus = StockStatus.OutOfStock;
                    updateBeerLocations.Add(location);
                }
            }

            var updateBeers = products.Select(x => new WatchedBeer
            {
                MaterialNumber = x.ProductNumber,
                OnNewProductList = x.IsOnNewProductList,
                Price = x.Price,
                VinmonopoletStatus = x.VinmonopoletStatus
            }).ToList();
            var bulkConfig = new BulkConfig
            {
                PropertiesToInclude = new List<string>
                {
                    nameof(WatchedBeer.OnNewProductList),
                    nameof(WatchedBeer.Price),
                    nameof(WatchedBeer.VinmonopoletStatus)
                }
            };
            await _db.BulkUpdateAsync(updateBeers, bulkConfig);
            var uniqueUpdatedBeerLocations = updateBeerLocations.GroupBy(x => new {x.StoreId, x.WatchedBeerId}).Select(x => x.First()).ToList();
            await _db.BulkUpdateAsync(uniqueUpdatedBeerLocations);
            await _db.BulkInsertAsync(insertBeerLocations);
            await _staticBeerProvider.Update();

            return "ok";
        }

        [Route("admin/addNewBeers")]
        [HttpPost]
        public async Task AddNewBeers([FromBody] ProductsAddRequest request)
        {
            var watchedBeersToAdd = request.Beers.Select(x => new WatchedBeer
            {
                MaterialNumber = x.MaterialNumber,
                AlcoholPercentage = x.AlcoholPercentage,
                Brewery = x.Brewery,
                Name = x.Name,
                Price = x.Price,
                Type = x.Type,
                BeerCategory = WatchedBeer.Category(x.Type),
                Volume = x.Volume,
                VinmonopoletStatus = x.VinmonopoletStatus
            }).ToList();
            await _db.BulkInsertOrUpdateAsync(watchedBeersToAdd);
            await _staticBeerProvider.Update();
        }

        [Route("admin/stores")]
        [HttpPost]
        public async Task<string> Stores([FromBody] StoresRequest request)
        {
            var storeIds = await _db.Stores.Select(x => x.Id).ToListAsync();
            foreach (var store in request.Stores.Where(x => !storeIds.Contains(x.StoreId)))
            {
                _db.Stores.Add(new Store
                {
                    Id = store.StoreId,
                    Name = store.Name,
                    IsActive = false
                });
            }

            await _db.SaveChangesAsync();
            await _staticBeerProvider.Update();
            return "ok";
        }

        [Route("admin/updateProducts")]
        [HttpPost]
        public async Task<string> UpdateProducts([CanBeNull] string materialNumbers)
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

            await _staticBeerProvider.Update();
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
            await _staticBeerProvider.Update();
            return $"{changedProducts} new products added to newlist";
        }

        [Route("admin/linkids")]
        [HttpPost]
        public async Task<string> LinkIds(string matnr, string bid)
        {
            _db.WatchedBeers.Find(matnr).UntappdId = bid;
            await _db.SaveChangesAsync();
            await _staticBeerProvider.Update();
            return $"All OK. Matnr: {matnr} now corresponds to Untappd Id: {bid}";
        }

        [Route("admin/existingMaterialNumbers")]
        [HttpGet]
        public async Task<IEnumerable<string>> ExistingBeers()
        {
            return await _db.WatchedBeers.Select(x => x.MaterialNumber).ToListAsync();
        }
    }
}