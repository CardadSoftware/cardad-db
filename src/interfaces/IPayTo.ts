import { Document } from "mongoose";

export interface IPayTo extends Document {
    name: string;
    accountNumber: string;
    bankName: string;
    swiftCode?: string;
    address?: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
}
