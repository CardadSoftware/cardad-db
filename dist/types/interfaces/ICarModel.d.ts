import { Document } from "mongoose";
import { ICarMake } from "./ICarMake";
export interface ICarModel extends Document {
    make: ICarMake;
    model: string;
    year: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    fuelType?: string;
    features?: string[];
    vin: string;
    licensePlate: string;
    color?: string;
    mileage?: number;
}
