using Entites;
using System.Threading.Tasks;


namespace DAL.Interfaces
{
    public interface IRefDAL
    {
        Task<bool> UpdateInventoryAmountAsync(int inventoryId, int? inventory);

        Task<IEnumerable<RefStatus>> GetAllStatus();
        Task<RefInventory> GetInventoryById(int concilId, int certificateId); // אם המחלקה מוגדרת כ-RefInventoryDto
        Task<IEnumerable<Certificate>> GetAllCertificate();
        Task<List<RefInventory>> GetAllInventory();
        Task<List<RefCertificateType>> GetAllCertificateType();
        Task<IEnumerable<RefOfficeInventory>> GetAllOfficeInventory();
    }
}
