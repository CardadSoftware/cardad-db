import { IShop } from "./IShop";
import { ICharge } from "./ICharge";
import { Types } from "mongoose";

export interface IInvoice {
    _id: Types.ObjectId;
    invoiceName?: string;
    description?: string; 
    referenceNumber?: string;
    totalCharge?: number;
    shop: IShop[]; // Use IShop directly
    charges: ICharge[]; // Use ICharge directly
}