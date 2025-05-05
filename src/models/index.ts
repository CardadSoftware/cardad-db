import mongoose from "mongoose";
import { AccessTokenSchema, CarMakeSchema, CarModelSchema, ChargeSchema, ClientSchema, InvoiceSchema, JobSchema, PayToSchema, ShopSchema, TechnicianSchema, UserSchema, VehicleSchema } from "../schemas";
// Models
export const UserModel = mongoose.model("User", UserSchema);
export const TechnicianModel = mongoose.model("Technician", TechnicianSchema);
export const ClientModel = mongoose.model("Client", ClientSchema);
export const AccessTokenModel = mongoose.model("AccessToken", AccessTokenSchema);
export const ShopModel = mongoose.model("Shop", ShopSchema);
export const VehicleModel = mongoose.model("Vehicle", VehicleSchema);
export const JobModel = mongoose.model("Job", JobSchema);
export const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);
export const ChargeModel = mongoose.model("Charge", ChargeSchema);
export const PayToModel = mongoose.model("PayTo", PayToSchema);
export const CarMakeModel = mongoose.model("CarMake", CarMakeSchema);
export const CarModelModel = mongoose.model("CarModel", CarModelSchema);