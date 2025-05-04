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
    public class CertificateDAL : ICertificateDAL
    {
        DatotDbContext _context;
        public CertificateDAL(DatotDbContext contex)
        {
            _context = contex;
        }
        public async Task<IEnumerable<Certificate>> Get(int? councilId)
        {
            // בניית השאילתה
            var query = _context.Certificates
                                .Include(c => c.Request) // טוען את ה-Request באופן חיצוני
                                .Where(c => councilId == null || c.Request.CouncilId == councilId);

            // החזרת התוצאה
            return await query.ToListAsync();
        }


    }
}
    

