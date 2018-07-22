using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vinmonopolet.Services;

namespace Vinmonopolet.Controllers
{
    public class UntappdController : Controller
    {
        private IUntappdClient _untappdClient;

        public UntappdController(IUntappdClient _client)
        {
            _untappdClient = _client;
        }
        
        [HttpPost]
        public async Task<string> UpdateBeer(string id)
        {
            var response = await _untappdClient.BeerInfoCompact(id);
            return response;
        }
    }
}
