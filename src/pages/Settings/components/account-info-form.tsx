import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Profile } from "@/types/queries";
import { useUpdateProfile } from "@/services/mutations/me";

export type AccountInfoValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Name can not be empty" }),
  phone: z.string().min(1, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  role: z.enum(["USER", "ADMIN"]),
});

type Props = {
  data: Profile;
};

const AccountInfoForm = ({ data }: Props) => {
  const { mutate, isPending } = useUpdateProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    },
  });
  function onSubmit(data: AccountInfoValues) {
    mutate(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input {...field} type="text" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end py-5">
            <Button
              className="bg-keppel-600 hover:bg-keppel-700 active:bg-keppel-800"
              type="submit"
              disabled={isPending}
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AccountInfoForm;
