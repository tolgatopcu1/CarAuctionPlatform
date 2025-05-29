using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;
using My_Galaxy_Auction_Data_Access.Context;
using My_Galaxy_Auction_Data_Access.Domain;

namespace My_Galaxy_Auction_Business.Concrete
{
    public class PaymentHistoryService : IPaymentHistoryService
    {
        private ApiResponse _apiResponse;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public PaymentHistoryService(ApiResponse apiResponse, ApplicationDbContext context, IMapper mapper)
        {
            _apiResponse = apiResponse;
            _context = context;
            _mapper = mapper;
        }

        public async Task<ApiResponse> CheckIsStatusForAuction(string userId, int vehicleId)
        {
            var response = await _context.PaymentHistories
                .FirstOrDefaultAsync(x => x.UserId == userId && x.VehicleId == vehicleId && x.IsActive == true);

            var apiResponse = new ApiResponse();

            if (response != null)
            {
                apiResponse.IsSuccess = true;
                apiResponse.Result = response;
            }
            else
            {
                apiResponse.IsSuccess = false;
            }

            return apiResponse;
        }

        public async Task<ApiResponse> CreatePaymentHistory(CreatePaymentHistoryDTO model)
        {
            if (model == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Model is not include some fields");
                return _apiResponse;
            }
            else
            {
                var objDTO = _mapper.Map<PaymentHistory>(model);
                objDTO.PayDate = DateTime.Now;
                objDTO.IsActive = true;

                await _context.PaymentHistories.AddAsync(objDTO);

                
                if (await _context.SaveChangesAsync() > 0)
                {
                    _apiResponse.IsSuccess = true;
                    _apiResponse.Result = model;
                    return _apiResponse;
                }
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Model is not include some fields");
                return _apiResponse;
            }
        }
    }
}