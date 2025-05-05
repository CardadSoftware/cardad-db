import { Document } from "mongoose";

export interface IShop extends Document {
    name: string;
    address: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
    owner: string;
}
