export interface Profile {
  name: string;
  email: string;
  phone: string;
  image?: string | null;
  role: "ADMIN" | "USER";
}
