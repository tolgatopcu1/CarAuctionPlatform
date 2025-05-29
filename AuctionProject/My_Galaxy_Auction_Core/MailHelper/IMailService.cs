using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace My_Galaxy_Auction_Core.MailHelper
{
    public interface IMailService
    {
        public void SendEmail(string subject, string body, string email);
    }
}