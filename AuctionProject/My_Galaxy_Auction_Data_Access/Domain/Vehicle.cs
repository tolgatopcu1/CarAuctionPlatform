using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using My_Galaxy_Auction_Data_Access.Models;
namespace My_Galaxy_Auction_Data_Access.Domain
{
    public class Vehicle
    {
        [Key]
        public int VehicleId { get; set; }
        public string? BrandAndModel { get; set; }
        public string Color { get; set; } = null!;
        public int ManufacturingYear { get; set; }
        public decimal EngineCapacity { get; set; }
        public decimal Price { get; set; }
        public int Milage { get; set; }
        public string? PlateNumber { get; set; }
        public double AuctionPrice { get; set; }
        public string? AdditionalInformation { get; set; }
        public DateTime StartTime { get; set; } = DateTime.UtcNow;
        public DateTime EndTime { get; set; }
        public bool IsActive { get; set; } = true;
        public string? Image { get; set; }
        //Satici Id
        public string? SellerId { get; set; }
        [JsonIgnore]
        public ApplicationUser? Seller { get; set; }
        [JsonIgnore]

        public ICollection<Bid>? Bids { get; set; }

        public PaymentHistory? PaymentHistory { get; set; }
    }
}