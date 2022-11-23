using Scrutor;
using Vinmonopolet.Web.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddRazorPages();
string[] skipRegistrationOfInterfaces = {};
builder.Services.Scan(scan => scan
    .FromAssemblies(typeof(Program).Assembly)
    .AddClasses(classes => classes
        .Where(c => c.Namespace != null && c.Namespace.StartsWith("Vinmonopolet") && c.GetInterfaces()
            .Any(i => i.Namespace != null &&
                      !skipRegistrationOfInterfaces.Contains(i.Name) &&
                      i.Namespace.StartsWith("Vinmonopolet") &&
                      i.GetGenericArguments().Length == 0 &&
                      c.Name.EndsWith(i.Name[1..])))).AsImplementedInterfaces().UsingRegistrationStrategy(RegistrationStrategy.Append));
builder.Services.AddSingleton<IWebBrowserService, WebBrowserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapControllers();
app.UseAuthorization();
app.MapRazorPages();
app.Run();
