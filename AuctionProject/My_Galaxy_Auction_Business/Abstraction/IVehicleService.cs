using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;

namespace My_Galaxy_Auction_Business.Abstraction
{
    public interface IVehicleService
    {
        Task<ApiResponse> CreateVehicle(CreateVehicleDTO model);
        Task<ApiResponse> GetVehicles();
        Task<ApiResponse> UpdateVehicle(int vehicleId, UpdateVehicleDTO model);
        Task<ApiResponse> DeleteVehicle(int vehicleId);
        Task<ApiResponse> GetVehicleById(int vehicleId);
        Task<ApiResponse> ChangeVehicleStatus(int vehicleId);
        Task<ApiResponse> ToggleVehicleActivity(int vehicleId);
        Task<ApiResponse> GetVehiclesByUserId(string userId);
    }
}