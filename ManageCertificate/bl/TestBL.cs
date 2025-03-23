using Entites;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class TestBL : ITestBL
    {
        ITestDAl testDAl;
        public TestBL(ITestDAl testDAl)
        {
            this.testDAl = testDAl;
        }
        public Task<IEnumerable<Request>> Exmple()
        {
            return testDAl.Exmple();
        }
    }
}
