using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;

namespace DAL
{
    internal class CertificateDAL : ICertificateDAL
    {
        DatotDbContext _context;
        public CertificateDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<Certificate>> Get()
        {

            return await _context.Certificates.ToListAsync();
        }

    }
}
    

