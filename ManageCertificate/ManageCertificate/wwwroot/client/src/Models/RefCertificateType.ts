import { Certificate } from "./Certificate";
import { RefInventory } from "./RefInventory";

export interface RefCertificateType {
    id: number;
    name: string;
    certificates: Certificate[];
    refInventories: RefInventory[];
}

