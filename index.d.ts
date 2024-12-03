import mongoose, { Types, ConnectOptions } from 'mongoose';

export declare function connectDB(uri: string, options?: ConnectOptions): Promise<void>; // Declares the connectDB function

export declare class JobModel{
    _id: Types.ObjectId;
    jobName: String;
    invoices?: [any];
    customer: UserModel
}

export declare class ApiSetting{
    baseUrl: String;
}

export declare class AppSettingsSchema{
    _id: Types.ObjectId;
    name: String;
    apiSettings?: ApiSetting;
}

export declare class UserModel{
    _id: Types.ObjectId;
    username: String;
    firstName: String;
    lastName: String;
    contacts?: [{
        contactType: String,
        phoneNumber: String,
        phoneExtension: String,
        primary: Boolean
    }];
    email: String;
    createDate: Date;
    active: Boolean;
    online: Boolean;
    salt: String;
    hash: String;
}