import { IUser} from "./IUser";
import { Types } from "mongoose";

export interface ITechnician extends IUser {
    _id: Types.ObjectId;
    specialties?: Array<{ value: string }>;
    bookable?: boolean;
    rating?: number;
    certifications?: string[];
    company?: string;
}