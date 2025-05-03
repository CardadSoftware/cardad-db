import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";
import passportLocalMongoose from "passport-local-mongoose";

// Interfaces
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
    specialties?: Array<{ value: string }>;
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
    generateClientSecret: () => void; // Method to generate client secret
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
    name: string; // Vehicle name, e.g., "Toyota Corolla"
    model?: string; // Model of the vehicle, e.g., "Corolla"
    make?: string; // Manufacturer, e.g., "Toyota"
    year?: string; // Year of manufacture, e.g., "2020"
    vin?: string; // Vehicle Identification Number
    licNumber?: string; // License plate number
    mileage?: number; // Current mileage
    bodyStyle?: string; // Body style, e.g., "Sedan", "SUV"
    engineType?: string; // Engine type, e.g., "V6", "Electric"
    transmission?: string; // Transmission type, e.g., "Automatic", "Manual"
    fuelType?: string; // Fuel type, e.g., "Gasoline", "Diesel", "Electric"
    features?: string[]; // List of features, e.g., ["Bluetooth", "Sunroof"]
}

export interface IJob extends Document {
    jobName: string;
    invoices: mongoose.Types.ObjectId[];
    customer: mongoose.Types.ObjectId;
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
    name: string; // The name of the car manufacturer, e.g., "Toyota", "Ford"
    country?: string; // Optional country of origin, e.g., "Japan", "USA"
    establishedYear?: number; // Optional year the manufacturer was established
}

export interface ICarModel extends Document {
    make: mongoose.Types.ObjectId | ICarMake; // Reference to the CarMake
    model: string; // The car model name, e.g., "Corolla", "Fusion"
    year: number; // The year of the car model, e.g., 2020
    bodyStyle?: string; // Optional body style, e.g., "Sedan", "SUV"
    engineType?: string; // Optional engine type, e.g., "V6", "Electric"
    transmission?: string; // Optional transmission type, e.g., "Automatic", "Manual"
    fuelType?: string; // Optional fuel type, e.g., "Gasoline", "Diesel", "Electric"
    features?: string[]; // Optional list of features, e.g., ["Bluetooth", "Sunroof"]
}

// Schemas
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    contacts: [
        {
            contactType: String,
            phoneNumber: String,
            phoneExtension: String,
            primary: Boolean,
        },
    ],
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        sparse: true,
        validate: {
            validator: (email: string) =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: "Please fill a valid email address",
        },
    },
    createDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    online: Boolean,
});
userSchema.plugin(passportLocalMongoose);

const technicianSchema = new Schema<ITechnician>({
    ...userSchema.obj,
    specialties: { type: [{ value: String }], default: [{ value: "None" }] },
    bookable: Boolean,
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    certifications: [String],
    company: String,
});

const clientSchema = new Schema<IClient>({
    name: String,
    clientId: String,
    clientSecret: {
        salt: String,
        hash: String,
    },
    tenantId: String,
});
(clientSchema.methods as { generateClientSecret: () => void }).generateClientSecret = function () {
    const clientSecretString = crypto.randomBytes(16).toString("base64").slice(0, 16);
    const self = this as IClient; // Explicitly cast 'this' to IClient
    self.clientSecret.salt = crypto.randomBytes(16).toString("hex");
    self.clientSecret.hash = crypto
        .pbkdf2Sync(clientSecretString, self.clientSecret.salt, 1000, 64, "sha512")
        .toString("hex");
};

const accessTokenSchema = new Schema<IAccessToken>({
    accessToken: { type: String, required: true },
    refreshToken: String,
    client: { type: clientSchema, required: true },
    user: { type: userSchema, required: true },
});

const shopSchema = new Schema<IShop>({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
    owner: String,
});

const vehicleSchema = new Schema<IVehicle>({
    name: { type: String, required: true },
    model: { type: String },
    make: { type: String },
    year: { type: String },
    vin: { type: String },
    licNumber: { type: String },
    mileage: { type: Number },
    bodyStyle: { type: String }, // Optional body style
    engineType: { type: String }, // Optional engine type
    transmission: { type: String }, // Optional transmission type
    fuelType: { type: String }, // Optional fuel type
    features: { type: [String] }, // Optional array of features
});

const jobSchema = new Schema<IJob>({
    jobName: String,
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const invoiceSchema = new Schema<IInvoice>({
    invoiceName: String,
    description: String,
    referenceNumber: String,
    totalCharge: Number,
    shop: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
    charges: [{ type: Schema.Types.ObjectId, ref: "Charge" }],
});

const chargeSchema = new Schema<ICharge>(
    {
        description: { type: String, required: true },
        quantity: { type: Number, default: 1 },
        rateType: { type: String, enum: ["hour", "piece", "job"] },
        rate: { type: Number, required: true, default: 0 },
        discount: Number,
        createDate: { type: Date, default: Date.now },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
chargeSchema.virtual("totalCharge").get(function () {
    return (this.quantity || 1) * this.rate;
});

const payToSchema = new Schema<IPayTo>({
    name: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    swiftCode: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
});

const carMakeSchema = new Schema<ICarMake>({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    establishedYear: { type: Number },
});

const carModelSchema = new Schema<ICarModel>({
    make: { type: Schema.Types.ObjectId, ref: "CarMake", required: true }, // Reference to CarMake
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String }, // Optional body style
    engineType: { type: String }, // Optional engine type
    transmission: { type: String }, // Optional transmission type
    fuelType: { type: String }, // Optional fuel type
    features: { type: [String] }, // Optional array of features
});

// Models
export const UserModel = mongoose.model<IUser>("User", userSchema);
export const TechnicianModel = mongoose.model<ITechnician>("Technician", technicianSchema);
export const ClientModel = mongoose.model<IClient>("Client", clientSchema);
export const AccessTokenModel = mongoose.model<IAccessToken>("AccessToken", accessTokenSchema);
export const ShopModel = mongoose.model<IShop>("Shop", shopSchema);
export const VehicleModel = mongoose.model<IVehicle>("Vehicle", vehicleSchema);
export const JobModel = mongoose.model<IJob>("Job", jobSchema);
export const InvoiceModel = mongoose.model<IInvoice>("Invoice", invoiceSchema);
export const ChargeModel = mongoose.model<ICharge>("Charge", chargeSchema);
export const PayToModel = mongoose.model<IPayTo>("PayTo", payToSchema);
export const CarMakeModel = mongoose.model<ICarMake>("CarMake", carMakeSchema);
export const CarModelModel = mongoose.model<ICarModel>("CarModel", carModelSchema);