"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelSchema = exports.CarMakeSchema = exports.PayToSchema = exports.ChargeSchema = exports.InvoiceSchema = exports.JobSchema = exports.VehicleSchema = exports.ShopSchema = exports.AccessTokenSchema = exports.ClientSchema = exports.TechnicianSchema = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const crypto_1 = __importDefault(require("crypto"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// Schemas
const UserSchema = new mongoose_1.Schema({
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
exports.UserSchema = UserSchema;
UserSchema.plugin(passport_local_mongoose_1.default);
const TechnicianSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, UserSchema.obj), { specialties: { type: [{ value: String }], default: [{ value: "None" }] }, bookable: Boolean, rating: { type: Number, enum: [1, 2, 3, 4, 5] }, certifications: [String], company: String }));
exports.TechnicianSchema = TechnicianSchema;
const ClientSchema = new mongoose_1.Schema({
    name: String,
    clientId: String,
    clientSecret: {
        salt: String,
        hash: String,
    },
    tenantId: String,
});
exports.ClientSchema = ClientSchema;
ClientSchema.methods.generateClientSecret = function () {
    const clientSecretString = crypto_1.default.randomBytes(16).toString("base64").slice(0, 16);
    const self = this; // Explicitly cast 'this' to IClient
    self.clientSecret.salt = crypto_1.default.randomBytes(16).toString("hex");
    self.clientSecret.hash = crypto_1.default
        .pbkdf2Sync(clientSecretString, self.clientSecret.salt, 1000, 64, "sha512")
        .toString("hex");
};
const AccessTokenSchema = new mongoose_1.Schema({
    accessToken: { type: String, required: true },
    refreshToken: String,
    client: { type: ClientSchema, required: true },
    user: { type: UserSchema, required: true },
});
exports.AccessTokenSchema = AccessTokenSchema;
const ShopSchema = new mongoose_1.Schema({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
    owner: String,
});
exports.ShopSchema = ShopSchema;
const VehicleSchema = new mongoose_1.Schema({
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
exports.VehicleSchema = VehicleSchema;
const JobSchema = new mongoose_1.Schema({
    jobName: String,
    invoices: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Invoice" }],
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
exports.JobSchema = JobSchema;
const InvoiceSchema = new mongoose_1.Schema({
    invoiceName: String,
    description: String,
    referenceNumber: String,
    totalCharge: Number,
    shop: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Shop" }],
    charges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Charge" }],
});
exports.InvoiceSchema = InvoiceSchema;
const ChargeSchema = new mongoose_1.Schema({
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
exports.ChargeSchema = ChargeSchema;
ChargeSchema.virtual("totalCharge").get(function () {
    return (this.quantity || 1) * this.rate;
});
const PayToSchema = new mongoose_1.Schema({
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
exports.PayToSchema = PayToSchema;
const CarMakeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    establishedYear: { type: Number },
});
exports.CarMakeSchema = CarMakeSchema;
const CarModelSchema = new mongoose_1.Schema({
    make: { type: mongoose_1.Schema.Types.ObjectId, ref: "CarMake", required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String },
    engineType: { type: String },
    transmission: { type: String },
    fuelType: { type: String },
    features: { type: [String] }, // Optional array of features
});
exports.CarModelSchema = CarModelSchema;
