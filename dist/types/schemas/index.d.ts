/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="passport-local-mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema } from "mongoose";
import { IAccessToken, ICarMake, ICarModel, ICharge, IClient, IInvoice, IJob, IPayTo, IShop, ITechnician, IUser, IVehicle } from "../interfaces";
declare const UserSchema: Schema<IUser, import("mongoose").Model<IUser, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IUser>;
declare const TechnicianSchema: Schema<ITechnician, import("mongoose").Model<ITechnician, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ITechnician>;
declare const ClientSchema: Schema<IClient, import("mongoose").Model<IClient, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IClient>;
declare const AccessTokenSchema: Schema<IAccessToken, import("mongoose").Model<IAccessToken, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IAccessToken>;
declare const ShopSchema: Schema<IShop, import("mongoose").Model<IShop, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IShop>;
declare const VehicleSchema: Schema<IVehicle, import("mongoose").Model<IVehicle, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IVehicle>;
declare const JobSchema: Schema<IJob, import("mongoose").Model<IJob, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IJob>;
declare const InvoiceSchema: Schema<IInvoice, import("mongoose").Model<IInvoice, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IInvoice>;
declare const ChargeSchema: Schema<ICharge, import("mongoose").Model<ICharge, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICharge>;
declare const PayToSchema: Schema<IPayTo, import("mongoose").Model<IPayTo, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPayTo>;
declare const CarMakeSchema: Schema<ICarMake, import("mongoose").Model<ICarMake, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICarMake>;
declare const CarModelSchema: Schema<ICarModel, import("mongoose").Model<ICarModel, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ICarModel>;
export { UserSchema, TechnicianSchema, ClientSchema, AccessTokenSchema, ShopSchema, VehicleSchema, JobSchema, InvoiceSchema, ChargeSchema, PayToSchema, CarMakeSchema, CarModelSchema };
