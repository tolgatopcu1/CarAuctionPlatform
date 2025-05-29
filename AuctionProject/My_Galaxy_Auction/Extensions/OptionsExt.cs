using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using My_Galaxy_Auction_Core.Common;

namespace My_Galaxy_Auction.Extensions
{
    public static class OptionsExt
    {
        public static IServiceCollection AddInfrastructureLayer(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<StripeSettings>(options => configuration.GetSection("Stripe").Bind(options));
            return services;
        }
    }
}