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
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ACCEPTED_IMAGE_MIME_TYPES, daysOfWeek } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useDepartments } from "@/services/queries/departments";
import {
  accountDefValues,
  accountSchema,
  profileDefValues,
  profileSchema,
  scheduleDefValues,
  scheduleSchema,
} from "@/types/schemas/add-doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

import { useForm } from "react-hook-form";

import { z } from "zod";

type Props = { isOpen: boolean; onClose: () => void };

const formSchema = z.object({
  account: accountSchema,
  profile: profileSchema,
  schedule: scheduleSchema,
});

export type AddDoctorValues = z.infer<typeof formSchema>;

export default function DoctorModal({ isOpen, onClose }: Props) {
  const { data } = useDepartments();
  const [search, setSearch] = useState("");

  const form = useForm<AddDoctorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: accountDefValues,
      profile: profileDefValues,
      schedule: scheduleDefValues,
    },
  });

  const { errors } = form.formState;

  const hasErrorsInTab = (tabName: "account" | "profile" | "schedule") => {
    return Object.keys(errors).some((key) => key.startsWith(tabName));
  };

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
              <TabsTrigger
                value="account"
                className={cn(
                  hasErrorsInTab("account") && "text-red-500 border-red-500"
                )}
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className={cn(
                  hasErrorsInTab("profile") && "text-red-500 border-red-500"
                )}
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="schedule"
                className={cn(
                  hasErrorsInTab("schedule") && "text-red-500 border-red-500"
                )}
              >
                Schedule
              </TabsTrigger>
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
                                        (department) =>
                                          department.id === field.value
                                      )?.name
                                    : "Select Department"}
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
              <FormField
                name="profile.specialization"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe doctor's specialization"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="profile.qualification"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qualifications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe doctor's Qualifications"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="profile.appointmentDuration"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Duration (Minutes)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
