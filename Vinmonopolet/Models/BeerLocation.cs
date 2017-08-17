using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vinmonopolet.Models
{
    public class BeerLocation
    {
        [MaxLength(32)]
        public string StoreId { get; set; }

        [MaxLength(32)]
        public string WatchedBeerId { get; set; }

        public virtual WatchedBeer WatchedBeer { get; set; }

        public virtual Store Store { get; set; }

        public int StockLevel { get; set; }

        public StockStatus StockStatus { get; set; }
    }
}