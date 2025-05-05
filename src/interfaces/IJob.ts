import { Document } from "mongoose";
import { IInvoice } from "./IInvoice";
import { IUser } from "./IUser";
import { IVehicle } from "./IVehicle";

export interface IJob extends Document {
    jobName: string;
    invoices: IInvoice[]; // Use IInvoice directly
    customer: IUser; // Use IUser directly
    vehicle?: IVehicle; // Use IVehicle directly
    issueDetails?: {
        issueDescription: string;
        urgency: string;
        preferredDate: Date;
        additionalNotes?: string;
    };
}
