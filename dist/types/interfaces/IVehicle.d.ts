import { Document } from "mongoose";
export interface IVehicle extends Document {
    name: string;
    model?: string;
    make?: string;
    year?: string;
    vin?: string;
    licNumber?: string;
    mileage?: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    fuelType?: string;
    features?: string[];
    price?: number;
}
