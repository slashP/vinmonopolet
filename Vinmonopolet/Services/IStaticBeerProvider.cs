using System.Collections.Generic;
using System.Threading.Tasks;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Services
{
    public interface IStaticBeerProvider
    {
        IReadOnlyCollection<BeerLocation> AllLocations();
        Task Update();
        IReadOnlyDictionary<string, BasicBeer> UntappdBeers();
    }
}