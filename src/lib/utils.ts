import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosIns.defaults.headers.common["Content-Type"] = "application/json";
