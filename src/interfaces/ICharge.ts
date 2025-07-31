export interface ICharge {
    description: string;
    quantity?: number;
    rateType?: "hour" | "piece" | "job";
    rate: number;
    discount?: number;
    createDate?: Date;
    totalCharge?: number;
}
