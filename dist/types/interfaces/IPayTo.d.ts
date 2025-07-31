export interface IPayTo {
    name: string;
    accountNumber: string;
    bankName: string;
    swiftCode?: string;
    address?: {
        streetAddress: string;
        city: string;
        zip: string;
        state: string;
    };
}
