using System;
using System.Collections.Generic;

namespace Entites;

public partial class Request
{
    public int RequestId { get; set; }

    public int? CouncilId { get; set; }

    public string? OrdererName { get; set; }

    public string? OrdererRole { get; set; }

    public string? OrdererPhone { get; set; }

    public string? OrdererEmail { get; set; }

    public DateTime? OrderDate { get; set; }

    public string? OrdererComment { get; set; }

    public string? DeliveryMethod { get; set; }

    public string? Address { get; set; }

    public string? DeliveredTo { get; set; }

    public DateTime? HandlingDate { get; set; }

    public string? OfficeComment { get; set; }

    public int? RequestStatus { get; set; }

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public virtual RefCouncil? Council { get; set; }

    public virtual RefStatus? RequestStatusNavigation { get; set; }
}
