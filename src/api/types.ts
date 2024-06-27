export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: "ADMIN" | "USER";
}

export interface LoginResponse {
  success: string;
  message: string;
  accessToken: string;
  user: User;
}
