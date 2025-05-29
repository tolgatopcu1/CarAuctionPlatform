using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using My_Galaxy_Auction_Data_Access.Context;
using My_Galaxy_Auction_Data_Access.Models;

namespace My_Galaxy_Auction.Extensions
{
    public static class PersistenceExtensionLayer
    {
        public static IServiceCollection AddPersistenceLayer(this IServiceCollection services, IConfiguration configuration)
        {
            #region Context
            
            #endregion
            return services;
        }
    }
}