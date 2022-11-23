using System.ComponentModel.DataAnnotations;

namespace Vinmonopolet.Web.Models.UntappdData;

public class Brewery
{
    [Key] public string Id { get; set; }

    public string Name { get; set; }

    public string Slug { get; set; }

    public string Url { get; set; }

    public string LabelUrl { get; set; }

    public string Country { get; set; }
}