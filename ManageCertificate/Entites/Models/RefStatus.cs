using System;
using System.Collections.Generic;

namespace Entites;

public partial class RefStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Request> Requests { get; set; } = new List<Request>();
}
