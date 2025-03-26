using Entites;

namespace BL
{
    public interface IRequestBL
    {
        Task<IEnumerable<Request>> Exmple();
        Task<Request> Get(int id);
    }
}