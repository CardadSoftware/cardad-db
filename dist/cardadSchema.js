"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelModel = exports.CarMakeModel = exports.PayToModel = exports.ChargeModel = exports.InvoiceModel = exports.JobModel = exports.VehicleModel = exports.ShopModel = exports.AccessTokenModel = exports.ClientModel = exports.TechnicianModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// Schemas
const userSchema = new mongoose_1.Schema({
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
userSchema.plugin(passport_local_mongoose_1.default);
const technicianSchema = new mongoose_1.Schema(Object.assign(Object.assign({}, userSchema.obj), { specialties: { type: [{ value: String }], default: [{ value: "None" }] }, bookable: Boolean, rating: { type: Number, enum: [1, 2, 3, 4, 5] }, certifications: [String], company: String }));
const clientSchema = new mongoose_1.Schema({
    name: String,
    clientId: String,
    clientSecret: {
        salt: String,
        hash: String,
    },
    tenantId: String,
});
clientSchema.methods.generateClientSecret = function () {
    const clientSecretString = crypto_1.default.randomBytes(16).toString("base64").slice(0, 16);
    const self = this; // Explicitly cast 'this' to IClient
    self.clientSecret.salt = crypto_1.default.randomBytes(16).toString("hex");
    self.clientSecret.hash = crypto_1.default
        .pbkdf2Sync(clientSecretString, self.clientSecret.salt, 1000, 64, "sha512")
        .toString("hex");
};
const accessTokenSchema = new mongoose_1.Schema({
    accessToken: { type: String, required: true },
    refreshToken: String,
    client: { type: clientSchema, required: true },
    user: { type: userSchema, required: true },
});
const shopSchema = new mongoose_1.Schema({
    name: String,
    address: {
        streetAddress: String,
        city: String,
        zip: String,
        state: String,
    },
    owner: String,
});
const vehicleSchema = new mongoose_1.Schema({
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
const jobSchema = new mongoose_1.Schema({
    jobName: String,
    invoices: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Invoice" }],
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
const invoiceSchema = new mongoose_1.Schema({
    invoiceName: String,
    description: String,
    referenceNumber: String,
    totalCharge: Number,
    shop: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Shop" }],
    charges: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Charge" }],
});
const chargeSchema = new mongoose_1.Schema({
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
chargeSchema.virtual("totalCharge").get(function () {
    return (this.quantity || 1) * this.rate;
});
const payToSchema = new mongoose_1.Schema({
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
const carMakeSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String },
    establishedYear: { type: Number },
});
const carModelSchema = new mongoose_1.Schema({
    make: { type: mongoose_1.Schema.Types.ObjectId, ref: "CarMake", required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    bodyStyle: { type: String },
    engineType: { type: String },
    transmission: { type: String },
    fuelType: { type: String },
    features: { type: [String] }, // Optional array of features
});
// Models
exports.UserModel = mongoose_1.default.model("User", userSchema);
exports.TechnicianModel = mongoose_1.default.model("Technician", technicianSchema);
exports.ClientModel = mongoose_1.default.model("Client", clientSchema);
exports.AccessTokenModel = mongoose_1.default.model("AccessToken", accessTokenSchema);
exports.ShopModel = mongoose_1.default.model("Shop", shopSchema);
exports.VehicleModel = mongoose_1.default.model("Vehicle", vehicleSchema);
exports.JobModel = mongoose_1.default.model("Job", jobSchema);
exports.InvoiceModel = mongoose_1.default.model("Invoice", invoiceSchema);
exports.ChargeModel = mongoose_1.default.model("Charge", chargeSchema);
exports.PayToModel = mongoose_1.default.model("PayTo", payToSchema);
exports.CarMakeModel = mongoose_1.default.model("CarMake", carMakeSchema);
exports.CarModelModel = mongoose_1.default.model("CarModel", carModelSchema);
