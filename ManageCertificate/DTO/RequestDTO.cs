using Entites;

namespace DTO
{
    public record RequestDTO(
        int RequestId,
        RefCouncilDTO? Council,
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
        ICollection<CertificateDTO> Certificates,
        RefStatusDTO? RequestStatusNavigation
    );
   
}
