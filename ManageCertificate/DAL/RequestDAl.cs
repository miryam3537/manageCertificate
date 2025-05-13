
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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
       

        public async Task PutRequestStatus(int id, Request upDateRequest)
        {
            // Retrieve the existing request from the database
            var existingRequest = await _context.Requests
                .Include(r => r.Certificates) // Include Certificates for proper tracking
                .FirstOrDefaultAsync(r => r.RequestId == id);

            if (existingRequest == null)
                throw new KeyNotFoundException($"Request with ID {id} not found.");
            upDateRequest.HandlingDate = DateTime.Now;
            // Update the properties of the existing request
            _context.Entry(existingRequest).CurrentValues.SetValues(upDateRequest);

            // Update the Certificates collection
            // First, remove certificates that are no longer present
            foreach (var existingCertificate in existingRequest.Certificates.ToList())
            {
                if (!upDateRequest.Certificates.Any(c => c.CertificateId == existingCertificate.CertificateId))
                {
                    _context.Certificates.Remove(existingCertificate);
                }
            }

            // Add or update certificates from the update request
            foreach (var certificate in upDateRequest.Certificates)
            {
                var existingCertificate = existingRequest.Certificates
                    .FirstOrDefault(c => c.CertificateId == certificate.CertificateId);

                if (existingCertificate != null)
                {
                    // Update existing certificate properties
                    _context.Entry(existingCertificate).CurrentValues.SetValues(certificate);
                }
                else
                {
                    // Add new certificate
                    existingRequest.Certificates.Add(certificate);
                }
            }

            // Save changes to the database
            await _context.SaveChangesAsync();
        }


    }

}
