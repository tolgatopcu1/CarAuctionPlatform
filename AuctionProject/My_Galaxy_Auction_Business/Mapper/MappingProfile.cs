using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using My_Galaxy_Auction_Business.DTOs;
using My_Galaxy_Auction_Data_Access.Domain;
using My_Galaxy_Auction_Data_Access.Models;

namespace My_Galaxy_Auction_Business.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<RegisterRequestDTO, ApplicationUser>().ReverseMap();
            CreateMap<CreateVehicleDTO, Vehicle>().ReverseMap();
            CreateMap<UpdateVehicleDTO, Vehicle>().ReverseMap();
            CreateMap<CreateBidDTO, Bid>().ReverseMap();
            CreateMap<UpdateBidDTO, Bid>().ReverseMap();
            CreateMap<CreatePaymentHistoryDTO, PaymentHistory>().ReverseMap();
        }
    }
}