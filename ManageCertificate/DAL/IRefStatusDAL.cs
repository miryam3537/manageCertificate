using Entites;
using System.Threading.Tasks;

namespace DAL
{
    public interface IRefStatusDAL
    {
         Task<IEnumerable<RefStatus>> Get();
      
    }
}
