using AutoMapper;

using DTO;

using Entites;
namespace ManageCertificate
{
    public class Mapper : Profile
    
    {
        public Mapper()
        {
            CreateMap<Request, RequestDTO>();
            CreateMap<RefCouncil, RefCouncilDTO>();
            CreateMap<RefStatus, RefStatusDTO>();
            CreateMap<Certificate, CertificateDTO>();
            CreateMap<RefCertificateType, RefCertificateTypeDTO>();
        }
    }
}



