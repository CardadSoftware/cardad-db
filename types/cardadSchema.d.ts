import mongoose, { Document } from "mongoose";
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
export interface ITechnician extends IUser {
    specialties?: Array<{
        value: string;
    }>;
    bookable?: boolean;
    rating?: number;
    certifications?: string[];
    company?: string;
}
export interface IClient extends Document {
    name: string;
    clientId: string;
    clientSecret: {
        salt: string;
        hash: string;
    };
    tenantId: string;
    generateClientSecret: () => void;
}
export interface IAccessToken extends Document {
    accessToken: string;
    refreshToken?: string;
    client: IClient;
    user: IUser;
}
export interface IShop extends Document {
    name: string;
    address: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
    owner: string;
}
export interface IVehicle extends Document {
    name: string;
    model?: string;
    make?: string;
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
export interface IJob extends Document {
    jobName: string;
    invoices: IInvoice[];
    customer: IUser;
    vehicle?: IVehicle;
    issueDetails?: {
        issueDescription: string;
        urgency: string;
        preferredDate: Date;
        additionalNotes?: string;
    };
}
export interface IInvoice extends Document {
    invoiceName?: string;
    description?: string;
    referenceNumber?: string;
    totalCharge?: number;
    shop: mongoose.Types.ObjectId[];
    charges: mongoose.Types.ObjectId[];
}
export interface ICharge extends Document {
    description: string;
    quantity?: number;
    rateType?: "hour" | "piece" | "job";
    rate: number;
    discount?: number;
    createDate?: Date;
    totalCharge?: number;
}
export interface IPayTo extends Document {
    name: string;
    accountNumber: string;
    bankName: string;
    swiftCode?: string;
    address?: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
}
export interface ICarMake extends Document {
    name: string;
    country?: string;
    establishedYear?: number;
}
export interface ICarModel extends Document {
    make: mongoose.Types.ObjectId | ICarMake;
    model: string;
    year: number;
    bodyStyle?: string;
    engineType?: string;
    transmission?: string;
    fuelType?: string;
    features?: string[];
}
export declare const UserModel: mongoose.PassportLocalModel<IUser>;
export declare const TechnicianModel: mongoose.PassportLocalModel<ITechnician>;
export declare const ClientModel: mongoose.PassportLocalModel<IClient>;
export declare const AccessTokenModel: mongoose.PassportLocalModel<IAccessToken>;
export declare const ShopModel: mongoose.PassportLocalModel<IShop>;
export declare const VehicleModel: mongoose.PassportLocalModel<IVehicle>;
export declare const JobModel: mongoose.PassportLocalModel<IJob>;
export declare const InvoiceModel: mongoose.PassportLocalModel<IInvoice>;
export declare const ChargeModel: mongoose.PassportLocalModel<ICharge>;
export declare const PayToModel: mongoose.PassportLocalModel<IPayTo>;
export declare const CarMakeModel: mongoose.PassportLocalModel<ICarMake>;
export declare const CarModelModel: mongoose.PassportLocalModel<ICarModel>;
