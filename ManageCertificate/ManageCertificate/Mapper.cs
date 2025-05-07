using AutoMapper;

using DTO;

using Entites;
namespace ManageCertificate
{
    public class Mapper : Profile
    
    {
        public Mapper()
        {
            CreateMap<Request, RequestDTO>().ReverseMap();
            CreateMap<RefCouncil, RefCouncilDTO>().ReverseMap();
            CreateMap<RefStatus, RefStatusDTO>().ReverseMap();
            CreateMap<Certificate, CertificateDTO>()
    .ForMember(dest => dest.Used, opt => opt.Ignore()) // מתעלם מהשדה בעת המיפוי
    .ReverseMap(); 

            CreateMap<RefCertificateType, RefCertificateTypeDTO>().ReverseMap();
           CreateMap<RefInventory, RefInventoryDTO>();
        }
    }
}



