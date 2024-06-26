import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import AuthCard from "./auth-card";
import { useMutation } from "@tanstack/react-query";
import { loginUserFn } from "@/api/auth-api";
import useStore from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

export type SignInFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  phone: z.string().min(1, { message: "Please enter a phone" }),
  password: z.string().min(1, { message: "Please enter password" }),
});

const SigninCard: FC = () => {
  const { setAccessToken } = useStore();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInFormValues) => loginUserFn(data),
    onSuccess: (data) => {
      toast.success("Logged in succesfully");
      const { accessToken } = data;
      setAccessToken(accessToken);
      navigate("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Login failed", {
          description: error.response.data.message,
        });
      } else {
        toast.error("Oops!", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });

  function onSubmit(data: SignInFormValues) {
    mutate(data);
  }

  return (
    <AuthCard title="Sign in" description="Sign in to your Admin account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-keppel-500 hover:bg-keppel-600 active:bg-keppel-700"
            type="submit"
            disabled={isPending}
          >
            Sign in
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SigninCard;
