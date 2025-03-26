import { Certificate } from "./Certificate";
import { RefCouncil } from "./RefCouncil";
import { RefStatus } from "./RefStatus";

export interface Requestes {
    requestId: number;
    councilId?: number;
    ordererName?: string;
    ordererRole?: string;
    ordererPhone?: string;
    ordererEmail?: string;
    orderDate?: Date;
    ordererComment?: string;
    deliveryMethod?: string;
    address?: string;
    deliveredTo?: string;
    handlingDate?: Date;
    officeComment?: string;
    requestStatus?: number;
    certificates: Certificate[];
    council?: RefCouncil;
    requestStatusNavigation?: RefStatus;
}