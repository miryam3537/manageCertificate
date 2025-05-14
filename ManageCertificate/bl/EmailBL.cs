using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using BL.Interfaces;
using Entites;
using Microsoft.Extensions.Configuration;

namespace BL
{
    public class EmailBL : IEmailBL
    {
        private readonly IConfiguration _configuration;

        public EmailBL(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public void SendEmail(EmailRequest emailRequest)
        {
            var fromEmail = _configuration["EmailSettings:FromEmail"];
            var smtpPassword = _configuration["EmailSettings:SmtpPassword"];
            var smtpHost = _configuration["EmailSettings:SmtpHost"];
            var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
            // פרטי האימייל והסיסמה

            // הגדרת ה-SMTP של Outlook
            using (var smtpClient = new SmtpClient(smtpHost, smtpPort))
            {
                smtpClient.Credentials = new NetworkCredential(fromEmail, smtpPassword);
                smtpClient.EnableSsl = true;

                // יצירת הודעת האימייל
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(fromEmail),
                    Subject = emailRequest.Subject,
                    Body = emailRequest.Body,
                    IsBodyHtml = false
                };
                mailMessage.To.Add(emailRequest.ToEmail);

                // שליחת האימייל
                smtpClient.Send(mailMessage);
            }
        }
    }
}


