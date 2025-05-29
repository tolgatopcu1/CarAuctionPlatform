using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace My_Galaxy_Auction_Data_Access.Migrations
{
    /// <inheritdoc />
    public partial class addseed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "VehicleId", "AdditionalInformation", "AuctionPrice", "BrandAndModel", "Color", "EndTime", "EngineCapacity", "Image", "IsActive", "ManufacturingYear", "Milage", "PlateNumber", "Price", "SellerId", "StartTime" },
                values: new object[,]
                {
                    { 1, "Well maintained, single owner", 140000.0, "Toyota Corolla", "White", new DateTime(2025, 6, 9, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3047), 1.6m, "toyota-corolla.jpg", true, 2019, 60000, "34ABC123", 150000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 993, DateTimeKind.Local).AddTicks(1742) },
                    { 2, "Luxury package, leather seats", 300000.0, "BMW 320i", "Black", new DateTime(2025, 7, 26, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3833), 2.0m, "bmw-320i.jpg", true, 2017, 85000, "06DEF456", 320000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3831) },
                    { 3, "Accident-free, new tires", 200000.0, "Honda Civic", "Red", new DateTime(2025, 7, 10, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3839), 1.5m, "honda-civic.jpg", true, 2020, 40000, "35GHI789", 210000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3839) },
                    { 4, "AMG design, panoramic roof", 385000.0, "Mercedes C200", "Silver", new DateTime(2025, 8, 3, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3842), 1.8m, "mercedes-c200.jpg", true, 2018, 70000, "34JKL321", 400000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3842) },
                    { 5, "New brakes and battery", 125000.0, "Ford Focus", "Blue", new DateTime(2025, 6, 29, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3848), 1.6m, "ford-focus.jpg", true, 2016, 95000, "16MNO654", 130000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3848) },
                    { 6, "S-tronic, low fuel consumption", 340000.0, "Audi A3", "Grey", new DateTime(2025, 7, 4, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3851), 1.4m, "audi-a3.jpg", true, 2019, 50000, "34PQR789", 350000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3851) },
                    { 7, "Economic and reliable", 100000.0, "Volkswagen Golf", "Green", new DateTime(2025, 6, 20, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3877), 1.2m, "vw-golf.jpg", true, 2015, 105000, "41STU101", 110000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3876) },
                    { 8, "SUV, high ground clearance", 360000.0, "Peugeot 3008", "Brown", new DateTime(2025, 7, 18, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3880), 1.5m, "peugeot-3008.jpg", true, 2021, 30000, "35UVW202", 370000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3880) },
                    { 9, "Factory warranty continues", 250000.0, "Hyundai Elantra", "White", new DateTime(2025, 6, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3883), 1.6m, "hyundai-elantra.jpg", true, 2022, 20000, "06XYZ303", 260000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3882) },
                    { 10, "Needs minor maintenance", 90000.0, "Opel Astra", "Dark Blue", new DateTime(2025, 6, 4, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3886), 1.6m, "opel-astra.jpg", true, 2014, 120000, "34AAA001", 95000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3885) },
                    { 11, "Family car, comfortable ride", 115000.0, "Renault Megane", "Silver", new DateTime(2025, 7, 2, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3889), 1.5m, "renault-megane.jpg", true, 2016, 90000, "34BBB002", 125000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3888) },
                    { 12, "Stylish and fun to drive", 185000.0, "Mazda 3", "Red", new DateTime(2025, 6, 23, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3891), 1.5m, "mazda-3.jpg", true, 2018, 75000, "34CCC003", 195000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3891) },
                    { 13, "High-tech features included", 370000.0, "Nissan Qashqai", "Grey", new DateTime(2025, 7, 31, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3894), 1.3m, "nissan-qashqai.jpg", true, 2021, 25000, "34DDD004", 390000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3894) },
                    { 14, "Sporty hatchback, agile drive", 135000.0, "Seat Leon", "Blue", new DateTime(2025, 6, 11, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3898), 1.4m, "seat-leon.jpg", true, 2017, 88000, "34EEE005", 145000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3898) },
                    { 15, "Spacious and efficient", 110000.0, "Skoda Octavia", "White", new DateTime(2025, 6, 17, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3901), 1.6m, "skoda-octavia.jpg", true, 2015, 98000, "34FFF006", 118000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3900) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 15);
        }
    }
}
