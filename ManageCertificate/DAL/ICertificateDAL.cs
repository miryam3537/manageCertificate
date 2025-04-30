using Entites;

namespace DAL
{
    internal interface ICertificateDAL
    {
        Task<IEnumerable<Certificate>> Get();
    }
}