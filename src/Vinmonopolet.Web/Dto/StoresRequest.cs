namespace Vinmonopolet.Web.Dto;

public class StoresRequest
{
    public IReadOnlyCollection<StoreWithName> Stores { get; set; }
}

public class StoreWithName
{
    public string StoreId { get; set; }

    public string Name { get; set; }
}