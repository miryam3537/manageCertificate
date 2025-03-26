using Entites;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RequestBL : IRequestBL
    {
        IRequestDAl testDAl;
        public RequestBL(IRequestDAl testDAl)
        {
            this.testDAl = testDAl;
        }
        public Task<IEnumerable<Request>> Exmple()
        {
            return testDAl.Exmple();
        }
    }
}
