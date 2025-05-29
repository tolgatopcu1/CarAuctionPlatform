using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using My_Galaxy_Auction_Business.Abstraction;
using My_Galaxy_Auction_Business.Concrete;
using My_Galaxy_Auction_Core.MailHelper;
using My_Galaxy_Auction_Core.Models;
using Stripe;

namespace My_Galaxy_Auction.Extensions
{
    public static class ServiceCollectionExt
    {
        public static IServiceCollection AddAplicationLayer(this IServiceCollection services, IConfiguration configuration)
        {
            #region services
            services.AddScoped<IUserService,UserService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<IBidService, BidService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<IPaymentHistoryService, PaymentHistoryService>();
            services.AddScoped(typeof(ApiResponse));
            #endregion
            return services;
        }
    }
}