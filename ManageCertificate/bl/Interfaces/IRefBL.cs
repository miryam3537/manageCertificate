using DTO;
using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Interfaces
{
    public interface IRefBL
    {
        Task<bool> UpdateInventoryAmountAsync(int inventoryId, int? inventory);


        Task<IEnumerable<RefStatus>> GetAllStatus();
        Task<RefInventoryDTO> GetInventoryById(int concilId, int certificateId);
        Task<List<RefInventoryDTO>> GetAllInventory();
        Task<IEnumerable<CertificateDTO>> GetAllCertificate();
        Task<List<RefCertificateType>> GetAllCertificateType();
        Task<IEnumerable<RefOfficeInventory>> GetAllOfficeInventory();
    }
}
