export interface IClient {
    name: string;
    clientId: string;
    clientSecret: {
        salt: string;
        hash: string;
    };
    tenantId: string;
    generateClientSecret: () => void;
}