
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class RefInventoryDTO
    {
        public int InventoryId { get; set; }
        public int? CouncilId { get; set; }
        public int? CertificateId { get; set; }
        public int? Year { get; set; }
        public int? Inventory { get; set; }
        public int? Minimum { get; set; }
        public string? CouncilName { get; set; } // מידע מ-RefCouncil
        public string? CertificateName { get; set; } // מידע מ-RefCe);

    }
}