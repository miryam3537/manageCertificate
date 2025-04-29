using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
using DAL.Interfaces;
using BL.Interfaces;
using DAL;
namespace BL

{
    public class RefBL : IRefBL
    {
        IRefDAL refDAL;

        public RefBL(IRefDAL refDAL)
        {
            this.refDAL = refDAL;
        }

        public Task<IEnumerable<RefStatus>> GetAllStatus()
        {
            return refDAL.GetAllStatus();
        }
        public async Task<RefInventory> GetInventoryById(int id)
        {
            RefInventory inventory = await refDAL.GetInventoryById(id);
            return inventory;
        }

        public Task<List<RefInventory>> GetAllInventory()
        {
            return refDAL.GetAllInventory();
        }
    }
}
