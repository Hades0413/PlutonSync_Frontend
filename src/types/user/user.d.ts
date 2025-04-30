// src/types/auth/user.d.ts
export interface User {
  id: string;
  username: string;
  nombreCompleto: string;
  email: string;
  password: string;
}
export interface RegisterFormData {
  username: string;
  nombreCompleto: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    nombreCompleto: string;
  };
}
