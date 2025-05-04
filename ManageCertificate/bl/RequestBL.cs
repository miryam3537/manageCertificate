using Entites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL.Interfaces;
using BL.Interfaces;
using AutoMapper;

namespace BL
{
    public class RequestBL : IRequestBL
    {
        IMapper mapper;
        IRequestDAl RequestDAl;
        ICertificateDAL CertificateDAL;
        public RequestBL(IRequestDAl RequestDAl, ICertificateDAL CertificateDAL,IMapper mapper)
        {
            this.mapper = mapper;
            this.CertificateDAL = CertificateDAL;
            this.RequestDAl = RequestDAl;
        }
        public Task<IEnumerable<Request>> GetAllRequest()
        {
            return RequestDAl.GetAllRequest();
        }
        public async Task<RequestByIdDTO> Get(int id)
        {
            Request request = await RequestDAl.Get(id);
            List<Certificate> certificate = (await CertificateDAL.Get(request.Council.Id)).ToList();
            RequestByIdDTO requestByIdDto = mapper.Map<RequestByIdDTO>(request);
            List<CertificateDTO> certificatesDTO = mapper.Map<List<CertificateDTO>>(certificate);
            requestByIdDto = requestByIdDto with { AllCertificates = certificatesDTO };
            return requestByIdDto;
        }
        public async Task Put(int id, RequestDTO requestDTO)
        {


        }
    }
}
