import { Document } from "mongoose";
import { IClient } from "./IClient";
import { IUser } from "./IUser";
export interface IAccessToken extends Document {
    accessToken: string;
    refreshToken?: string;
    client: IClient;
    user: IUser;
}
