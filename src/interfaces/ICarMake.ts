import { Types } from "mongoose";

export interface ICarMake {
    _id: Types.ObjectId;
    name: string;
    country?: string;
    establishedYear?: number;
}