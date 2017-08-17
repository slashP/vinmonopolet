using System.Threading.Tasks;
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
    }
}