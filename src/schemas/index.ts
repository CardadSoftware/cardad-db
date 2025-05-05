import mongoose, { Document, Schema } from "mongoose";
import crypto from "crypto";
import passportLocalMongoose from "passport-local-mongoose";
import {IAccessToken, ICarMake, ICarModel, ICharge, IClient, IInvoice, IJob, IPayTo, IShop, ITechnician, IUser, IVehicle} from "../interfaces";

// Schemas
const UserSchema = new Schema<IUser>({
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
UserSchema.plugin(passportLocalMongoose);

const TechnicianSchema = new Schema<ITechnician>({
    ...UserSchema.obj,
    specialties: { type: [{ value: String }], default: [{ value: "None" }] },
    bookable: Boolean,
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    certifications: [String],
    company: String,
});

const ClientSchema = new Schema<IClient>({
    name: String,
    clientId: String,
    clientSecret: {
        salt: String,
        hash: String,
    },
    tenantId: String,
});
(ClientSchema.methods as { generateClientSecret: () => void }).generateClientSecret = function () {
    const clientSecretString = crypto.randomBytes(16).toString("base64").slice(0, 16);
    const self = this as IClient; // Explicitly cast 'this' to IClient
    self.clientSecret.salt = crypto.randomBytes(16).toString("hex");
    self.clientSecret.hash = crypto
        .pbkdf2Sync(clientSecretString, self.clientSecret.salt, 1000, 64, "sha512")
        .toString("hex");
};

const AccessTokenSchema = new Schema<IAccessToken>({
    accessToken: { type: String, required: true },
    refreshToken: String,
    client: { type: ClientSchema, required: true },
    user: { type: UserSchema, required: true },
});

const ShopSchema = new Schema<IShop>({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
    owner: String,
});

const VehicleSchema = new Schema<IVehicle>({
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

const JobSchema = new Schema<IJob>({
    jobName: String,
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const InvoiceSchema = new Schema<IInvoice>({
    invoiceName: String,
    description: String,
    referenceNumber: String,
    totalCharge: Number,
    shop: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
    charges: [{ type: Schema.Types.ObjectId, ref: "Charge" }],
});

const ChargeSchema = new Schema<ICharge>(
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
ChargeSchema.virtual("totalCharge").get(function () {
    return (this.quantity || 1) * this.rate;
});

const PayToSchema = new Schema<IPayTo>({
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

const CarMakeSchema = new Schema<ICarMake>({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    establishedYear: { type: Number },
});

const CarModelSchema = new Schema<ICarModel>({
    make: { type: Schema.Types.ObjectId, ref: "CarMake", required: true }, // Reference to CarMake
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String }, // Optional body style
    engineType: { type: String }, // Optional engine type
    transmission: { type: String }, // Optional transmission type
    fuelType: { type: String }, // Optional fuel type
    features: { type: [String] }, // Optional array of features
});

export { 
    UserSchema, 
    TechnicianSchema, 
    ClientSchema, 
    AccessTokenSchema, 
    ShopSchema, 
    VehicleSchema, 
    JobSchema, 
    InvoiceSchema, 
    ChargeSchema, 
    PayToSchema, 
    CarMakeSchema, 
    CarModelSchema 
};