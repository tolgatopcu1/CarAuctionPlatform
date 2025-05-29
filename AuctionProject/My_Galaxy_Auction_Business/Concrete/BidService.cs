using AutoMapper;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Core.Models;
using My_Galaxy_Auction_Data_Access.Context;
using My_Galaxy_Auction_Data_Access.Domain;

namespace My_Galaxy_Auction_Business.Concrete
{
    public class BidService : IBidService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private ApiResponse _apiResponse;

        public BidService(ApplicationDbContext context, IMapper mapper, ApiResponse apiResponse)
        {
            _context = context;
            _mapper = mapper;
            _apiResponse = apiResponse;
        }

        public async Task<ApiResponse> AutomaticallyCreateBid(CreateBidDTO model)
        {
            var isPaid = await CheckIsPaidAuction(model.UserId, model.VehicleId);
            if (!isPaid)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Please before pay auction price");
                return _apiResponse;
            }

            var obj = await _context.Bids.Where(x=>x.VehicleId == model.VehicleId && x.Vehicle.IsActive == true).OrderByDescending(x=>x.BidAmount).ToListAsync();
            if (obj.Count == 0)
            {
                _apiResponse.IsSuccess = false;
                return _apiResponse;
            }
            var objDTO = _mapper.Map<Bid>(obj);
            objDTO.BidAmount = obj[0].BidAmount + (obj[0].BidAmount * 10) / 100;
            objDTO.BidDate = DateTime.Now;
            _context.Bids.Add(objDTO);
            await _context.SaveChangesAsync();
            _apiResponse.IsSuccess = true;
            _apiResponse.Result = objDTO;
            return _apiResponse;
        }

        public Task<ApiResponse> CancelBid(int bidId)
        {
            throw new NotImplementedException();
        }




        public async Task<ApiResponse> CreateBid(CreateBidDTO model)
        {
            var isVehicleActive = await CheckIsVehicleActive(model.VehicleId); // bool döndürdüğünü varsayıyorum
            var isPaid = await CheckIsPaidAuction(model.UserId, model.VehicleId);

            if (!isPaid)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Please before pay auction price");
                return _apiResponse;
            }
            // CheckIsVehicleActive'in bool döndürdüğünü varsayarak kontrolü güncelledim
            if (!isVehicleActive)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("This car is not active");
                return _apiResponse;
            }


            if (model != null)
            {
                var vehicle = await _context.Vehicles.FindAsync(model.VehicleId);

                if (vehicle == null)
                {
                    _apiResponse.IsSuccess = false;
                    _apiResponse.ErrorMessages.Add("Teklif verilen araç bulunamadı.");
                    return _apiResponse;
                }

                var topPrice = await _context.Bids
                    .Where(x => x.VehicleId == model.VehicleId)
                    .OrderByDescending(x => x.BidAmount)
                    .FirstOrDefaultAsync(); // ToListAsync yerine FirstOrDefaultAsync kullanmak daha verimli

                decimal newBid = Convert.ToDecimal(model.BidAmount);

                if (topPrice != null)
                {
                    decimal topBid = topPrice.BidAmount;
                    decimal minRequiredBid = Math.Ceiling(topBid * 1.02m); // %2 fazlasını al ve yukarı yuvarla

                    if (newBid < minRequiredBid)
                    {
                        _apiResponse.IsSuccess = false;
                        _apiResponse.ErrorMessages.Add($"Girilen teklif aracın en yüksek teklifinden %2 fazla olmalı. Girebileceğiniz minimum değer: {minRequiredBid:N0} ₺");
                        return _apiResponse;
                    }
                }

                Bid bid = _mapper.Map<Bid>(model);
                bid.BidDate = DateTime.Now;
                bid.BidStatus = "Active";
                await _context.Bids.AddAsync(bid);

                if (await _context.SaveChangesAsync() > 0)
                {
                    _apiResponse.IsSuccess = true;
                    _apiResponse.Result = model;
                    return _apiResponse;
                }
            }

            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Ooops! something went wrong");
            return _apiResponse;
        }






        public async Task<ApiResponse> GetBidById(int bidId)
        {
            var obj = await _context.Bids.Include(x => x.User).Where(x => x.BidId == bidId).FirstOrDefaultAsync();
            if (obj == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Ooops! something went wrong");
                return _apiResponse;
            }

            _apiResponse.IsSuccess = true;
            _apiResponse.Result = obj;
            return _apiResponse;
        }

        public async Task<ApiResponse> GetBidByVehicleId(int vehicleId)
        {
            var obj = await _context.Bids.Include(x=>x.Vehicle).ThenInclude(y=>y.Bids).Where(x=>x.VehicleId == vehicleId).ToListAsync();
            if (obj != null)
            {
                _apiResponse.IsSuccess = true;
                _apiResponse.Result = obj;
                return _apiResponse;
            }
            _apiResponse.IsSuccess = false;
            return _apiResponse;
        }

        public async Task<ApiResponse> UpdateBid(int bidId, UpdateBidDTO model)
        {
            // Update eden kullanıcı en son verdiği teklifin üstüne çıkmalıdır.
            var isPaid = await CheckIsPaidAuction(model.UserId, model.VehicleId);
            if (!isPaid)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Please before pay auction price");
                return _apiResponse;
            }

            var obj = await _context.Bids.Where(x=>x.BidId == bidId).FirstOrDefaultAsync();
            if (obj == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Ooops! something went wrong");
                return _apiResponse;
            }

            if (obj.BidAmount < model.BidAmount && obj.UserId == model.UserId)
            {
                var objDto = _mapper.Map(model, obj);
                objDto.BidDate = DateTime.Now;
                _apiResponse.IsSuccess = true;
                _apiResponse.Result = objDto;
                await _context.SaveChangesAsync();
                return _apiResponse;
            }
            else if(obj.BidAmount >= model.BidAmount)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("You are not entry low price than your old bid amount, your older bid amount is: " + obj.BidAmount);
                return _apiResponse;
            }
            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Ooops! something went wrong");
            return _apiResponse;
        }

        private async Task<bool> CheckIsVehicleActive(int vehicleId)
        {
            var obj = await _context.Vehicles.Where(x=>x.VehicleId == vehicleId && x.IsActive == true && x.EndTime >= DateTime.Now).FirstOrDefaultAsync();

            if (obj != null)
            {
                return true;
            }
            return false;
        }

        private async Task<bool> CheckIsPaidAuction(string userId, int vehicleId)
        {
            var obj = await _context.PaymentHistories.Where(x=>x.UserId == userId && x.VehicleId == vehicleId && x.IsActive == true).FirstOrDefaultAsync();
            if (obj != null)
            {
                return true;
            }
            return false;
        }

        public async Task<ApiResponse> GetBidsByUserId(string userId)
        {
            var bids = await _context.Bids.Include(v => v.Vehicle).Where(b => b.UserId == userId).Select(b => new BidVehicledto
            {
                BidId = b.BidId,
                BidAmount = b.BidAmount,
                BidDate = b.BidDate,
                VehicleId = b.VehicleId,
                BidStatus = b.BidStatus,
                IsActive = b.Vehicle.IsActive,
                VehicleBrandAndModel = b.Vehicle != null ? b.Vehicle.BrandAndModel ?? "Bilinmiyor" : "Yok"
            })
        .ToListAsync();
            if (bids == null)
            {
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Teklif bulunamadı");
                return _apiResponse;
            }
            _apiResponse.IsSuccess = true;
            _apiResponse.Result = bids;
            return _apiResponse;
        }

        public async Task<ApiResponse> GetHighestBidByVehicleId(int vehicleId)
        {
            var heighestBid = await _context.Bids
            .Where(b => b.VehicleId == vehicleId)
            .OrderByDescending(b => b.BidAmount)
            .Select(b => new {
                UserId = b.UserId,
                Amount = b.BidAmount
            })
            .FirstOrDefaultAsync();

            if (heighestBid == null)
            {
                _apiResponse.IsSuccess = true;
                _apiResponse.Result = null;
            }
            else
            {
                _apiResponse.IsSuccess = true;
                _apiResponse.Result = heighestBid;
            }

            return _apiResponse;

        }
    }
}