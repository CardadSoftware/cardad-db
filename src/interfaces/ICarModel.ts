import { Types } from "mongoose";
import { ICarMake } from "./ICarMake";

export interface ICarModel {
    _id: Types.ObjectId
    make: ICarMake;
    name: string;
    year: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    fuelType?: string;
    features?: string[];
}