import { Orders } from "../Orders/orders";

export class Payments {
    id!: number;
    orders_id!: number;
    amountOrder!: string;
    payment_date!: string;
    orders!: Orders; 
}
