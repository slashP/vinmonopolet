using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Clave.BackgroundUpdatable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Vinmonopolet.Data;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Services
{
    public class StaticBeerProvider : IStaticBeerProvider
    {
        readonly IConfiguration _configuration;
        readonly TimeSpan _refreshPeriod = TimeSpan.FromHours(1);
        readonly BackgroundUpdatable<List<BeerLocation>> _beerLocationsUpdater;
        readonly BackgroundUpdatableDictionary<string, BasicBeer> _untappdBeersUpdater;

        public StaticBeerProvider(IConfiguration configuration)
        {
            _configuration = configuration;
            _beerLocationsUpdater = new BackgroundUpdatable<List<BeerLocation>>(_refreshPeriod, UpdateBeerLocations);
            _untappdBeersUpdater = new BackgroundUpdatableDictionary<string, BasicBeer>(_refreshPeriod, UpdateUntappdBeers);
        }

        public IReadOnlyCollection<BeerLocation> AllLocations() => _beerLocationsUpdater.Value();

        public IReadOnlyDictionary<string, BasicBeer> UntappdBeers() => _untappdBeersUpdater.Value();

        public async Task Update() => await _beerLocationsUpdater.Update();

        async Task<List<BeerLocation>> UpdateBeerLocations()
        {
            using (var db = DbConnection())
            {
                return await db.BeerLocations.Include(x => x.WatchedBeer).Include(x => x.Store).ToListAsync();
            }
        }

        async Task<IReadOnlyDictionary<string, BasicBeer>> UpdateUntappdBeers()
        {
            using (var db = DbConnection())
            {
                return await db.UntappdBeers.ToDictionaryAsync(x => x.Id, x => x);
            }
        }

        ApplicationDbContext DbConnection()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}