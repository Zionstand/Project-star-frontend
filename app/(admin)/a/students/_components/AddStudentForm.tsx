"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { NewStudentForm, NewStudentFormType } from "@/lib/zodSchema";
import { toast } from "sonner";
import api from "@/lib/api";
import {
  IconAlertSquareRounded,
  IconBuilding,
  IconClipboardHeart,
  IconMapPin2,
  IconUser,
} from "@tabler/icons-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import DateSelector from "@/components/DateSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allClasses, genders, relationships, sections } from "@/constant";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface Props {
  states: {
    id: string;
    name: string;
  }[];
}

export const AddStudentForm = ({ states }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<NewStudentFormType>({
    resolver: zodResolver(NewStudentForm),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dob: "",
      gender: "",
      studentClass: "",
      section: "",
      admissionNumber: "",
      address: "",
      city: "",
      state: "",
      parentEmail: "",
      parentLastName: "",
      parentFirstName: "",
      parentPhoneNumber: "",
      parentRelationship: "",
      emergencyContactName: "",
      emergencyPhoneNumber: "",
      medicalConditions: "",
    },
  });

  function onSubmit(values: NewStudentFormType) {
    startTransition(async () => {
      try {
        // const res = await api.put(`/schools/${user?.ownedSchool?.id}`, values);
        // updateSchool(res.data.school);
        // toast.success(res.data.message);
        // router.replace(`/a/school`);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    });
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-6">
              {/* ==== BASIC INFO SECTION ==== */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-base">Student Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter the student's personal details
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconUser className="text-primary inline-block" />
                    <span>Personal Information</span>
                  </h3>
                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            First name
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Last name
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter student email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Primary Phone
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <RPNInput.default
                              className="flex rounded-md shadow-xs"
                              international
                              flagComponent={FlagComponent}
                              countrySelectComponent={CountrySelect}
                              inputComponent={PhoneInput}
                              placeholder="+2348012345679"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Date of Birth <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <DateSelector field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Gender
                            <RequiredAsterisk />
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genders.map((gender, index) => (
                                <SelectItem value={gender} key={index}>
                                  {gender}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>{" "}
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconBuilding className="text-primary inline-block" />
                    <span>Academic Information</span>
                  </h3>
                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="studentClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Class
                            <RequiredAsterisk />
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {allClasses.map((c, index) => (
                                <SelectItem value={c.value} key={index}>
                                  {c.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="section"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Section
                            <RequiredAsterisk />
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select section" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sections.map((section, index) => (
                                <SelectItem value={section} key={index}>
                                  {section}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />{" "}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2 lg:col-span-1">
                          <FormLabel>
                            Admission Number
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter student admission number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>{" "}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconMapPin2 className="text-primary inline-block" />
                    <span>Address Information</span>
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Street Address
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123 Education Avenue, Lagelu Local Government"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              City
                              <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Ibadan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              State
                              <RequiredAsterisk />
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem value={state.name} key={state.id}>
                                    {state.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>{" "}
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconUser className="text-primary inline-block" />
                    <span>Parent/Guardian Information</span>
                  </h3>
                  <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="parentFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Parent first name
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Parent last name
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Parent email
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter parent email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Parent phone
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <RPNInput.default
                              className="flex rounded-md shadow-xs"
                              international
                              flagComponent={FlagComponent}
                              countrySelectComponent={CountrySelect}
                              inputComponent={PhoneInput}
                              placeholder="+2348012345679"
                              value={field.value}
                              onChange={(value) => field.onChange(value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="parentRelationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Relationship
                            <RequiredAsterisk />
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select relationship" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {relationships.map((relationship, index) => (
                                <SelectItem value={relationship} key={index}>
                                  {relationship}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>{" "}
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconAlertSquareRounded className="text-primary inline-block" />
                    <span>Emergency Contact</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="emergencyContactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Emergency name
                              <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="Enter name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="emergencyPhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Emergency phone
                              <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <RPNInput.default
                                className="flex rounded-md shadow-xs"
                                international
                                flagComponent={FlagComponent}
                                countrySelectComponent={CountrySelect}
                                inputComponent={PhoneInput}
                                placeholder="+2348012345679"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>{" "}
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconClipboardHeart className="text-primary inline-block" />
                    <span>Medical Information</span>
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="medicalConditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Medical conditions/allergies
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter any medical conditions or allergies (or 'None')"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                {/* ==== SAVE / CANCEL ==== */}
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => router.push("/a/school")}
                    type="button"
                    variant="secondary"
                    disabled={pending}
                  >
                    Cancel
                  </Button>
                  <Button disabled={pending} type="submit">
                    {pending ? <Loader text="Saving..." /> : "Save changes"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
