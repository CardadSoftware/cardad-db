import { Document } from "mongoose";

export interface ICarMake extends Document {
    name: string;
    country?: string;
    establishedYear?: number;
}
