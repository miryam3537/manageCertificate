using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entites;
using BL;
namespace BL

{
    public class RefStatusBl : IRefStatusBL
    {
       IRefStatusDAL refStatusDAL;

        public RefStatusBl(IRefStatusDAL refStatusDAL)
        {
            this.refStatusDAL = refStatusDAL;
        }

        public Task<IEnumerable<RefStatus>> Get()
        {
            throw new NotImplementedException();
        }
    }
}
