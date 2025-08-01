import { Types } from "mongoose";

export interface ICharge {
    _id: Types.ObjectId;
    description: string;
    quantity?: number;
    rateType?: "hour" | "piece" | "job";
    rate: number;
    discount?: number;
    createDate?: Date;
    totalCharge?: number;
}