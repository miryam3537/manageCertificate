using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class EmailBL
    {
        public void SendEmail(string toEmail, string subject, string body)
        {
            var fromEmail = "siteloggermail@gmail.com";
            var smtpPassword = "xclbrhazlcfxuwps";

            using (var smtpClient = new SmtpClient("smtp.gmail.com", 587))
            {
                smtpClient.Credentials = new NetworkCredential(fromEmail, smtpPassword);
                smtpClient.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = false
                };
                mailMessage.To.Add(toEmail);

                smtpClient.Send(mailMessage);
            }
        }
    }


}
