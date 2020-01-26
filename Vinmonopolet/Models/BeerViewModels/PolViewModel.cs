using System.Collections.Generic;
using System.Linq;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Models.BeerViewModels
{
    public class PolViewModel
    {
        public IEnumerable<WatchedBeer> UnregBeers { get; set; }
        
        public string SearchTerm { get; set; }
    }
}