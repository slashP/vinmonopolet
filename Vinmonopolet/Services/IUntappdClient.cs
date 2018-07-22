using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Vinmonopolet.Services
{
    public interface IUntappdClient
    {
        Task<string> BeerInfoCompact(string id);
    }
}
