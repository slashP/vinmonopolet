using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Vinmonopolet.Services
{
    public class UntappdClient : IUntappdClient
    {
        private readonly HttpClient _client;

        private readonly IConfiguration _config;

        public UntappdClient(IConfiguration config)
        {
            _config = config.GetSection("UntappdApi");
            _client = new HttpClient {BaseAddress = new Uri(_config["ApiUrl"])};
        }

        public Task<string> GetCompactBeerInfo(string id)
        {
            var endpoint = $"beer/info/{id}?compact=true&{AuthorizationString()}";
            var response = _client.GetStringAsync(endpoint);
            return response;
        }

        string AuthorizationString() => $"client_id={_config["ClientID"]}&client_secret={_config["ClientSecret"]}";
    }
}
