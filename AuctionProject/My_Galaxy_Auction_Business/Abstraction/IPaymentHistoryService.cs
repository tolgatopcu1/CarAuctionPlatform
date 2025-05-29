using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;

namespace My_Galaxy_Auction_Business.Abstraction
{
    public interface IPaymentHistoryService
    {
        Task<ApiResponse> CreatePaymentHistory(CreatePaymentHistoryDTO model);
        Task<ApiResponse> CheckIsStatusForAuction(string userId, int vehicleId);
    }
}