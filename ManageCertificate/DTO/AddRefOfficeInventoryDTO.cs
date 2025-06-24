using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    using System.ComponentModel.DataAnnotations;

    public class AddRefOfficeInventoryDTO
    {
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Inventory חייב להיות 0 או מספר חיובי בלבד.")]
        public int? Inventory { get; set; }

        [Required]
        [Range(2020, 2080, ErrorMessage = "Year חייב להיות בין 2020 ל-2080.")]
        public int? Year { get; set; }

        [Required]
        [Range(1, 4, ErrorMessage = "CertificateId חייב להיות בין 1 ל-4.")]
        public int? CertificateId { get; set; }
    }

}

