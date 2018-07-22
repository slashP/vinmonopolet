using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Vinmonopolet.Services
{
    public class UntappdClient : IUntappdClient
    {
        private HttpClient _client;

        private IConfiguration _config;

        private string _baseUrl;

        private string _clientId;

        private string _clientSecret;

        private string _auth => $"client_id={_clientId}&client_secret={_clientSecret}";

        public UntappdClient(IConfiguration config)
        {
            _config = config.GetSection("UntappdApi");
            _baseUrl = _config["ApiUrl"];
            _client = new HttpClient();
            _client.BaseAddress = new Uri(_baseUrl);
            _clientId = _config["ClientID"];
            _clientSecret = _config["ClientSecret"];
        }

        public Task<string> BeerInfoCompact(string id)
        {
            var endpoint = $"beer/info/{id}?compact=true&{_auth}";
            var response = _client.GetAsync(endpoint).Result;
            return response.Content.ReadAsStringAsync();
        }
    }
}
