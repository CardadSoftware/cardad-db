import { Model, Schema } from "mongoose";
import {
    IUser,
    ITechnician,
    IClient,
    IAccessToken,
    IShop,
    IVehicle,
    IJob,
    IInvoice,
    ICharge,
    IPayTo,
    ICarMake,
    ICarModel,
} from "./cardadSchema"; // Import interfaces from cardadSchema

// Re-export interfaces
export { IUser, ITechnician, IClient, IAccessToken, IShop, IVehicle, IJob, IInvoice, ICharge, IPayTo, ICarMake, ICarModel };

// Models
export declare const InvoiceModel: Model<IInvoice>;
export declare const PayToModel: Model<IPayTo>;
export declare const VehicleModel: Model<IVehicle>;
export declare const UserModel: Model<IUser>;
export declare const TechnicianModel: Model<ITechnician>;
export declare const JobModel: Model<IJob>;
export declare const ShopModel: Model<IShop>;
export declare const ChargeModel: Model<ICharge>;
export declare const CarMakeModel: Model<ICarMake>;
export declare const CarModelModel: Model<ICarModel>;
export declare const ClientModel: Model<IClient>;
export declare const AccessTokenModel: Model<IAccessToken>;
