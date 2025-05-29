using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;
using My_Galaxy_Auction_Data_Access.Context;
using My_Galaxy_Auction_Data_Access.Domain;

namespace My_Galaxy_Auction_Business.Concrete
{
    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _context;
        private ApiResponse _apiResponse;
        private readonly IMapper _mapper;
        public VehicleService(ApplicationDbContext context, ApiResponse apiResponse, IMapper mapper)
        {
            _context = context;
            _apiResponse = apiResponse;
            _mapper = mapper;
        }

        public async Task<ApiResponse> ChangeVehicleStatus(int vehicleId)
        {
            var result = await _context.Vehicles.FindAsync(vehicleId);
            if (result != null)
            {
                result.IsActive = false;

                _apiResponse.IsSuccess = true;
                _apiResponse.Result = result;
                await _context.SaveChangesAsync();
                return _apiResponse;
            }
            _apiResponse.IsSuccess = false;
            return _apiResponse;
        }

        public async Task<ApiResponse> CreateVehicle(CreateVehicleDTO model)
        {
            if (model == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Model boş olamaz.");
                return _apiResponse;
            }

            var objDTO = _mapper.Map<Vehicle>(model);

            if (string.IsNullOrEmpty(model.SellerId))
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("SellerId gereklidir.");
                return _apiResponse;
            }

            // Fotoğraf kaydı
            if (model.File != null && model.File.Length > 0)
            {
                var fileName = $"{Guid.NewGuid()}_{model.File.FileName}";
                var filePath = Path.Combine("wwwroot/images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.File.CopyToAsync(stream);
                }
                objDTO.Image = "/images/" + fileName;
            }

            objDTO.IsActive = false; // Admin onayı bekleniyor
            objDTO.StartTime = DateTime.Now;

            // objDTO.EndTime = DateTime.Today.AddHours(17);
            objDTO.EndTime = DateTime.Now.AddMinutes(3);
            objDTO.AuctionPrice = 50;
            _context.Vehicles.Add(objDTO);
            if (await _context.SaveChangesAsync() > 0)
            {
                _apiResponse.IsSuccess = true;
                _apiResponse.Result = objDTO;
                _apiResponse.StatusCode = System.Net.HttpStatusCode.Created;
                return _apiResponse;
            }

            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Veri kaydedilemedi.");
            return _apiResponse;
        }
        public async Task<ApiResponse> ToggleVehicleActivity(int vehicleId)
        {
            var vehicle = await _context.Vehicles.FindAsync(vehicleId);
            if (vehicle == null)
            {
                _apiResponse.Result = false;
                _apiResponse.IsSuccess = true;
                _apiResponse.ErrorMessages.Add("Veri kaydedilemedi.");
                return _apiResponse;
            }

            vehicle.IsActive = !vehicle.IsActive;
            await _context.SaveChangesAsync();

            _apiResponse.Result = true;
            _apiResponse.IsSuccess = true;
            _apiResponse.ErrorMessages.Add("Veri kaydedildi.");
            return _apiResponse;
        }
        public async Task<ApiResponse> DeleteVehicle(int vehicleId)
        {
            var result = await _context.Vehicles.FirstOrDefaultAsync(x => x.VehicleId == vehicleId);
            if (result != null)
            {
                _context.Vehicles.Remove(result);
                if (await _context.SaveChangesAsync() > 0)
                {
                    _apiResponse.IsSuccess = true;
                    return _apiResponse;
                }
            }
            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Vehicle is null");
            return _apiResponse;
        }

        public async Task<ApiResponse> GetVehicleById(int vehicleId)
        {
            var result = await _context.Vehicles.Include(y => y.Seller).Include(x => x.Bids).FirstOrDefaultAsync(x => x.VehicleId == vehicleId);
            if (result != null)
            {
                DeactivateIfExpired(result);
                await _context.SaveChangesAsync(); // isActive değiştiyse kaydet
                _apiResponse.Result = result;
                _apiResponse.IsSuccess = true;
                return _apiResponse;
            }
            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Vehicle is null");
            return _apiResponse;
        }

        public async Task<ApiResponse> GetVehicles()
        {
            var result = await _context.Vehicles.Include(x => x.Seller).Include(x => x.Bids).ToListAsync();

            foreach (var vehicle in result)
            {
                DeactivateIfExpired(vehicle);
            }

            await _context.SaveChangesAsync();

            _apiResponse.Result = result;
            _apiResponse.IsSuccess = true;
            return _apiResponse;
        }

        public async Task<ApiResponse> UpdateVehicle(int vehicleId, UpdateVehicleDTO model)
        {
            var result = await _context.Vehicles.FindAsync(vehicleId);
            if (result != null)
            {
                // mapper kullanarak result ile aldığımız araca model içindeki güncellenmiş verileri objDTO'ya aktardık. Artık sadece objDTO var
                var objDTO = _mapper.Map(model, result);
                if (await _context.SaveChangesAsync() > 0)
                {
                    _apiResponse.Result = objDTO;
                    _apiResponse.IsSuccess = true;
                    return _apiResponse;
                }
            }
            _apiResponse.IsSuccess = true;
            return _apiResponse;
        }

        public async Task<ApiResponse> GetVehiclesByUserId(string userId)
        {
            if (userId == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("UserId is null");
                return _apiResponse;
            }

            var vehicles = await _context.Vehicles.Where(v => v.SellerId == userId).ToListAsync();

            foreach (var vehicle in vehicles)
            {
                DeactivateIfExpired(vehicle);
            }

            await _context.SaveChangesAsync();

            var vehicleDtos = vehicles.Select(v => new VehicleUserdto
            {
                VehicleId = v.VehicleId,
                BrandAndModel = v.BrandAndModel ?? "Bilinmiyor",
                Color = v.Color,
                ManufacturingYear = v.ManufacturingYear,
                Price = v.Price,
                Image = v.Image,
                IsActive = v.IsActive
            }).ToList();

            _apiResponse.Result = vehicleDtos;
            _apiResponse.IsSuccess = true;
            return _apiResponse;
        }
        private void DeactivateIfExpired(Vehicle vehicle)
        {
            if (vehicle.IsActive && vehicle.EndTime <= DateTime.Now)
            {
                vehicle.IsActive = false;
            }
        }
    }
}
