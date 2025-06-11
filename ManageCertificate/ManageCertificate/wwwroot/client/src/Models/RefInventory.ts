import { RefCertificateType } from "./RefCertificateType";
import { RefCouncil } from "./RefCouncil";

export interface RefInventory {
    inventoryId: number;
    councilId?: number;
    certificateId?: number;
    year?: number;
    inventory?: number;
    certificate?: RefCertificateType;
    council?: RefCouncil;
}

