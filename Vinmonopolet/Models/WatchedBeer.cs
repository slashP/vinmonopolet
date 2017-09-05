using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Vinmonopolet.Models
{
    public class WatchedBeer
    {
        [Key]
        [MaxLength(32)]
        public string MaterialNumber { get; set; }

        [MaxLength(256)]
        public string Name { get; set; }

        public decimal AlcoholPercentage { get; set; }

        [MaxLength(64)]
        public string Type { get; set; }

        public decimal Price { get; set; }

        public virtual ICollection<BeerLocation> BeerLocations { get; set; }
    }
}