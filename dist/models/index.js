"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarModelModel = exports.CarMakeModel = exports.PayToModel = exports.ChargeModel = exports.InvoiceModel = exports.JobModel = exports.VehicleModel = exports.ShopModel = exports.AccessTokenModel = exports.ClientModel = exports.TechnicianModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemas_1 = require("../schemas");
// Models
exports.UserModel = mongoose_1.default.model("User", schemas_1.UserSchema);
exports.TechnicianModel = mongoose_1.default.model("Technician", schemas_1.TechnicianSchema);
exports.ClientModel = mongoose_1.default.model("Client", schemas_1.ClientSchema);
exports.AccessTokenModel = mongoose_1.default.model("AccessToken", schemas_1.AccessTokenSchema);
exports.ShopModel = mongoose_1.default.model("Shop", schemas_1.ShopSchema);
exports.VehicleModel = mongoose_1.default.model("Vehicle", schemas_1.VehicleSchema);
exports.JobModel = mongoose_1.default.model("Job", schemas_1.JobSchema);
exports.InvoiceModel = mongoose_1.default.model("Invoice", schemas_1.InvoiceSchema);
exports.ChargeModel = mongoose_1.default.model("Charge", schemas_1.ChargeSchema);
exports.PayToModel = mongoose_1.default.model("PayTo", schemas_1.PayToSchema);
exports.CarMakeModel = mongoose_1.default.model("CarMake", schemas_1.CarMakeSchema);
exports.CarModelModel = mongoose_1.default.model("CarModel", schemas_1.CarModelSchema);
