import { IInvoice } from "./IInvoice";
import { IUser } from "./IUser";
import { IVehicle } from "./IVehicle";
export interface IJob {
    jobName: string;
    invoices: IInvoice[];
    customer: IUser;
    vehicle?: IVehicle;
    jobStatus: string;
    issueDetails?: {
        issueDescription: string;
        urgency: string;
        preferredDate: Date;
        additionalNotes?: string;
    };
}
