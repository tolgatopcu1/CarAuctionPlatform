using Microsoft.AspNetCore.Http;

namespace My_Galaxy_Auction_Business.DTOs
{
    public class CreateVehicleDTO
    {
        public string BrandAndModel { get; set; } = null!;
        public string Color { get; set; } = null!;
        public int ManufacturingYear { get; set; }
        public decimal EngineCapacity { get; set; }
        public decimal Price { get; set; }
        public int Milage { get; set; }
        public string PlateNumber { get; set; } = null!;
        public double AuctionPrice { get; set; }
        public string AdditionalInformation { get; set; } = null!;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsActive { get; set; }
        public string? Image { get; set; } 
        public string?  SellerId { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}