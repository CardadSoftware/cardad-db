import { IInvoice } from "./IInvoice";
import { IUser } from "./IUser";
import { IVehicle } from "./IVehicle";
import { Types } from "mongoose";

export interface IJob {
    _id: Types.ObjectId;
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