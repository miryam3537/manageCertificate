using DAL;
using DAL.Interfaces;
using Entites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class OfficeInventoryDAL: IOfficeInventoryDAL
    {
        DatotDbContext _context;
        public OfficeInventoryDAL(DatotDbContext contex)
        {
            _context = contex;
        }

        public async Task<IEnumerable<OfficeInventory>> GetAllOfficeInventory()
        {
            return await _context.OfficeInventories.ToListAsync();
        }
    }
}


