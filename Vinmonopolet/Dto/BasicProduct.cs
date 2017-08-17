using Vinmonopolet.Models;

namespace Vinmonopolet.Dto
{
    public class BasicProduct
    {
        public string LinkToProductPage { get; set; }

        public string ProductNumber { get; set; }

        public int? QuantityInStock { get; set; }

        public StockStatus StockStatus { get; set; }
    }
}