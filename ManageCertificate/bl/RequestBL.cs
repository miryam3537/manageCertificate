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
        //public async Task<RequestDTO> Get(int id)
        //{
        //    Request request = await RequestDAl.Get(id);
        //    List<Certificate> Allcertificates = (await CertificateDAL.Get(request.Council.Id)).ToList();
        //    RequestDTO requestDTO = mapper.Map<RequestDTO>(request);
        //    //requestByIdDto = requestByIdDto with { AllCertificates = certificatesDTO };
        //    CaldulateSupplayAmountForAllCertificate(Allcertificates, requestDTO.Certificates);
        //    return requestDTO;
        //}
       //public void CaldulateSupplayAmountForAllCertificate(List<Certificate> Allcertificates, IEnumerable<CertificateDTO> certificates)
       // {
       //     foreach (CertificateDTO cert in certificates )
       //     {
       //         foreach (Certificate allcert in Allcertificates)
       //         {
       //             if (cert.CertificateTypeNavigation?.Id == allcert.CertificateType)
       //                 cert.Used += allcert.SupplyAmaunt;
       //         }
       //     }

       // }
        public async Task Put(int id, int statusId)
        {
            

            await RequestDAl.Put(id, statusId);

        }
    }
}
