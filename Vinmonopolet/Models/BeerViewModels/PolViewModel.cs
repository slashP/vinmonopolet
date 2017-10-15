using System.Collections.Generic;
using System.Linq;

namespace Vinmonopolet.Models.BeerViewModels
{
    public class PolViewModel
    {
        public IEnumerable<string> Types { get; set; }

        public IEnumerable<BeerLocationAtPol> GroupedBeers { get; set; }

        public string SearchTerm { get; set; }
    }
}