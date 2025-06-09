using System;
using System.Collections.Generic;

namespace ManageCertificate.Models;

public partial class RefCouncil
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<RefInventory> RefInventories { get; set; } = new List<RefInventory>();

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
