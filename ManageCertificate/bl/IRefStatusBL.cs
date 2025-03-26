using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    internal interface IRefStatusBL
    {
        Task<IEnumerable<RefStatus>> Get();
    }
}
