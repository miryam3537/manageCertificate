
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public record CertificateDTO(int CertificateId, int? RequestId,RefCertificateTypeDTO? CertificateTypeNavigation,int? RequestAmaunt,int? SupplyAmaunt,string? Comment);
   
}
