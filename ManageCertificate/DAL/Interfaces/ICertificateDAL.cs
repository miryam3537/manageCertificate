using Entites;

namespace DAL.Interfaces
{
    public interface ICertificateDAL
    {
        Task<IEnumerable<Certificate>> Get(int? concilId);
    }
}