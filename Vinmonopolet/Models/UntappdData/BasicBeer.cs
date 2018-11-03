using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Vinmonopolet.Models.UntappdData
{
    public class BasicBeer
    {
        public DateTime UpdatedAt { get; set; }

        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string LabelUrl { get; set; }

        public string Style { get; set; }

        public double Abv { get; set; }

        public double Ibu { get; set; }

        public int Ratings { get; set; }

        public double AverageScore { get; set; }

        public int TotalCheckins { get; set; }

        public int MonthlyCheckins { get; set; }

        public int TotalUserCount { get; set; }

        public string Description { get; set; }

        public string Slug { get; set; }

        public string FullJson { get; set; }
    }
}
