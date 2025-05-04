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
            CreateMap<Request, RequestByIdDTO>()
    .ForMember(dest => dest.AllCertificates, opt => opt.Ignore());
            CreateMap<RefCertificateType, RefCertificateTypeDTO>();
           CreateMap<RefInventory, RefInventoryDTO>();
        }
    }
}



