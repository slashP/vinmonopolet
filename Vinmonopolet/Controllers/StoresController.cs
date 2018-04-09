using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vinmonopolet.Data;

namespace Vinmonopolet.Controllers
{
    public class StoresController : Controller
    {
        readonly ApplicationDbContext _db;

        public StoresController(ApplicationDbContext db)
        {
            _db = db;
        }

        [Route("stores")]
        public async Task<ActionResult> Stores()
        {
            var stores = await _db.Stores.ToListAsync();
            return View(stores);
        }

        [Authorize]
        [HttpPost]
        [Route("stores/toggle/{storeId}")]
        public async Task<int> Toggle(string storeId)
        {
            var store = await _db.Stores.FirstAsync(x => x.Id == storeId);
            store.IsActive = !store.IsActive;
            return await _db.SaveChangesAsync();
        }
    }
}