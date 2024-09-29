import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ACCEPTED_IMAGE_MIME_TYPES, daysOfWeek } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDepartments } from "@/services/queries/departments";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

type Props = { isOpen: boolean; onClose: () => void };

const accountSchema = z
  .object({
    firstName: z.string().min(1, { message: "Enter First Name" }),
    lastName: z.string().min(1, { message: "Enter Last Name" }),
    email: z.string().email({ message: "Enter valid email" }),
    phone: z.string().optional(),
    profilePicture: z
      .any()
      .optional()
      .refine(
        (file: File) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    departmentId: z.string({ message: "Choose a Department" }),
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

const profileSchema = z.object({
  specialization: z
    .string()
    .min(1, { message: "Enter valid specialization" })
    .optional(),
  qualification: z
    .string()
    .min(1, { message: "Enter valid qualification" })
    .optional(),
  appointmentDuration: z.number({
    message: "Enter Minimum Appointment Duration (mins)",
  }),
});

const scheduleSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  daysOfWeek: z
    .enum(daysOfWeek)
    .array()
    .nonempty("At least one day should be selected"),
});

const formSchema = z.object({
  account: accountSchema,
  profile: profileSchema,
  schedule: scheduleSchema,
});

const scheduleDefValues = {
  startTime: "",
  endTime: "",
  daysOdWeek: [],
};

const accountDefValues = {
  firstName: "",
  lastName: "",
  email: "",
  profilePicture: undefined,
  phone: "",
  departmentId: "",
  password: "",
  confirmPassword: "",
};

export type AddDoctorValues = z.infer<typeof formSchema>;

export default function DoctorModal({ isOpen, onClose }: Props) {
  const { data } = useDepartments();
  const [search, setSearch] = useState("");

  const form = useForm<AddDoctorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: accountDefValues,
      schedule: scheduleDefValues,
    },
  });

  const filteredDepartments = data?.departments.filter((department) =>
    department.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  function onSubmit(data: AddDoctorValues) {
    console.log(data);
  }

  return (
    <Modal
      title="Add Doctor Account"
      description="Add a doctor account to the system"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            {/* Account Tab Content */}
            <TabsContent value="account" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="account.firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="account.lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="account.email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="account.phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="account.profilePicture"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
                          type="file"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="account.departmentId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className={cn(
                                    "w-full justify-between",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? data?.departments.find(
                                        (language) =>
                                          language.id === field.value
                                      )?.name
                                    : "Select language"}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command shouldFilter={false}>
                                <CommandInput
                                  placeholder="Search department..."
                                  className="h-9"
                                  value={search}
                                  onValueChange={setSearch}
                                />
                                <CommandList>
                                  <CommandEmpty>
                                    No department found.
                                  </CommandEmpty>

                                  <CommandGroup>
                                    {filteredDepartments?.map((department) => (
                                      <CommandItem
                                        value={department.id}
                                        key={department.id}
                                        onSelect={() => {
                                          form.setValue(
                                            "account.departmentId",
                                            department.id
                                          );
                                        }}
                                      >
                                        {department.name}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            department.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="account.password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="account.confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>

            {/* Profile Tab Content */}
            <TabsContent value="profile" className="space-y-2">
              Change your Profile here.
            </TabsContent>

            {/* Schedule Tab Content */}
            <TabsContent value="schedule" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  name="schedule.startTime"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="schedule.endTime"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input {...field} type="time" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="schedule.daysOfWeek"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Days</FormLabel>
                    <FormControl>
                      <ToggleGroup
                        size="sm"
                        variant="outline"
                        type="multiple"
                        className="justify-start"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        {daysOfWeek.map((day, index) => (
                          <ToggleGroupItem
                            value={day}
                            aria-label={`Toggle ${day}`}
                            key={index}
                          >
                            {day}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </Modal>
  );
}
