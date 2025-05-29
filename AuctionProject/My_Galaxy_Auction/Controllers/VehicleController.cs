using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;

namespace My_Galaxy_Auction.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : Controller
    {
        private readonly IVehicleService _vehicleService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public VehicleController(IVehicleService vehicleService, IWebHostEnvironment webHostEnvironment)
        {
            _vehicleService = vehicleService;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("CreateVehicle")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> CreateVehicle([FromForm] CreateVehicleDTO model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.File == null || model.File.Length == 0)
                    {
                        return BadRequest("File is required.");
                    }

                    string uploadsFolder = Path.Combine(_webHostEnvironment.ContentRootPath, "Images");
                    string fileName = $"{Guid.NewGuid()}{Path.GetExtension(model.File.FileName)}";
                    string filePath = Path.Combine(uploadsFolder, fileName);

                    model.Image = fileName;

                    var result = await _vehicleService.CreateVehicle(model);
                    if (result.IsSuccess)
                    {
                        using (var fileStream = new FileStream(filePath, FileMode.Create))
                        {
                            await model.File.CopyToAsync(fileStream);
                        }
                        return Ok(result);
                    }
                }

                // Log hatalı alanları
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { message = "Model validation failed", errors });
            }
            catch (Exception ex)
            {
                // Konsola bas
                Console.WriteLine("CreateVehicle ERROR => " + ex.Message);
                return StatusCode(500, new { message = "Internal Server Error", detail = ex.Message });
            }
        }
        [HttpGet("GetVehicles")]
        public async Task<IActionResult> GetVehicles()
        {
            var result = await _vehicleService.GetVehicles();
            return Ok(result);
        }
        [HttpPut("UpdateVehicle")]
        public async Task<IActionResult> UpdateVehicle(int vehicleId, [FromForm] UpdateVehicleDTO model)
        {
            if (ModelState.IsValid)
            {
                var result = await _vehicleService.UpdateVehicle(vehicleId, model);
                if (result.IsSuccess)
                {
                    return Ok(result);
                }
            }
            return BadRequest();
        }
        [Authorize(Roles = "Administrator")]
        [HttpDelete("Remove/{vehicleId}")]
        public async Task<IActionResult> DeleteVehicle([FromRoute] int vehicleId)
        {
            var result = await _vehicleService.DeleteVehicle(vehicleId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest();
        }

        [HttpGet("{vehicleId}")]
        public async Task<IActionResult> GetVehicleById([FromRoute] int vehicleId)
        {
            var result = await _vehicleService.GetVehicleById(vehicleId);
            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest();
        }
        [HttpPatch("toggle-activity/{vehicleId}")]
        public async Task<IActionResult> ToggleVehicleActivity([FromRoute] int vehicleId)
        {
            var result = await _vehicleService.ToggleVehicleActivity(vehicleId);

            if (result.IsSuccess)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPut("{vehicleId}")]
        public async Task<IActionResult> ChangeStatus([FromRoute] int vehicleId)
        {
            if (ModelState.IsValid)
            {
                var result = await _vehicleService.ChangeVehicleStatus(vehicleId);
                if (result.IsSuccess)
                {
                    return Ok(result);
                }
            }
            return BadRequest();
        }

        [HttpGet("GetVehiclesByUserId/{userId}")]
        public async Task<IActionResult> GetVehiclesByUserId(string userId)
        {
            
            var result = await _vehicleService.GetVehiclesByUserId(userId);
            if (result.IsSuccess == false)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}