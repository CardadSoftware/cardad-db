import { Document } from "mongoose";

export interface ICharge extends Document {
    description: string;
    quantity?: number;
    rateType?: "hour" | "piece" | "job";
    rate: number;
    discount?: number;
    createDate?: Date;
    totalCharge?: number;
}
