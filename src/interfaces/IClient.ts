import { Types } from "mongoose";

export interface IClient {
    _id: Types.ObjectId;
    name: string;
    clientId: string;
    clientSecret: {
        salt: string;
        hash: string;
    };
    tenantId: string;
    generateClientSecret: () => void;
}