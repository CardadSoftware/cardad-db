export interface IShop {
    name: string;
    address: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
    owner: string;
}