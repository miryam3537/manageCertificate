using Entites;
using DTO;

namespace BL.Interfaces
{
    public interface IRequestBL
    {
        Task<IEnumerable<Request>> GetAllRequest();
        Task<RequestDTO> Get(int id);
        Task<RequestDTO> PutRequest(int id,int? previousStatusId, RequestDTO PutRequest);
        Task<int> GetCouncilIdByRequestIdAsync(int requestId);
    }
}