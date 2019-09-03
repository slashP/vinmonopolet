using System.Collections.Generic;

namespace Vinmonopolet.Dto
{
    public class ProductWithStores
    {
        public string LinkToProductPage { get; set; }

        public string ProductNumber { get; set; }

        public IReadOnlyCollection<StoreWithStock> Stores { get; set; }
    }

    public class StoreWithStock
    {
        public string StoreId { get; set; }

        public int? QuantityInStock { get; set; }
    }

    public class ProductsUpdateRequest
    {
        public IReadOnlyCollection<ProductWithStores> Products { get; set; }
    }
}