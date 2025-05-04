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
    public record RequestByIdDTO
    {
        public int RequestId { get; init; }
        public RefCouncilDTO? Council { get; init; }
        public string? OrdererName { get; init; }
        public string? OrdererRole { get; init; }
        public string? OrdererPhone { get; init; }
        public string? OrdererEmail { get; init; }
        public DateTime? OrderDate { get; init; }
        public string? OrdererComment { get; init; }
        public string? DeliveryMethod { get; init; }
        public string? Address { get; init; }
        public string? DeliveredTo { get; init; }
        public DateTime? HandlingDate { get; init; }
        public string? OfficeComment { get; init; }
        public ICollection<CertificateDTO> Certificates { get; init; } = new List<CertificateDTO>();
        public ICollection<CertificateDTO> AllCertificates { get; init; } = new List<CertificateDTO>();
        public RefStatusDTO? RequestStatusNavigation { get; init; }

        // בנאי ברירת מחדל
        public RequestByIdDTO() { }
    }
}
