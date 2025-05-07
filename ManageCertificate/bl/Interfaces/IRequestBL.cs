using Entites;
using DTO;

namespace BL.Interfaces
{
    public interface IRequestBL
    {
        Task<IEnumerable<Request>> GetAllRequest();
        Task<RequestDTO> Get(int id);
        Task Put(int id, int statusId);
    }
}