export interface AuthData {
  email: string;
  password: string;
}

export interface UserResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    username: string;
    // Cualquier otro campo de usuario
  };
}
