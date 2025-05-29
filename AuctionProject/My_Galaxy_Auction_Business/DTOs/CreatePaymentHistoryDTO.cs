using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace My_Galaxy_Auction_Business.DTOs
{
    public class CreatePaymentHistoryDTO
    {
        public string? ClientSecret { get; set; }
        public string? StripePaymentIntentId { get; set; }
        public string? UserId { get; set; }
        public int VehicleId { get; set; }

    }
}