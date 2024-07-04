import { changePassFn } from "@/api/me-api";
import Modal from "@/components/modal";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const formSchema = z
  .object({
    currentPassword: z.string().min(1, { message: "Enter current password" }),
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

export type ChangePasswordValues = z.infer<typeof formSchema>;

function ChangePassModal({ isOpen, onClose }: Props) {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ChangePasswordValues) => changePassFn(data),
    onSuccess: () => {
      onClose();
      form.reset();
      toast.success("Password changed successfully");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        toast.error("Password change failed", {
          description: error.response.data.message,
        });
      } else {
        toast.error("Oops!", {
          description: "An unexpected error occurred. Please try again.",
        });
      }
    },
  });

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: ChangePasswordValues) {
    mutate(data);
  }
  return (
    <Modal
      title="Change password"
      description="Change your account password"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            name="currentPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="confirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm new Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" autoComplete="off" />
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
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

export default ChangePassModal;
