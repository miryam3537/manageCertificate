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
using Microsoft.Extensions.Logging;

namespace BL
{
    public class RequestBL : IRequestBL
    {
        IMapper mapper;
        IRequestDAl RequestDAl;
        ICertificateDAL CertificateDAL;
        ILogger<RequestBL> logger;
        public RequestBL(IRequestDAl RequestDAl, ICertificateDAL CertificateDAL, IMapper mapper, ILogger<RequestBL> logger)
        {
            this.mapper = mapper;
            this.CertificateDAL = CertificateDAL;
            this.RequestDAl = RequestDAl;
            this.logger = logger;
        }
        public Task<IEnumerable<Request>> GetAllRequest()
        {
            return RequestDAl.GetAllRequest();
        }
        public async Task<RequestDTO> Get(int id)
        {
            Request request = await RequestDAl.Get(id);
            List<Certificate> Allcertificates = (await CertificateDAL.Get(request.Council.Id)).ToList();
            RequestDTO requestDTO = mapper.Map<RequestDTO>(request);
            //requestByIdDto = requestByIdDto with { AllCertificates = certificatesDTO };
            CaldulateSupplayAmountForAllCertificate(Allcertificates, requestDTO.Certificates);
            return requestDTO;
        }
        public void CaldulateSupplayAmountForAllCertificate(List<Certificate> Allcertificates, IEnumerable<CertificateDTO> certificates)
        {
            foreach (CertificateDTO cert in certificates)
            {
                foreach (Certificate allcert in Allcertificates)
                {
                    if (cert.CertificateTypeNavigation?.Id == allcert.CertificateType)
                        cert.Used += allcert.SupplyAmaunt;
                }
            }

        }
        public async Task<RequestDTO> PutRequest(int id, int? previousStatusId, RequestDTO PutRequest)
        {
            Request request = await RequestDAl.Get(id);
            if (request == null)
                throw new Exception("Request not found");
            if(previousStatusId==null|| request.RequestStatus == previousStatusId)
            {

                Request upDateRequest = mapper.Map<DTO.RequestDTO, Request>(PutRequest);
                if (previousStatusId != null)
                {
                    upDateRequest.HandlingDate = DateTime.Now;
                }
             Request  returnUpDateRequest  = await RequestDAl.PutRequest(id, upDateRequest);
                RequestDTO requestDTO = mapper.Map<Request, RequestDTO> (returnUpDateRequest);
                return requestDTO; // עדכון הצליח
            }
            else
            {
                logger.LogCritical("Request status mismatch. Expected: {expectedStatus}, Actual: {actualStatus}", previousStatusId, request.RequestStatus);
                // החזרת false במקום לזרוק שגיאה
                return null;
            }
        }

     
    }
}

