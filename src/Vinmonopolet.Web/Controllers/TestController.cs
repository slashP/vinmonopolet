using Microsoft.AspNetCore.Mvc;
using Vinmonopolet.Web.Services;

namespace Vinmonopolet.Web.Controllers;

public class TestController : Controller
{
    private readonly IWebBrowserService _webBrowserService;

    public TestController(IWebBrowserService webBrowserService)
    {
        _webBrowserService = webBrowserService;
    }

    [Route("testing")]
    [HttpPost]
    public async Task<string> Yoyo()
    {
        await using var browserPage = await _webBrowserService.GetPage();
        var page = browserPage.Page;
        await page.GoToAsync("https://clave.no/");
        return await page.GetContentAsync();
    }
}