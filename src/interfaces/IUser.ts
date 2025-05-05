import { Document } from "mongoose";

export interface IUser extends Document {
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
