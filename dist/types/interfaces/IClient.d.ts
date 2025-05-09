import { Document } from "mongoose";
export interface IClient extends Document {
    name: string;
    clientId: string;
    clientSecret: {
        salt: string;
        hash: string;
    };
    tenantId: string;
    generateClientSecret: () => void;
}
