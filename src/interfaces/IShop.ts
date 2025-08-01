import { Types } from "mongoose";

export interface IShop {
    _id: Types.ObjectId;
    name: string;
    address: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
    owner: string;
}