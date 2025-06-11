using System;
using System.Collections.Generic;

namespace Entites;

public partial class RefOfficeInventory
{
    public int Id { get; set; }

    public int? Inventory { get; set; }

    public int? Year { get; set; }

    public int? CertificateId { get; set; }

    public virtual RefCertificateType? Certificate { get; set; }
}
