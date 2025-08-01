import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
    username: string;
    firstName?: string;
    lastName?: string;
    contacts?: Array<{
        contactType: string;
        phoneNumber: string;
        phoneExtension?: string;
        primary?: boolean;
    }>;
    email?: string;
    createDate?: Date;
    active?: boolean;
    online?: boolean;
}