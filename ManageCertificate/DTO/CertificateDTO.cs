using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CertificateDTO
    {
        public int CertificateId { get; set; }
        public int? RequestId { get; set; }
        public int? CertificateType { get; set; }
        public int? RequestAmaunt { get; set; }
        public int? SupplyAmaunt { get; set; }
        public string? Comment { get; set; }
        public int? Used { get; set; }
        public RefCertificateTypeDTO? CertificateTypeNavigation { get; set; }
      
    }
}
