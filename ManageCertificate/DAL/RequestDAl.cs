
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
    public class RequestDAl : IRequestDAl
    {
        DatotDbContext _context;
        public RequestDAl(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<Request>> GetAllRequest()
        {
            return await _context.Requests
                                 .Include(r => r.Council)
                                 .Include(r => r.RequestStatusNavigation)
                                 .Include(r => r.Certificates)
                                 .ThenInclude(c => c.CertificateTypeNavigation)
                                 .AsNoTracking()
                                 .Take(30) 
                                 .ToListAsync();
      



            return await _context.Requests.ToListAsync();
        }  
        public async Task<Request> Get(int id)
        {
            return await _context.Requests
                                 .Include(r => r.Council)
                                 .Include(r => r.RequestStatusNavigation)
                                 .Include(r => r.Certificates)
                                 .ThenInclude(c => c.CertificateTypeNavigation)
                                 .FirstOrDefaultAsync(r => r.RequestId == id);
        }
    }

}
