import { Users } from '../Users/users';
import { Burgers } from '../Burgers/burgers';

export enum OrderStatus {
    Pending = 'pending',
    Paid = 'paid',
    Cancelled = 'cancelled'
  }
  
  export class Orders {
    id!: number;
    user_id!: number;
    numberOrder!: string;
    dateOrder!: Date;
    amountOrder!: string;
    addressLivraison?: string;
    status!: OrderStatus; 
    user!: Users; 
    burgers: Burgers[] = []; 
    month?: number;
    total_sales?: number; 
  }


  export interface OrdersData {
    total: number;
    totalAmount?: number; 
    orders: Orders[];
  }

  export interface ApiResponse {
    success: boolean;
    message: string;
    data: OrdersData;
  }
  