using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using My_Galaxy_Auction_Data_Access.Domain;

namespace My_Galaxy_Auction_Data_Access.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string? FullName { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }

        public ICollection<PaymentHistory>? PaymentHistories { get; set; }
        public ICollection<Vehicle>? Vehicles { get; set; }
        public ICollection<Bid>? Bids { get; set; }
    }
}