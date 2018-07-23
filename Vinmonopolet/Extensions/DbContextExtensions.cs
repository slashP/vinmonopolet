using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;
using Vinmonopolet.Models.UntappdData;

namespace Vinmonopolet.Extensions
{
    public static class DbContextExtensions
    {
        public static async Task AddOrUpdate(this ApplicationDbContext db, Brewery brewery)
        {
            var entity = await db.UntappdBreweries.FindAsync(brewery.Id);
            if (entity == null)
            {
                db.UntappdBreweries.Add(brewery);
            }
            else
            {
                db.Entry(entity).CurrentValues.SetValues(brewery);
            }
        }

        public static async Task AddOrUpdate(this ApplicationDbContext db, BasicBeer beer)
        {
            var entity = await db.UntappdBeers.FindAsync(beer.Id);
            if (entity == null)
            {
                db.UntappdBeers.Add(beer);
            }
            else
            {
                db.Entry(entity).CurrentValues.SetValues(beer);
            }
        }
    }
}
