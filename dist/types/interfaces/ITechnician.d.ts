import { IUser } from "./IUser";
export interface ITechnician extends IUser {
    specialties?: Array<{
        value: string;
    }>;
    bookable?: boolean;
    rating?: number;
    certifications?: string[];
    company?: string;
}
