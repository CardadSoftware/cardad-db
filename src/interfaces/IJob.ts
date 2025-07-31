import { IInvoice } from "./IInvoice";
import { IUser } from "./IUser";
import { IVehicle } from "./IVehicle";

export interface IJob {
    jobName: string;
    invoices: IInvoice[]; // Use IInvoice directly
    customer: IUser; // Use IUser directly
    vehicle?: IVehicle; // Use IVehicle directly
    jobStatus: string;
    issueDetails?: {
        issueDescription: string;
        urgency: string;
        preferredDate: Date;
        additionalNotes?: string;
    };
}