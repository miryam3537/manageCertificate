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
        IRequestDAl RequestDAl;
        public RequestBL(IRequestDAl RequestDAl)
        {
            this.RequestDAl = RequestDAl;
        }
        public Task<IEnumerable<Request>> Exmple()
        {
            return RequestDAl.Exmple();
        }
        public async Task<Request> Get(int id)
        {
            Request request = await RequestDAl.Get( id);
            return request;
        }
    }
}
