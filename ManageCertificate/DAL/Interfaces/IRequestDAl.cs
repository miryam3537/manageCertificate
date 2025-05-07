using Entites;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IRequestDAl
    {
        Task<IEnumerable<Request>> GetAllRequest();
        Task<Request> Get(int id);
        Task Put(int id,int statusId);
    }
}