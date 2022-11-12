namespace CheckLocationElectronOne.Dtos;

public class CheckLocationsResponse
{

    public string Address { get; set; }

    public CheckLocationsResponse(string addresses, bool isDeliverable = false)
    {
        Address = addresses;
        IsDeliverable = isDeliverable;
    }

    public bool IsDeliverable { get; set; }
    public string[] AbandonedLocations { get; set; }
}