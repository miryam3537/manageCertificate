using Entites;

namespace BL.Interfaces
{
    public interface IRequestBL
    {
        Task<IEnumerable<Request>> GetAllRequest();
        Task<Request> GetById(int id);
    }
}