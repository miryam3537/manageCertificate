using System;
using System.Collections.Generic;

namespace ManageCertificate.Models;

public partial class RefInventory
{
    public int InventoryId { get; set; }

    public int? CouncilId { get; set; }

    public int? CertificateId { get; set; }

    public int? Year { get; set; }

    public int? Inventory { get; set; }

    public int? Minimum { get; set; }

    public int? Estimate { get; set; }

    public virtual RefCertificateType? Certificate { get; set; }

    public virtual RefCouncil? Council { get; set; }
}
