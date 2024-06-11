import { FC } from "react";
import { useForm } from "react-hook-form";
import AuthCard from "./auth-card";
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

type SignInFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter a username" }),
  password: z.string().min(1, { message: "Please enter password" }),
});

const SigninCard: FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: SignInFormValues) {
    console.log(data);
  }

  return (
    <AuthCard title="Sign in" description="Sign in to your Admin account">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-keppel-500 hover:bg-keppel-600 active:bg-keppel-700"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};

export default SigninCard;
