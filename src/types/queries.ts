export interface Profile {
  name: string;
  email: string;
  phone: string;
  image?: string | null;
  role: "ADMIN" | "USER";
}

export type Department = {
  id: string;
  name: string;
  description?: string;
  image?: string;
  active: boolean;
  createdAt: string;
};

export type GetDepartmentsResponse = {
  success: boolean;
  departments: Department[];
  count: number;
};
