export declare class JobModel{
    jobName: String;
    invoices?: [any];
    customer: UserModel
}

export declare class UserModel{
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