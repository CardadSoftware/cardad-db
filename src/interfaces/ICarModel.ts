import { ICarMake } from "./ICarMake";

export interface ICarModel {
    make: ICarMake; // Use ICarMake directly
    model: string;
    year: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    fuelType?: string;
    features?: string[];
}
