using System.Collections.Generic;
using System.Threading.Tasks;
using Vinmonopolet.Models;

namespace Vinmonopolet.Services
{
    public interface IStaticBeerProvider
    {
        List<BeerLocation> All();
        Task Update();
    }
}