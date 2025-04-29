using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL.Interfaces;
using BL.Interfaces;

namespace BL
{
    public class RequestBL : IRequestBL
    {
        IRequestDAl RequestDAl;
        public RequestBL(IRequestDAl RequestDAl)
        {
            this.RequestDAl = RequestDAl;
        }
        public Task<IEnumerable<Request>> GetAllRequest()
        {
            return RequestDAl.GetAllRequest();
        }
        public async Task<Request> GetById(int id)
        {
            Request request = await RequestDAl.GetById( id);
            return request;
        }
    }
}
