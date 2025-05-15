import { Schema } from "mongoose";
import crypto from "crypto";
import passportLocalMongoose from "passport-local-mongoose";
// Schemas
const UserSchema = new Schema({
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
            validator: (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
            message: "Please fill a valid email address",
        },
    },
    createDate: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    online: Boolean,
});
UserSchema.plugin(passportLocalMongoose);
const TechnicianSchema = new Schema({
    ...UserSchema.obj,
    specialties: { type: [{ value: String }], default: [{ value: "None" }] },
    bookable: Boolean,
    rating: { type: Number, enum: [1, 2, 3, 4, 5] },
    certifications: [String],
    company: String,
});
const ClientSchema = new Schema({
    name: String,
    clientId: String,
    clientSecret: {
        salt: String,
        hash: String,
    },
    tenantId: String,
});
ClientSchema.methods.generateClientSecret = function () {
    const clientSecretString = crypto.randomBytes(16).toString("base64").slice(0, 16);
    const self = this; // Explicitly cast 'this' to IClient
    self.clientSecret.salt = crypto.randomBytes(16).toString("hex");
    self.clientSecret.hash = crypto
        .pbkdf2Sync(clientSecretString, self.clientSecret.salt, 1000, 64, "sha512")
        .toString("hex");
};
const AccessTokenSchema = new Schema({
    accessToken: { type: String, required: true },
    refreshToken: String,
    client: { type: ClientSchema, required: true },
    user: { type: UserSchema, required: true },
});
const ShopSchema = new Schema({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
    owner: String,
});
const VehicleSchema = new Schema({
    name: { type: String, required: true },
    model: { type: String },
    make: { type: String },
    year: { type: String },
    vin: { type: String },
    licNumber: { type: String },
    mileage: { type: Number },
    bodyStyle: { type: String },
    engineType: { type: String },
    transmission: { type: String },
    fuelType: { type: String },
    features: { type: [String] }, // Optional array of features
});
const JobSchema = new Schema({
    jobName: String,
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const InvoiceSchema = new Schema({
    invoiceName: String,
    description: String,
    referenceNumber: String,
    totalCharge: Number,
    shop: [{ type: Schema.Types.ObjectId, ref: "Shop" }],
    charges: [{ type: Schema.Types.ObjectId, ref: "Charge" }],
});
const ChargeSchema = new Schema({
    description: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    rateType: { type: String, enum: ["hour", "piece", "job"] },
    rate: { type: Number, required: true, default: 0 },
    discount: Number,
    createDate: { type: Date, default: Date.now },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
ChargeSchema.virtual("totalCharge").get(function () {
    return (this.quantity || 1) * this.rate;
});
const PayToSchema = new Schema({
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
const CarMakeSchema = new Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    establishedYear: { type: Number },
});
const CarModelSchema = new Schema({
    make: { type: Schema.Types.ObjectId, ref: "CarMake", required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String },
    engineType: { type: String },
    transmission: { type: String },
    fuelType: { type: String },
    features: { type: [String] }, // Optional array of features
});
export { UserSchema, TechnicianSchema, ClientSchema, AccessTokenSchema, ShopSchema, VehicleSchema, JobSchema, InvoiceSchema, ChargeSchema, PayToSchema, CarMakeSchema, CarModelSchema };
