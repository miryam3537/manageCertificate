using Entites;
using DTO;

namespace BL.Interfaces
{
    public interface IRequestBL
    {
        Task<IEnumerable<Request>> GetAllRequest();
        Task<RequestByIdDTO> Get(int id);
    }
}