using System.Collections.Generic;
using System.Linq;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Models.BeerViewModels
{
    public class PolViewModel
    {
        public IEnumerable<string> Types { get; set; }

        public IEnumerable<IGrouping<string, BeerLocation>> GroupedBeers { get; set; }

        public IEnumerable<BasicBeer> UntappdBeers { get; set; }

        public string SearchTerm { get; set; }
    }
}