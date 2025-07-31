import { IClient } from "./IClient";
import { IUser } from "./IUser";
export interface IAccessToken {
    accessToken: string;
    refreshToken?: string;
    client: IClient;
    user: IUser;
}
