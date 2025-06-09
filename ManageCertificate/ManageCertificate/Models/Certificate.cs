using System;
using System.Collections.Generic;

namespace ManageCertificate.Models;

public partial class Certificate
{
    public int CertificateId { get; set; }

    public int? RequestId { get; set; }

    public int? CertificateType { get; set; }

    public int? RequestAmaunt { get; set; }

    public int? SupplyAmaunt { get; set; }

    public string? Comment { get; set; }

    public virtual RefCertificateType? CertificateTypeNavigation { get; set; }

    public virtual Request? Request { get; set; }
}
