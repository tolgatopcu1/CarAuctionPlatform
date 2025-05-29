using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using My_Galaxy_Auction_Business.DTOs;

namespace My_Galaxy_Auction.Hubs
{
    public class BidUpdateHub : Hub
    {
        public async Task JoinVehicleGroup(string vehicleId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, vehicleId);
        }

        public async Task BroadcastBid(CreateBidDTO bid)
        {
            await Clients.Group(bid.VehicleId.ToString()).SendAsync("ReceiveBid", bid);
        }
    }
}