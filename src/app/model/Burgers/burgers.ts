import { Binary } from "@angular/compiler";

export class Burgers {
    id ? : number;
    name ! : string;
    price ! : string;
    image ! : Binary;
    description ! : Text;
    pivot!: Pivot; 
}


export interface Pivot {
    order_id: number;
    burger_id: number;
    quantity: number;
    unitPrice: string;
  }