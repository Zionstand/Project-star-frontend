"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";
import { IconBuildings, IconEye, IconTarget } from "@tabler/icons-react";
import React from "react";
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
import { ownershipTypes, schoolTypes, years } from "@/constant";

export const BasicInformation = () => {
  const form = useForm<SchoolIdentitySchemaType>({
    resolver: zodResolver(SchoolIdentitySchema),
    defaultValues: {
      schoolName: "Lagelu Grammar School",
      schoolMotto: "Excellence Through Knowledge",
      shortName: "LGS",
      visionStatement:
        "To be a leading institution that nurtures future leaders through quality education, character development, and innovation.",
      missionStatement:
        "To provide comprehensive and quality education that empowers students with knowledge, skills, and values necessary for academic excellence and positive contribution to society.",
    },
  });

  function onSubmit(values: SchoolIdentitySchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-6">
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
                  <div className="flex-3 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="schoolName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              School Name
                              <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Lagelu Grammar School"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shortName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Name/Acronym</FormLabel>
                            <FormControl>
                              <Input placeholder="LGS" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="schoolMotto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>School Motto</FormLabel>
                          <FormControl>
                            <Input
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
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconEye className="text-primary inline-block" />
                    <span>Vision Statement</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="visionStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconTarget className="text-green-500 inline-block" />
                    <span>Mission Statement</span>
                  </h3>
                  <FormField
                    control={form.control}
                    name="missionStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="establishmentYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Establishment</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem value={year} key={year}>
                              {year}
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
                  name="schoolType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {schoolTypes.map((type) => (
                            <SelectItem value={type} key={type}>
                              {type}
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
                  name="ownershipType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ownership Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ownership" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ownershipTypes.map((type) => (
                            <SelectItem value={type} key={type}>
                              {type}
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

            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
