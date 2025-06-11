using AutoMapper;
using BL;
using DAL.Interfaces;
using DAL;
using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BL.Interfaces;

namespace BL
{
    public class OfficeInventoryBL: IOfficeInventoryBL
    {
        IOfficeInventoryDAL officeInventoryDAL;
        DatotDbContext _context;
        public OfficeInventoryBL(IOfficeInventoryDAL officeInventoryDAL, DatotDbContext contex)
        {
            this.officeInventoryDAL = officeInventoryDAL;
            _context = contex;
        }

        public  Task<IEnumerable<RefOfficeInventory>> GetAllOfficeInventory()
        {
            return officeInventoryDAL.GetAllOfficeInventory();
        }
    }
}
