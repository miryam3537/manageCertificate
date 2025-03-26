using Entites;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRequestDAl
    {
        Task<IEnumerable<Request>> Exmple();
        Task<Request> Get(int id);
    }
}