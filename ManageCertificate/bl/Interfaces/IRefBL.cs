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
        Task<IEnumerable<RefStatus>> GetAllStatus();
        Task<RefInventory> GetInventoryById(int id);
        Task<List<RefInventory>> GetAllInventory();
    }
}
