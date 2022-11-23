using System.ComponentModel.DataAnnotations;

namespace Vinmonopolet.Web.Models;

public class Store
{
    [MaxLength(32)] public string Id { get; set; }

    public string Name { get; set; }

    public bool IsActive { get; set; }
}