import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormHeading from "@/components/form-heading";
import AlertModal from "@/components/modals/alert-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Upload } from "lucide-react";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  dpImage: z
    .any()
    .refine((file: File) => file.size < 0, "Please choose an image file")
    .refine(
      (file: File) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type ImageFormValues = z.infer<typeof formSchema>;

const EditImageCard = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dpImage: undefined,
    },
  });

  const fileRef = form.register("dpImage");

  const onOpen = () => {
    setIsOpen(true);
  };

  function onSubmit(data: ImageFormValues) {
    console.log(data);
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        onConfirm={() => {}}
        loading={false}
      />
      <div className="bg-keppel-100 rounded-md">
        <FormHeading title="Photo" />
        <div className="p-4">
          {/* Content */}

          <div className="mb-4 flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-sm">Edit your photo</span>
              <span
                className="text-xs font-medium text-red-500 cursor-pointer"
                aria-label="Delete photo"
                onClick={onOpen}
              >
                Delete
              </span>
            </div>
          </div>

          {/* Image Update Form */}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="dpImage"
                render={({ field }) => (
                  <FormItem>
                    {selectedImage ? (
                      <>
                        <div className="flex w-24 h-24 items-center justify-center rounded-md border border-keppel-400 border-dashed">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="selected image"
                            loading="lazy"
                            className="h-full w-full"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <FormLabel htmlFor="image" className="cursor-pointer">
                          <div className="flex bg-slate-100 w-full h-24 items-center justify-center rounded-md border border-keppel-400 border-dashed p-4">
                            <Upload className="h-5 w-5 text-keppel-800" />
                          </div>
                        </FormLabel>
                      </>
                    )}
                    <FormControl>
                      <Input
                        {...fileRef}
                        id="image"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                          setSelectedImage(event.target.files?.[0] || null);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end py-5">
                <Button
                  className="bg-keppel-600 hover:bg-keppel-700 active:bg-keppel-800"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditImageCard;
