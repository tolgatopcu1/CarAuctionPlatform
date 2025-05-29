using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction_Data_Access.Domain;
using My_Galaxy_Auction_Data_Access.Models;

namespace My_Galaxy_Auction_Data_Access.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<PaymentHistory> PaymentHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Vehicle>().HasData(
    new Vehicle
    {
        VehicleId = 1,
        BrandAndModel = "Toyota Corolla",
        Color = "White",
        ManufacturingYear = 2019,
        EngineCapacity = 1.6m,
        Price = 150000m,
        Milage = 60000,
        PlateNumber = "34ABC123",
        AuctionPrice = 140000,
        AdditionalInformation = "Well maintained, single owner",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 5, 10, 0, 0),
        IsActive = true,
        Image = "toyota-corolla.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 2,
        BrandAndModel = "BMW 320i",
        Color = "Black",
        ManufacturingYear = 2017,
        EngineCapacity = 2.0m,
        Price = 320000m,
        Milage = 85000,
        PlateNumber = "06DEF456",
        AuctionPrice = 300000,
        AdditionalInformation = "Luxury package, leather seats",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 7, 5, 10, 0, 0),
        IsActive = true,
        Image = "bmw-320i.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 3,
        BrandAndModel = "Honda Civic",
        Color = "Red",
        ManufacturingYear = 2020,
        EngineCapacity = 1.5m,
        Price = 210000m,
        Milage = 40000,
        PlateNumber = "35GHI789",
        AuctionPrice = 200000,
        AdditionalInformation = "Accident-free, new tires",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 7, 10, 10, 0, 0),
        IsActive = true,
        Image = "honda-civic.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 4,
        BrandAndModel = "Mercedes C200",
        Color = "Silver",
        ManufacturingYear = 2018,
        EngineCapacity = 1.8m,
        Price = 400000m,
        Milage = 70000,
        PlateNumber = "34JKL321",
        AuctionPrice = 385000,
        AdditionalInformation = "AMG design, panoramic roof",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 8, 3, 10, 0, 0),
        IsActive = true,
        Image = "mercedes-c200.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 5,
        BrandAndModel = "Ford Focus",
        Color = "Blue",
        ManufacturingYear = 2016,
        EngineCapacity = 1.6m,
        Price = 130000m,
        Milage = 95000,
        PlateNumber = "16MNO654",
        AuctionPrice = 125000,
        AdditionalInformation = "New brakes and battery",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 9, 10, 0, 0),
        IsActive = true,
        Image = "ford-focus.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 6,
        BrandAndModel = "Audi A3",
        Color = "Grey",
        ManufacturingYear = 2019,
        EngineCapacity = 1.4m,
        Price = 350000m,
        Milage = 50000,
        PlateNumber = "34PQR789",
        AuctionPrice = 340000,
        AdditionalInformation = "S-tronic, low fuel consumption",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 7, 4, 10, 0, 0),
        IsActive = true,
        Image = "audi-a3.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 7,
        BrandAndModel = "Volkswagen Golf",
        Color = "Green",
        ManufacturingYear = 2015,
        EngineCapacity = 1.2m,
        Price = 110000m,
        Milage = 105000,
        PlateNumber = "41STU101",
        AuctionPrice = 100000,
        AdditionalInformation = "Economic and reliable",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 20, 10, 0, 0),
        IsActive = true,
        Image = "vw-golf.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 8,
        BrandAndModel = "Peugeot 3008",
        Color = "Brown",
        ManufacturingYear = 2021,
        EngineCapacity = 1.5m,
        Price = 370000m,
        Milage = 30000,
        PlateNumber = "35UVW202",
        AuctionPrice = 360000,
        AdditionalInformation = "SUV, high ground clearance",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 7, 18, 10, 0, 0),
        IsActive = true,
        Image = "peugeot-3008.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 9,
        BrandAndModel = "Hyundai Elantra",
        Color = "White",
        ManufacturingYear = 2022,
        EngineCapacity = 1.6m,
        Price = 260000m,
        Milage = 20000,
        PlateNumber = "06XYZ303",
        AuctionPrice = 250000,
        AdditionalInformation = "Factory warranty continues",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 30, 10, 0, 0),
        IsActive = true,
        Image = "hyundai-elantra.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 10,
        BrandAndModel = "Opel Astra",
        Color = "Dark Blue",
        ManufacturingYear = 2014,
        EngineCapacity = 1.6m,
        Price = 95000m,
        Milage = 120000,
        PlateNumber = "34AAA001",
        AuctionPrice = 90000,
        AdditionalInformation = "Needs minor maintenance",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 5, 10, 0, 0),
        IsActive = true,
        Image = "opel-astra.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 11,
        BrandAndModel = "Renault Megane",
        Color = "Silver",
        ManufacturingYear = 2016,
        EngineCapacity = 1.5m,
        Price = 125000m,
        Milage = 90000,
        PlateNumber = "34BBB002",
        AuctionPrice = 115000,
        AdditionalInformation = "Family car, comfortable ride",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 7, 2, 10, 0, 0),
        IsActive = true,
        Image = "renault-megane.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 12,
        BrandAndModel = "Mazda 3",
        Color = "Red",
        ManufacturingYear = 2018,
        EngineCapacity = 1.5m,
        Price = 195000m,
        Milage = 75000,
        PlateNumber = "34CCC003",
        AuctionPrice = 185000,
        AdditionalInformation = "Stylish and fun to drive",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 23, 10, 0, 0),
        IsActive = true,
        Image = "mazda-3.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 13,
        BrandAndModel = "Nissan Qashqai",
        Color = "Grey",
        ManufacturingYear = 2021,
        EngineCapacity = 1.3m,
        Price = 390000m,
        Milage = 25000,
        PlateNumber = "34DDD004",
        AuctionPrice = 370000,
        AdditionalInformation = "High-tech features included",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 8, 1, 10, 0, 0),
        IsActive = true,
        Image = "nissan-qashqai.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    },
    new Vehicle
    {
        VehicleId = 14,
        BrandAndModel = "Seat Leon",
        Color = "Blue",
        ManufacturingYear = 2017,
        EngineCapacity = 1.4m,
        Price = 145000m,
        Milage = 88000,
        PlateNumber = "34EEE005",
        AuctionPrice = 135000,
        AdditionalInformation = "Sporty hatchback, agile drive",
        StartTime = new DateTime(2025, 4, 25, 10, 0, 0),
        EndTime = new DateTime(2025, 6, 11, 10, 0, 0),
        IsActive = true,
        Image = "seat-leon.jpg",
        SellerId = "55623a4b-7e63-42c7-baa2-7d34ef4ea27b"
    }

            );

        }
    }
}