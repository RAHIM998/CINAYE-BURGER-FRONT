import { Binary } from "@angular/compiler";


 // Représente la structure de la réponse de l'API
 export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

//Représente la structure de la pgination 
export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface Burgers {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
}

// model/user-response.model.ts
export interface BurgerResponse {
    id: number;
    name: string;
    price: string;
    image: Binary;
    description: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
  }

 
