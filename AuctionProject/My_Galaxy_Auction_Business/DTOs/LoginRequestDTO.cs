using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace My_Galaxy_Auction_Business.DTOs
{
    public class LoginRequestDTO
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }
}