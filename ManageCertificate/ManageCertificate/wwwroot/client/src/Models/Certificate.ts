import { RefCertificateType } from "./RefCertificateType";

export interface Certificate {
    certificateId: number;
    requestId?: number;
    certificateType?: number;
    requestAmaunt?: number;
    supplyAmaunt?: number;
    comment?: string;
    certificateTypeNavigation?: RefCertificateType;
    used?:number
}
