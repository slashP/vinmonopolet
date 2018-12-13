using System.Collections.Generic;

namespace Vinmonopolet.Api.DTOs
{
    public class BeerWithStocks
    {
        public string MaterialNumber { get; set; }
        
        public string Name { get; set; }
        
        public string Type { get; set; }

        public decimal Price { get; set; }
        
        public string UntappdId { get; set; }
        
        public string LabelUrl { get; set; }

        public string Style { get; set; }

        public decimal? Abv { get; set; }

        public decimal? Ibu { get; set; }

        public int? Ratings { get; set; }

        public decimal? AverageScore { get; set; }

        public int? TotalCheckins { get; set; }

        public int? MonthlyCheckins { get; set; }

        public int? TotalUserCount { get; set; }

        public string Description { get; set; }

        public IList<StoreStock> StoreStocks { get; set; }
    }
}
