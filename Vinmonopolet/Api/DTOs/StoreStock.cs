using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vinmonopolet.Api.DTOs
{
    public class StoreStock
    {
        public string StoreId { get; set; }

        public string StoreName { get; set; }

        public int StockLevel { get; set; }

    }
}
