using CheckLocationElectronOne.Models;

namespace CheckLocationElectronOne.Data;

public interface ILocationRepository
{
    Task<string[]> GetAbandonedLocations();

    Task AddAbandonedLocation(string name);
}