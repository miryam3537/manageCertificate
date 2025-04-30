using Entites;
using System.Threading.Tasks;


namespace DAL.Interfaces
{
    public interface IRefDAL
    {
        Task<IEnumerable<RefStatus>> GetAllStatus();
        Task<RefInventory> GetInventoryById(int id); // אם המחלקה מוגדרת כ-RefInventoryDto

        Task<List<RefInventory>> GetAllInventory();
    }
}
