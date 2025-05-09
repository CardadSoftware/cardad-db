import { Document } from "mongoose";
import { IInvoice } from "./IInvoice";
import { IUser } from "./IUser";
import { IVehicle } from "./IVehicle";
export interface IJob extends Document {
    jobName: string;
    invoices: IInvoice[];
    customer: IUser;
    vehicle?: IVehicle;
    issueDetails?: {
        issueDescription: string;
        urgency: string;
        preferredDate: Date;
        additionalNotes?: string;
    };
}
