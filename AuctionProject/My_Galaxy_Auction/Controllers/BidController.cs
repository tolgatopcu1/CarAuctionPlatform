using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction.Hubs;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Data_Access.Context;
using Newtonsoft.Json;

namespace My_Galaxy_Auction.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly IBidService _service;
        private readonly IHubContext<BidUpdateHub> _hubContext;
        private readonly ApplicationDbContext _context;
        public BidController(IBidService service, IHubContext<BidUpdateHub> hubContext, ApplicationDbContext context)
        {
            _service = service;
            _hubContext = hubContext;
            _context = context;
        }



        // BidController.cs içinde:
        [HttpPost("Create")]
        public async Task<IActionResult> CreateBid([FromBody] CreateBidDTO model)
        {
            if (ModelState.IsValid)
            {
                var result = await _service.CreateBid(model);

                if (!result.IsSuccess)
                {
                    return BadRequest(result);
                }

                if (result.Result != null)
                {
                    var bidDTO = new BidDTO
                    {
                        VehicleId = model.VehicleId, // CreateBidDTO'dan alıyoruz
                        BidAmount = model.BidAmount, // CreateBidDTO'dan alıyoruz
                        UserId = model.UserId,       // CreateBidDTO'dan alıyoruz
                        BidDate = DateTime.Now,
                        BidStatus = "Active"
                    };
                    await _hubContext.Clients.Group(bidDTO.VehicleId.ToString()).SendAsync("ReceiveBid", bidDTO);
                }

                return Ok(result);
            }

            var errors = ModelState.Values.SelectMany(v => v.Errors)
                                        .Select(e => e.ErrorMessage)
                                        .ToList();

            return BadRequest(new { Errors = errors });
        
        }




        [HttpGet("{bidId:int}")]
        public async Task<IActionResult> GetBidById(int bidId)
        {

            var result = await _service.GetBidById(bidId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateBid(int bidId, UpdateBidDTO model)
        {

            if (ModelState.IsValid)
            {
                var result = await _service.UpdateBid(bidId, model);
                if (!result.IsSuccess)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpPost("AutomaticallyCreate")]
        public async Task<IActionResult> AutomaticallyCreateBid(CreateBidDTO model)
        {
            if (ModelState.IsValid)
            {
                var result = await _service.AutomaticallyCreateBid(model);
                if (!result.IsSuccess)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("GetBidByVehicleId/{vehicleId:int}")]
        public async Task<IActionResult> GetBidByVehicleId(int vehicleId)
        {

            var result = await _service.GetBidByVehicleId(vehicleId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpGet("GetBidsByUserId/{userId}")]
        public async Task<IActionResult> GetBidsByUserId(string userId)
        {
            var result = await _service.GetBidsByUserId(userId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }
        [HttpGet("GetHighestBidByVehicleId/{vehicleId}")]
        public async Task<IActionResult> GetHighestBidByVehicleId(int vehicleId)
        {
            var result = await _service.GetHighestBidByVehicleId(vehicleId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}