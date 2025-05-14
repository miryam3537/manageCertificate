using Entites;

namespace DTO
{
    public record RequestDTO(
        int RequestId,
        int? CouncilId,
        int? RequestStatus, 
        string? OrdererName,
        string? OrdererRole,
        string? OrdererPhone,
        string? OrdererEmail,
        DateTime? OrderDate,
        string? OrdererComment,
        string? DeliveryMethod,
        string? Address,
        string? DeliveredTo,
        DateTime? HandlingDate,
        string? OfficeComment,
        RefCouncilDTO? Council,
        ICollection<CertificateDTO> Certificates,
        RefStatusDTO? RequestStatusNavigation
    );
   
}
