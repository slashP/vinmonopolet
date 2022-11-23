using Microsoft.AspNetCore.Mvc;
using Vinmonopolet.Web.Models;
using Vinmonopolet.Web.Services;

namespace Vinmonopolet.Web.Controllers;

public class TestController : Controller
{
    private readonly IWebBrowserService _webBrowserService;
    private readonly IUntappdCrawler _untappdCrawler;

    public TestController(IWebBrowserService webBrowserService, IUntappdCrawler untappdCrawler)
    {
        _webBrowserService = webBrowserService;
        _untappdCrawler = untappdCrawler;
    }

    [Route("testing")]
    [HttpPost]
    public async Task<string> Yoyo()
    {
        await using var browserPage = await _webBrowserService.GetPage();
        var page = browserPage.Page;
        await page.GoToAsync("https://untappd.com/search?q=lervig");
        var content = await page.GetContentAsync();
        return content;
    }

    [Route("crawlBeer")]
    [HttpPost]
    public async Task<string?> CrawlBeer(string name, decimal alcohol)
    {
        var beer = await _untappdCrawler.CrawlBeer(new WatchedBeer
        {
            Name = name,
            AlcoholPercentage = alcohol
        });
        return beer?.ToString();
    }
}