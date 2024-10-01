import { z } from "zod";
import { daysOfWeek } from "@/lib/constants";

// Scheamas
export const accountSchema = z
  .object({
    firstName: z.string().min(1, { message: "Enter First Name" }),
    lastName: z.string().min(1, { message: "Enter Last Name" }),
    email: z.string().email({ message: "Enter valid email" }),
    phone: z.string().optional(),
    profilePicture: z.any().optional(),
    departmentId: z.string().min(1, { message: "Choose a Department" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const profileSchema = z.object({
  specialization: z
    .string()
    .min(1, { message: "Enter valid specialization" })
    .optional(),
  qualification: z
    .string()
    .min(1, { message: "Enter valid qualification" })
    .optional(),
  appointmentDuration: z
    .number({
      message: "Enter valid Appointment Duration",
    })
    .min(5, { message: "Minimum 5 mins of duration required" }),
});

export const scheduleSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  daysOfWeek: z
    .enum(daysOfWeek)
    .array()
    .nonempty("At least one day should be selected"),
});

// Default Values

export const scheduleDefValues = {
  startTime: "",
  endTime: "",
  daysOdWeek: [],
};

export const accountDefValues = {
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: undefined,
  phone: "",
  departmentId: "",
  password: "",
  confirmPassword: "",
};

export const profileDefValues = {
  specialization: "",
  qualification: "",
  appointmentDuration: 0,
};
