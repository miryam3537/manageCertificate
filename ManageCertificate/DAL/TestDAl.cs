
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Entites;

namespace DAL
{
    public class TestDAl : ITestDAl
    {
        DatotDbContext _context;
        public TestDAl(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<Request>> Exmple()
        {

            return await _context.Requests.ToListAsync();
        }
    }

}
