import { IShop } from "./IShop";
import { ICharge } from "./ICharge";
export interface IInvoice {
    invoiceName?: string;
    description?: string;
    referenceNumber?: string;
    totalCharge?: number;
    shop: IShop[];
    charges: ICharge[];
}
