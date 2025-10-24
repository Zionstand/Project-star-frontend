"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  IconBell,
  IconBuildings,
  IconEye,
  IconTarget,
} from "@tabler/icons-react";
import React, { useEffect, useTransition } from "react";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import {
  SchoolIdentitySchema,
  SchoolIdentitySchemaType,
} from "@/lib/zodSchema";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years } from "@/constant";
import { useAuth } from "@/store/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/Loader";
import api from "@/lib/api";
import { toast } from "sonner";

interface Props {
  schoolTypes: {
    id: string;
    name: string;
  }[];
  ownershipTypes: {
    id: string;
    name: string;
  }[];
}

export const BasicInformation = ({ schoolTypes, ownershipTypes }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateSchool = useAuth((s) => s.updateSchool);
  const [pending, startTransition] = useTransition();

  const { user } = useAuth();
  const edit = searchParams.get("edit") === "true";

  const form = useForm<SchoolIdentitySchemaType>({
    resolver: zodResolver(SchoolIdentitySchema),
    defaultValues: {
      name: "",
      motto: "",
      acronym: "",
      visionStatement: "",
      missionStatement: "",
      establishmentYear: "",
      ownershipType: "",
      schoolType: "",
    },
  });

  // Reset form when owned school loads
  useEffect(() => {
    if (user?.school) {
      form.reset({
        name: user.school.name || "",
        motto: user.school.motto || "",
        acronym: user.school.acronym || "",
        visionStatement: user.school.visionStatement || "",
        missionStatement: user.school.missionStatement || "",
        establishmentYear: user.school.establishmentYear?.toString() || "",
        ownershipType: user.school.ownershipType || "",
        schoolType: user.school.schoolType || "",
      });
    }
  }, [user?.school, form]);

  function onSubmit(values: SchoolIdentitySchemaType) {
    startTransition(async () => {
      try {
        const res = await api.put(`/schools/${user?.school?.id}`, values);
        updateSchool(res.data.school);
        toast.success(res.data.message);
        router.replace(`/a/school`);
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
                  <h3 className="font-medium text-base">School Identity</h3>
                  <p className="text-sm text-muted-foreground">
                    Basic information about your school including name, logo,
                    and branding
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-start gap-4">
                  <div className="flex-1 border-2 border-dashed border-muted-foreground rounded-lg w-full py-10 flex items-center justify-center bg-accent">
                    <IconBuildings className="text-muted-foreground size-14" />
                  </div>
                  <div className="flex-3 w-full space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* SCHOOL NAME */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              School Name <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="EduManage School Management"
                                readOnly={!edit}
                                disabled={!edit}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* ACRONYM */}
                      <FormField
                        control={form.control}
                        name="acronym"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Name/Acronym</FormLabel>
                            <FormControl>
                              <Input
                                readOnly={!edit}
                                disabled={!edit}
                                placeholder="LGS"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* MOTTO */}
                    <FormField
                      control={form.control}
                      name="motto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Motto</FormLabel>
                          <FormControl>
                            <Input
                              readOnly={!edit}
                              disabled={!edit}
                              placeholder="Excellence Through Knowledge"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* ==== STATEMENTS ==== */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    <IconEye className="text-primary inline-block" />
                    <span>Vision Statement</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="visionStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input readOnly={!edit} disabled={!edit} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center gap-1">
                    <IconTarget className="text-green-500 inline-block" />
                    <span>Mission Statement</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="missionStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input readOnly={!edit} disabled={!edit} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* ==== DROPDOWNS ==== */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* ESTABLISHMENT YEAR */}
                <FormField
                  control={form.control}
                  name="establishmentYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Established</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!edit}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SCHOOL TYPE */}
                <FormField
                  control={form.control}
                  name="schoolType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        School Category <RequiredAsterisk />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!edit}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {schoolTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* OWNERSHIP TYPE */}
                <FormField
                  control={form.control}
                  name="ownershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Ownership Type <RequiredAsterisk />
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!edit}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ownership" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ownershipTypes?.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
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

            {/* ==== SAVE / CANCEL ==== */}
            {edit && (
              <div className="border bg-primary/10 rounded-lg border-primary text-base text-primary p-6 flex items-center justify-between gap-1">
                <div className="flex items-center justify-start gap-1">
                  <IconBell />
                  <p>You have unsaved changes</p>
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => router.push("/a/school")}
                    type="button"
                    variant="secondary"
                    disabled={pending || !edit}
                  >
                    Cancel
                  </Button>
                  <Button disabled={pending || !edit} type="submit">
                    {pending ? <Loader text="Saving..." /> : "Save changes"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
