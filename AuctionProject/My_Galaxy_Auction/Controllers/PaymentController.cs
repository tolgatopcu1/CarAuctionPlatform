using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Common;
using My_Galaxy_Auction_Core.Models;
using My_Galaxy_Auction_Data_Access.Context;
using Stripe;

namespace My_Galaxy_Auction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private ApiResponse _apiResponse;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private StripeSettings _stripeSettings;
        public PaymentController(IConfiguration configuration,IOptions<StripeSettings> options, ApiResponse  apiResponse, ApplicationDbContext context)
        {
            _configuration = configuration;
            _apiResponse = apiResponse;
            _context = context;
            _stripeSettings = options.Value;
        }

        [HttpPost("Pay")]
        public async Task<ActionResult<ApiResponse>> MakePayment(string userId, int vehicleId)
        {
            StripeConfiguration.ApiKey = _stripeSettings.SecretKey;
            var amountToBePaid = await _context.Vehicles.FirstOrDefaultAsync(x => x.VehicleId == vehicleId);

            var options = new PaymentIntentCreateOptions
            {
                Amount = (int)(amountToBePaid.AuctionPrice * 100),
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" }
            };

            var service = new PaymentIntentService();
            var response = service.Create(options);


            CreatePaymentHistoryDTO model = new()
            {
                ClientSecret = response.ClientSecret,
                StripePaymentIntentId = response.Id,
                UserId = userId,
                VehicleId = vehicleId
            };

            _apiResponse.IsSuccess = true;
            _apiResponse.Result = model;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;
            return Ok(_apiResponse);




        }

    }
}