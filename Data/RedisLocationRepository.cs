using System.Text.Json;
using CheckLocationElectronOne.Common;
using CheckLocationElectronOne.Models;
using StackExchange.Redis;

namespace CheckLocationElectronOne.Data;
public class RedisLocationRepository : ILocationRepository
{
    private readonly IDatabase _redisDatabase;
    public RedisLocationRepository(IConnectionMultiplexer redis)
    {
        _redisDatabase = redis.GetDatabase();
    }

    public async Task<string[]> GetAbandonedLocations()
    {
        var abandonedLocations = await _redisDatabase.SetMembersAsync(Constants.AbandonedLocationsRedisKey);
        return abandonedLocations.ToStringArray();
    }

    public async Task AddAbandonedLocation(string locationName)
    {
        await _redisDatabase.SetAddAsync(Constants.AbandonedLocationsRedisKey, locationName);
    }
}