using System;
using System.Collections.Generic;

namespace Entites;

public partial class RefCertificateType
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Certificate> Certificates { get; set; } = new List<Certificate>();

    public virtual ICollection<RefInventory> RefInventories { get; set; } = new List<RefInventory>();
}
