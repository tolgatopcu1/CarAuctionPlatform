using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace My_Galaxy_Auction_Data_Access.Migrations
{
    /// <inheritdoc />
    public partial class addseedupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 15);

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 1,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 5, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 2,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 5, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 3,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 10, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 4,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 8, 3, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 5,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 9, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 6,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 7,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 20, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 8,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 18, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 9,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 30, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 10,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 5, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 11,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 2, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 12,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 23, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 13,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 8, 1, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 14,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 11, 10, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2025, 4, 25, 10, 0, 0, 0, DateTimeKind.Unspecified) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 1,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 9, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3047), new DateTime(2025, 4, 25, 17, 30, 52, 993, DateTimeKind.Local).AddTicks(1742) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 2,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 26, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3833), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3831) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 3,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 10, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3839), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3839) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 4,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 8, 3, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3842), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3842) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 5,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 29, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3848), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3848) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 6,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 4, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3851), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3851) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 7,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 20, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3877), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3876) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 8,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 18, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3880), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3880) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 9,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3883), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3882) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 10,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 4, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3886), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3885) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 11,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 2, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3889), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3888) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 12,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 23, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3891), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3891) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 13,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 7, 31, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3894), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3894) });

            migrationBuilder.UpdateData(
                table: "Vehicles",
                keyColumn: "VehicleId",
                keyValue: 14,
                columns: new[] { "EndTime", "StartTime" },
                values: new object[] { new DateTime(2025, 6, 11, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3898), new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3898) });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "VehicleId", "AdditionalInformation", "AuctionPrice", "BrandAndModel", "Color", "EndTime", "EngineCapacity", "Image", "IsActive", "ManufacturingYear", "Milage", "PlateNumber", "Price", "SellerId", "StartTime" },
                values: new object[] { 15, "Spacious and efficient", 110000.0, "Skoda Octavia", "White", new DateTime(2025, 6, 17, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3901), 1.6m, "skoda-octavia.jpg", true, 2015, 98000, "34FFF006", 118000m, "55623a4b-7e63-42c7-baa2-7d34ef4ea27b", new DateTime(2025, 4, 25, 17, 30, 52, 994, DateTimeKind.Local).AddTicks(3900) });
        }
    }
}
