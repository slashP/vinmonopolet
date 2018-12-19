using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Vinmonopolet.Models;

namespace Vinmonopolet.Controllers
{
    public class HomeController : Controller
    {
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }
        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
