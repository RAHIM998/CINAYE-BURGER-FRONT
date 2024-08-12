import { Users } from "./users";


 // Représente la structure de la réponse de l'API
 export interface ApiResponse {
    success: boolean;
    message: string;
    data: Users;
  }

// model/user-response.model.ts
export interface UserResponse {
    id: number;
    name: string;
    telephone: string;
    email: string;
    role: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
  }

 