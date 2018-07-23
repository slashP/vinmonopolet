using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Vinmonopolet.Data;
using Vinmonopolet.Extensions;
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

        public UntappdController(IUntappdClient _client, ApplicationDbContext db)
        {
            _untappdClient = _client;
            _db = db;
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
        public async Task<string> LinkIds(string matnr, string bid)
        {
            _db.WatchedBeers.Find(matnr).UntappdId = bid;
            await _db.SaveChangesAsync();

            await UpdateBeer(bid);

            return $"All OK. Matnr: {matnr} now corresponds to Untappd Id: {bid}";
        }
    }
}
