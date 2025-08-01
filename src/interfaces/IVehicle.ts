import { Types } from "mongoose";
import { ICarModel } from "./ICarModel";
import { ICarMake } from "./ICarMake";

export interface IVehicle {
    _id: Types.ObjectId;
    name: string;
    model?: ICarModel;
    make?: ICarMake;
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