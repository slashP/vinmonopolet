﻿using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Vinmonopolet.Data;
using Vinmonopolet.Extensions;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;
using Vinmonopolet.Models.UntappdData.ApiDtos;
using Vinmonopolet.Models.UntappdData.Mappers;
using Vinmonopolet.Services;
using Brewery = Vinmonopolet.Models.UntappdData.Brewery;

namespace Vinmonopolet.Controllers
{
    public class UntappdController : Controller
    {
        private IUntappdClient _untappdClient;
        private readonly ApplicationDbContext _db;
        private readonly IStaticBeerProvider _staticBeerProvider;

        public UntappdController(IUntappdClient _client, ApplicationDbContext db, IStaticBeerProvider staticBeerProvider)
        {
            _untappdClient = _client;
            _db = db;
            _staticBeerProvider = staticBeerProvider;
        }

        [HttpPost]
        [Route("admin/crawlUntappd")]
        public async Task<string> Test()
        {
            var someBeers = await _db.WatchedBeers
                .Where(x => x.UntappdFetchStatus == UntappdFetchStatus.Untouched)
                .OrderByDescending(x => x.AlcoholPercentage).Take(50).ToListAsync();
            var untappdCrawler = new UntappdCrawler();
            foreach (var watchedBeer in someBeers)
            {
                BasicBeer basicBeer;
                try
                {
                    basicBeer = await untappdCrawler.CrawlBeer(watchedBeer);
                }
                catch (BackOffException)
                {
                    break;
                }

                if (basicBeer != null)
                {
                    var untappdBeer = await _db.UntappdBeers.FindAsync(basicBeer.Id);
                    if (untappdBeer == null)
                    {
                        _db.UntappdBeers.Add(basicBeer);
                    }

                    watchedBeer.UntappdId = basicBeer.Id;
                    watchedBeer.UntappdFetchStatus = UntappdFetchStatus.Success;
                }
                else
                {
                    watchedBeer.UntappdFetchStatus = UntappdFetchStatus.Failed;
                }

                await _db.SaveChangesAsync();
            }

            return string.Join(", ", Enumerable.Empty<string>());
        }

        [HttpPost]
        public async Task<string> UpdateBeer(string id)
        {
            var response = await _untappdClient.GetCompactBeerInfo(id);

            var jsonObject = JsonConvert.DeserializeObject<BeerInfo_Compact>(response);
            var beer = jsonObject.ToBasicBeer();
            beer.FullJson = response;
            var brewery = jsonObject.ToBrewery();

            await _db.AddOrUpdate(beer);
            await _db.AddOrUpdate(brewery);
            await _db.SaveChangesAsync();

            return JsonConvert.SerializeObject(beer);
        }

        [HttpPost]
        public async Task<string> UpdateOldestUntappdBeersFromApi(int antall = 10)
        {
            var watchedUntappdIds = _db.WatchedBeers.Select(x => x.UntappdId).ToList();
            var ids = _db.UntappdBeers.Where(x => watchedUntappdIds.Contains(x.Id)).OrderBy(x => x.UpdatedAt).Take(antall).Select(x => x.Id).ToList();

            foreach (var id in ids)
            {
                await UpdateBeer(id);
            }

            await _staticBeerProvider.UpdateUntappd();
            return $"{antall} beers updated: " + string.Join("\n", ids);
        }

        [HttpPost]
        public async Task<string> LinkIds(string matnr, string bid)
        {
            _db.WatchedBeers.Find(matnr).UntappdId = bid;
            await _db.SaveChangesAsync();

            await UpdateBeer(bid);

            return $"All OK. Matnr: {matnr} now corresponds to Untappd Id: {bid}";
        }

        [HttpPost]
        public async Task<ActionResult> LinkAction(string matnr, string bid)
        {
            await LinkIds(matnr, bid);
            return new RedirectResult(Request.Headers["Referer"].ToString());
        }


        [HttpPost]
        public async Task<ActionResult> UpdateAction(string id)
        {
            await UpdateBeer(id);
            return new RedirectResult(Request.Headers["Referer"].ToString());
        }
    }
}
