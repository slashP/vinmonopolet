namespace Vinmonopolet.Models.BeerViewModels
{
    using System.Collections.Generic;

    public class BeerLocationAtPol
    {
        public string StoreName { get; set; }

        public IEnumerable<BeerLocation> BeerLocations { get; set; }
    }
}