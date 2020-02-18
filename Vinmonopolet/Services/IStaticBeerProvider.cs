using System.Collections.Generic;
using System.Threading.Tasks;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Services
{
    public interface IStaticBeerProvider
    {
        IReadOnlyCollection<WatchedBeer> AllBeers();
        Task Update();
        IReadOnlyDictionary<string, BasicBeer> UntappdBeers();
        Task UpdateUntappd();
    }
}