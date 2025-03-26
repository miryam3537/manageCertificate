using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
namespace DAL
{
    public class RefStatusDAL:IRefStatusDAL
    {
        DatotDbContext _context;
        public RefStatusDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<RefStatus>> Get()
        {
            return await _context.RefStatuses.ToListAsync();
        }
    }
}
