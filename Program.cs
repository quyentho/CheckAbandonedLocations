using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSpaStaticFiles(config => config.RootPath = "/wwwroot");

builder.Services.AddSingleton<IConnectionMultiplexer>(opt =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("RedisConnection"))
);

// builder.Services.AddScoped<ILocationRepository, RedisLocationRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseSpaStaticFiles(new StaticFileOptions()
{
    RequestPath = "/wwwroot"
});

app.MapGet("/api", () => "Hello World");

app.MapFallbackToFile("index.html"); ;

app.Run();
