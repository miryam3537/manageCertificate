using Entites;

namespace BL.Interfaces
{
    public interface IEmailBL
    {
        void SendEmail(EmailRequest emailRequest);
    }
}