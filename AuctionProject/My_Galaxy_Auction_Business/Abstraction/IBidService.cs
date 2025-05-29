using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;

namespace My_Galaxy_Auction_Business.Abstraction
{
    public interface IBidService
    {
        Task<ApiResponse> CreateBid(CreateBidDTO model);
        Task<ApiResponse> UpdateBid(int bidId, UpdateBidDTO model);
        Task<ApiResponse> GetBidById(int bidId);
        Task<ApiResponse> CancelBid(int bidId);

        Task<ApiResponse> AutomaticallyCreateBid(CreateBidDTO model);
        Task<ApiResponse> GetBidByVehicleId(int vehicleId);
        Task<ApiResponse> GetBidsByUserId(string userId);
        Task<ApiResponse> GetHighestBidByVehicleId(int vehicleId);
        
    }
}