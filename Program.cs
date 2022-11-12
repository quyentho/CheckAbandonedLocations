using CheckLocationElectronOne.Data;
using CheckLocationElectronOne.Dtos;
using CheckLocationElectronOne.Models;
using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSpaStaticFiles(config => config.RootPath = "/wwwroot");

builder.Services.AddSingleton<IConnectionMultiplexer>(opt =>
    ConnectionMultiplexer.Connect(builder.Configuration.GetConnectionString("RedisConnection"))
);

builder.Services.AddScoped<ILocationRepository, RedisLocationRepository>();

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

app.MapPost("/api/add", async (AddLocationsRequest request, ILocationRepository repository) =>
{
    try
    {
        foreach (var location in request.Locations)
        {
            await repository.AddAbandonedLocationAsync(location.ToLower().Trim());
        }

        return Results.Ok();
    }
    catch (System.Exception)
    {
        return Results.StatusCode(500);
    }
});

app.MapPost("api/check", async (CheckLocationsRequest request, ILocationRepository repository) =>
{

    var abandonedLocations = await repository.GetAbandonedLocationsAsync();
    var checkingResult = new List<CheckLocationsResponse>();
    foreach (var address in request.Addresses)
    {
        var check = new CheckLocationsResponse(address);
        var normalizeAddress = address.ToLower();

        var punctuation = normalizeAddress.Where(Char.IsPunctuation).Distinct().ToArray();
        var words = normalizeAddress.Split().Select(x => x.Trim(punctuation));
        var foundAbandonedLocations = words.Intersect(abandonedLocations).ToArray();

        check.IsDeliverable = foundAbandonedLocations.Length == 0;
        check.AbandonedLocations = foundAbandonedLocations;

        checkingResult.Add(check);
    }
    return Results.Ok(checkingResult);
});

app.MapFallbackToFile("index.html"); ;

app.Run();
