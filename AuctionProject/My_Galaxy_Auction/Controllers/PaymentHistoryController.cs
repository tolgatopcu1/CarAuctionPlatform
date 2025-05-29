using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;

namespace My_Galaxy_Auction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentHistoryController : ControllerBase
    {
        private readonly IPaymentHistoryService _paymentHistoryService;
        public PaymentHistoryController(IPaymentHistoryService paymentHistoryService)
        {
            _paymentHistoryService = paymentHistoryService;
        }

        [HttpPost("AddHistory")]
        public async Task<IActionResult> CreatePaymentHistory(CreatePaymentHistoryDTO model)
        {
            if (ModelState.IsValid)
            {
                var response = await _paymentHistoryService.CreatePaymentHistory(model);
                if (response.IsSuccess)
                {
                    return Ok(response);
                }
                return BadRequest();
            }
            return BadRequest();
        }

        [HttpPost("CheckStatus")]
        public async Task<IActionResult> CheckStatusAuction(CheckStatusModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // hata mesajını döner

            var response = await _paymentHistoryService.CheckIsStatusForAuction(model.UserId, model.VehicleId);
            if (response.IsSuccess)
            {
                return Ok(response);
            }
            return Ok(response); // response'u da dön ki neden başarısız olduğunu göresin
        }
    }
}