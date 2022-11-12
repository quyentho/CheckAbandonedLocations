using CheckLocationElectronOne.Models;

namespace CheckLocationElectronOne.Data;

public interface ILocationRepository
{
    Task<string[]> GetAbandonedLocationsAsync();

    Task AddAbandonedLocationAsync(string name);
}