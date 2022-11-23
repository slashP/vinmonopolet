namespace Vinmonopolet.Web.Dto;

public class ProductWithStores
{
    public string LinkToProductPage { get; set; }

    public string ProductNumber { get; set; }

    public bool IsOnNewProductList { get; set; }

    public decimal Price { get; set; }

    public IReadOnlyCollection<StoreWithStock> Stores { get; set; }

    public string VinmonopoletStatus { get; set; }
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

public class ProductsAddRequest
{
    public IReadOnlyCollection<WatchedBeerDto> Beers { get; set; }
}

public class WatchedBeerDto
{
    public string MaterialNumber { get; set; }

    public string Name { get; set; }

    public string Brewery { get; set; }

    public decimal AlcoholPercentage { get; set; }

    public string Type { get; set; }

    public decimal Price { get; set; }

    public decimal Volume { get; set; }

    public string VinmonopoletStatus { get; set; }
}