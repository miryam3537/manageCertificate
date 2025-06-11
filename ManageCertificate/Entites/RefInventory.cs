using System;
using System.Collections.Generic;


namespace Entites;
public partial class RefInventory
{
    public int InventoryId { get; set; }

    public int? CouncilId { get; set; }

    public int? CertificateId { get; set; }

    public int? Year { get; set; }

    public int? Inventory { get; set; }

    public virtual RefCertificateType? Certificate { get; set; }

    public virtual RefCouncil? Council { get; set; }
}
