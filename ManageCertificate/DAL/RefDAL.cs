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
        public async Task<IEnumerable<RefStatus>> GetAllStatus()
        {
            return await _context.RefStatuses.ToListAsync();
        }

        public async Task<RefInventory?> GetInventoryById(int id)
        {
            var inventory = await _context.RefInventories
                                  .Include(r => r.Certificate)
                                  .Include(r => r.Council)
                                  .FirstOrDefaultAsync(r => r.InventoryId == id);

            if (inventory == null)
                return null;
            return inventory;
            //return new RefInventoryDto
            //{
            //    InventoryId = inventory.InventoryId,
            //    CouncilId = inventory.CouncilId,
            //    CertificateId = inventory.CertificateId,
            //    Year = inventory.Year,
            //    Inventory = inventory.Inventory,
            //    Minimum = inventory.Minimum,
            //    CouncilName = inventory.Council?.Name,
            //    CertificateName = inventory.Certificate?.Name // בהנחה שיש שדה Name ב-RefCertificateType
            //};
        }
        public async Task<List<RefInventory>> GetAllInventory()
        {
            return await _context.RefInventories
                                 .Include(r => r.Certificate)
                                 .Include(r => r.Council)
                                 .ToListAsync();
        }
    }
}
