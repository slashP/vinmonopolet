using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Clave.BackgroundUpdatable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Vinmonopolet.Data;
using Vinmonopolet.Models;

namespace Vinmonopolet.Services
{
    public class StaticBeerProvider : IStaticBeerProvider
    {
        readonly IConfiguration _configuration;
        readonly TimeSpan _refreshPeriod = TimeSpan.FromHours(1);
        readonly BackgroundUpdatable<List<BeerLocation>> _updater;

        public StaticBeerProvider(IConfiguration configuration)
        {
            _configuration = configuration;
            _updater = new BackgroundUpdatable<List<BeerLocation>>(_refreshPeriod, UpdateAsync);
        }

        public List<BeerLocation> All() => _updater.Value();

        public async Task Update() => await _updater.Update();

        async Task<List<BeerLocation>> UpdateAsync()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            using (var db = new ApplicationDbContext(optionsBuilder.Options))
            {
                return await db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store).ToListAsync();
            }
        }
    }
}