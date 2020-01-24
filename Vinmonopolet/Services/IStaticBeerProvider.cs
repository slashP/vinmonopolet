using System.Collections.Generic;
using System.Threading.Tasks;
using Vinmonopolet.Models;

namespace Vinmonopolet.Services
{
    public interface IStaticBeerProvider
    {
        IEnumerable<string> AllMaterialNumbers();
        List<BeerLocation> All();
        Task Update();
    }
}