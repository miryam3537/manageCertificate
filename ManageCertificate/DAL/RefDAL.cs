using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
using DAL.Interfaces;
using DTO;
namespace DAL
{
    public class RefDAL : IRefDAL
    {
        DatotDbContext _context;
        public RefDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<bool> OfficeInventoryExistsAsync(int year, int certificateId)
        {
            return await _context.RefOfficeInventories
                .AnyAsync(x => x.Year == year && x.CertificateId == certificateId);
        }

        public async Task<RefOfficeInventory?> AddOfficeInventoryAsync(AddRefOfficeInventoryDTO dto)
        {
           
            bool exists = await OfficeInventoryExistsAsync(dto.Year.Value, dto.CertificateId.Value);
            if (exists)
                throw new InvalidOperationException("כבר קיימים נתונים עבור שנה זו וסוג תעודה זה במערכת.");

            var entity = new RefOfficeInventory
            {
                Inventory = dto.Inventory,
                Year = dto.Year,
                CertificateId = dto.CertificateId
            };
            _context.RefOfficeInventories.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
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

        public async Task<bool> UpdateMinimum(int certificateId, int? minimum)
        {
            var existing = await _context.RefCertificateTypes
                .FirstOrDefaultAsync(r => r.Id == certificateId);

            if (existing == null)
                return false;

            existing.Minimum = minimum;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
