using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Models;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<WatchedBeer> WatchedBeers { get; set; }

        public DbSet<BeerLocation> BeerLocations { get; set; }

        public DbSet<Store> Stores { get; set; }

        public DbSet<UserStorePreference> UserStorePreferences { get; set; }

        public DbSet<BasicBeer> UntappdBeers { get; set; }

        public DbSet<Brewery> UntappdBreweries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<BeerLocation>().HasKey(x => new {x.StoreId, x.WatchedBeerId});
            builder.Entity<BeerLocation>().HasIndex(x => x.AnnouncedDate);
            builder.Entity<BeerLocation>().HasIndex(x => x.StockStatus);
            builder.Entity<WatchedBeer>().HasIndex(x => x.Name);
            builder.Entity<WatchedBeer>().HasIndex(x => x.BeerCategory);
            builder.Entity<BasicBeer>().HasIndex(x => x.Id);
            builder.Entity<BasicBeer>().HasKey(x => x.Id);
            builder.Entity<Brewery>().HasIndex(x => x.Id);
            builder.Entity<Brewery>().HasKey(x => x.Id);
            base.OnModelCreating(builder);
        }
    }
}
