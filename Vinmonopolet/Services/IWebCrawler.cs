using System.Collections.Generic;
using System.Threading.Tasks;
using Vinmonopolet.Dto;
using Vinmonopolet.Models;

namespace Vinmonopolet.Services
{
    public interface IWebCrawler
    {
        Task<IReadOnlyCollection<BasicProduct>> Products(string storeId);
        Task<WatchedBeer> ProductFromProductPage(BasicProduct basicProduct);
    }
}