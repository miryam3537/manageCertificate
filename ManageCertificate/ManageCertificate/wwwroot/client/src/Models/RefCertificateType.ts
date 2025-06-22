import { Certificate } from "./Certificate";
import { RefInventory } from "./RefInventory";

export interface RefCertificateType {
    id: number;
    name?: string;
    minimum?: number;
    certificates?: Certificate[];
    refInventories?: RefInventory[];
}

