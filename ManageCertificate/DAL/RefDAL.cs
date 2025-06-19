using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
using DAL.Interfaces;
namespace DAL
{
    public class RefDAL : IRefDAL
    {
        DatotDbContext _context;
        public RefDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<RefOfficeInventory>> GetAllOfficeInventory()
        {
            return await _context.RefOfficeInventories.ToListAsync();
        }
        public async Task<IEnumerable<RefStatus>> GetAllStatus()
        {
            return await _context.RefStatuses.ToListAsync();
        }

        public async Task<RefInventory?> GetInventoryById(int concilId, int certificateId)
        {
            var inventory = await _context.RefInventories
                                  .Include(r => r.Certificate)
                                  .Include(r => r.Council)
                                  .FirstOrDefaultAsync(r => r.CouncilId == concilId&& r.CertificateId == certificateId);

            if (inventory == null)
                return null;
            return inventory;
            
        }
        public async Task<List<RefInventory>> GetAllInventory()
        {
            return await _context.RefInventories
                                 .Include(r => r.Certificate)
                                 .Include(r => r.Council)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Certificate>> GetAllCertificate()
        {
            return await _context.Certificates.ToListAsync();
        }

        public async Task<List<RefCertificateType>> GetAllCertificateType()
        {
            return await _context.RefCertificateTypes.ToListAsync();
        }

        public async Task<bool> UpdateInventoryAmountAsync(int inventoryId, int? inventory)
        {
            var existing = await _context.RefInventories
                .FirstOrDefaultAsync(r => r.InventoryId == inventoryId);

            if (existing == null)
                return false;

            existing.Inventory = inventory;
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
