import { Types } from "mongoose";

export interface IPayTo {
    _id: Types.ObjectId;
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