
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Entites;


namespace DAL
{
    public class RequestDAl : IRequestDAl
    {
        DatotDbContext _context;
        public RequestDAl(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<Request>> Exmple()
        {

            return await _context.Requests.ToListAsync();
        }
        public async Task<Request> Get(int id)
        {
            return await _context.Requests.FirstOrDefaultAsync(r=>r.RequestId == id);
        }
    }

}
