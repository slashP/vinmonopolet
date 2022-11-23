using System.Diagnostics;
using System.Runtime.InteropServices;
using PuppeteerSharp;

namespace Vinmonopolet.Web.Services;

public interface IWebBrowserService
{
    Task<Pooled<IPage>> GetPage();
}

public class WebBrowserService : IWebBrowserService, IDisposable
{
    private const int NumberOfPages = 2;
    private readonly ILogger<WebBrowserService> _logger;
    private readonly Pool<IPage> _pagePool;
    private readonly AsyncLazy<IBrowser> _browser;

    public WebBrowserService(ILogger<WebBrowserService> logger)
    {
        _logger = logger;
        _pagePool = new Pool<IPage>(NumberOfPages);
        _browser = new AsyncLazy<IBrowser>(InitializeBrowserWithPages);
    }

    public async Task<Pooled<IPage>> GetPage()
    {
        if (!_browser.IsValueCreated)
        {
            await _browser.Value;
        }

        return await _pagePool.AllocateAsync();
    }

    private async Task<IBrowser> InitializeBrowserWithPages()
    {
        string? executablePath = null;
        if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
        {
            executablePath = "/chromium/linux/chrome-linux/chrome";
            _logger.LogInformation("PDF log. Exe path: " + executablePath);
            _logger.LogInformation("PDF log. Default revision: " + BrowserFetcher.DefaultChromiumRevision);
            Bash($"chmod 777 {executablePath}");
        }
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
        {
            await new BrowserFetcher(Product.Chrome).DownloadAsync();
        }

        var browser = await Puppeteer.LaunchAsync(new LaunchOptions
        {
            ExecutablePath = executablePath,
            Headless = true,
            EnqueueTransportMessages = false,
            Args = new[] { "--no-sandbox" }
        });
        foreach (var _ in Enumerable.Repeat(string.Empty, NumberOfPages))
        {
            var page = await browser.NewPageAsync();
            _pagePool.AddToPool(page);
        }

        return browser;
    }

    private static void Bash(string cmd)
    {
        var escapedArgs = cmd.Replace("\"", "\\\"");
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "/bin/bash",
                Arguments = $"-c \"{escapedArgs}\"",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            }
        };
        process.Start();
        process.StandardOutput.ReadToEnd();
        process.WaitForExit();
    }

    public void Dispose()
    {
        if (!_browser.IsValueCreated)
        {
            return;
        }

        var browser = _browser.Value.Result;
        browser?.Dispose();
    }

    class AsyncLazy<T> : Lazy<Task<T>>
    {
        public AsyncLazy(Func<Task<T>> taskFactory) :
            base(() => Task.Run(taskFactory))
        {
        }
    }
}