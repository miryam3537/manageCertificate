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
    public class CouncilDAL : ICouncilDAL
    {
        DatotDbContext _context;
        public CouncilDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        
        public async Task<IEnumerable<RefCouncil>> GetAllcouncil()
        {


            return await _context.RefCouncils.ToListAsync();
        }


    }
}
