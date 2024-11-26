import { Types } from 'mongoose';
export declare class JobModel{
    _id: Types.ObjectId;
    jobName: String;
    invoices?: [any];
    customer: UserModel
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