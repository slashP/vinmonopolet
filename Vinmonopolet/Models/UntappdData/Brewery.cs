using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Vinmonopolet.Models.UntappdData
{
    public class Brewery
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Slug { get; set; }

        public string Url { get; set; }

        public string LabelUrl { get; set; }

        public string Country { get; set; }
    }
}
