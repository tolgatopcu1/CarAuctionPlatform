namespace My_Galaxy_Auction_Business.DTOs;

public class BidVehicledto
{
    public int BidId { get; set; }
    public decimal BidAmount { get; set; }
    public DateTime BidDate { get; set; }
    public string BidStatus { get; set; }
    public string VehicleBrandAndModel { get; set; } = "";
    public int VehicleId { get; set; }
    public bool IsActive { get; set; }
}