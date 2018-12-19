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

        public string Brewery { get; set; }

        public decimal AlcoholPercentage { get; set; }

        [MaxLength(64)]
        public string Type { get; set; }

        public decimal Price { get; set; }

        public decimal Volume { get; set; }

        public virtual ICollection<BeerLocation> BeerLocations { get; set; }

        public BeerCategory BeerCategory { get; set; }

        [MaxLength(32)]
        public string UntappdId { get; set; }

        public UntappdFetchStatus UntappdFetchStatus { get; set; }

        public static BeerCategory Category(string vareType)
        {
            switch (vareType)
            {
                case "Porter & stout":
                    return BeerCategory.PorterStout;
                case "Surøl":
                    return BeerCategory.Sour;
                case "Barley wine":
                    return BeerCategory.BarleyWine;
                case "Lys ale":
                    return BeerCategory.LightAle;
                case "Lys lager":
                    return BeerCategory.LightLager;
                case "Mørk lager":
                    return BeerCategory.DarkLager;
                case "India pale ale":
                    return BeerCategory.Ipa;
                case "Saison farmhouse ale":
                    return BeerCategory.Saison;
                case "Spesial":
                    return BeerCategory.Special;
                case "Pale ale":
                    return BeerCategory.PaleAle;
                case "Hveteøl":
                    return BeerCategory.Wheat;
                case "Klosterstil":
                    return BeerCategory.Trapist;
                case "Scotch ale":
                    return BeerCategory.ScotchAle;
                case "Red/amber":
                    return BeerCategory.Amber;
                case "Brown ale":
                    return BeerCategory.BrownAle;
                default:
                    return BeerCategory.Unknown;
            }
        }
    }
}