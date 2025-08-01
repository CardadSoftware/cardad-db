import { IClient } from "./IClient";
import { IUser } from "./IUser";
import { Types } from "mongoose";

export interface IAccessToken {
    _id: Types.ObjectId;
    accessToken: string;
    refreshToken?: string;
    client: IClient;
    user: IUser;
}