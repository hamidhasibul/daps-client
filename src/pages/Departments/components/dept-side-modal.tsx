import SideModal from "@/components/side-modal";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const imageSchema = z
  .any()
  .optional()
  .refine(
    (file) =>
      file.length == 1
        ? ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type)
          ? true
          : false
        : true,
    "Invalid file. choose either JPEG or PNG image"
  )
  .refine(
    (file) =>
      file.length == 1 ? (file[0]?.size <= MAX_FILE_SIZE ? true : false) : true,
    "Max file size allowed is 8MB."
  );

const formSchema = z.object({
  name: z.string().min(1, { message: "Please enter a name" }),
  description: z.string().optional(),
  image: imageSchema,
});

export type AddDeptValues = z.infer<typeof formSchema>;

export default function DepartmentSideModal({ isOpen, onClose }: Props) {
  const form = useForm<AddDeptValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  function onSubmit(data: AddDeptValues) {
    console.log(data);
  }
  return (
    <>
      <SideModal
        title="Add Department"
        description="Add department to the system"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 my-10"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Department details...."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input {...field} type="file" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end py-5">
              <Button
                className="bg-keppel-600 hover:bg-keppel-700 active:bg-keppel-800 w-full"
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </SideModal>
    </>
  );
}
