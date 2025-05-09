import { Document } from "mongoose";
import { IShop } from "./IShop";
import { ICharge } from "./ICharge";
export interface IInvoice extends Document {
    invoiceName?: string;
    description?: string;
    referenceNumber?: string;
    totalCharge?: number;
    shop: IShop[];
    charges: ICharge[];
}
