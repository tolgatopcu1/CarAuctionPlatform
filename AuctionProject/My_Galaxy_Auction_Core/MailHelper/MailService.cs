using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace My_Galaxy_Auction_Core.MailHelper
{
    public class MailService : IMailService
    {
        public void SendEmail(string subject, string body, string email)
        {
            try
            {
                var emailToSend = new MimeMessage();
                emailToSend.From.Add(MailboxAddress.Parse("YourGalaxyAuction@gmail.com"));
                emailToSend.To.Add(MailboxAddress.Parse(email));
                emailToSend.Subject = subject;
                emailToSend.Body = new TextPart(MimeKit.Text.TextFormat.Html){ Text = body };

                using var emailClient = new SmtpClient();
                emailClient.Connect("smtp.gmail.com",587,MailKit.Security.SecureSocketOptions.StartTls);
                emailClient.Authenticate("identityappverified@gmail.com", "kpwgtfeqslwnhnfz");
                emailClient.Send(emailToSend);
                emailClient.Disconnect(true);

            }
            catch (Exception ex)
            {
                
                throw;
            }
        }
    }
}