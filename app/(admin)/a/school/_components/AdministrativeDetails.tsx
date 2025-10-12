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
import * as RPNInput from "react-phone-number-input";
import {
  CountrySelect,
  FlagComponent,
  PhoneInput,
} from "@/components/PhoneNumberInput";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconAward,
  IconBuildings,
  IconBulb,
  IconCalendar,
  IconClock,
  IconEye,
  IconMapPin,
  IconPhone,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import {
  AdministrativeDetailsSchema,
  AdministrativeDetailsSchemaType,
} from "@/lib/zodSchema";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  academicTerms,
  countries,
  gradingSystems,
  ownershipTypes,
  schoolTypes,
  states,
  termsPerSession,
  years,
} from "@/constant";
import DateSelector from "@/components/DateSelector";

export const AdministrativeDetails = () => {
  const form = useForm<AdministrativeDetailsSchemaType>({
    resolver: zodResolver(AdministrativeDetailsSchema),
    defaultValues: {
      accreditationNumber: "",
      accreditationBody: "",
      schoolRegistrationNumber: "",
    },
  });

  function onSubmit(values: AdministrativeDetailsSchemaType) {
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
                  <h3 className="font-medium text-base">
                    Administrative Details
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Registration numbers, accreditation, and regulatory
                    information
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconAward className="text-primary inline-block" />
                    <span>Registration & Licensing</span>
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="schoolRegistrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            School Registration Number
                            <RequiredAsterisk />
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Registration Number"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Official registration number issued by education
                            authorities
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                  <IconBulb className="text-green-500 inline-block" />
                  <span>Accreditation Information</span>
                </h3>
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="accreditationBody"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accreditation Body</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Ministry of Education"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accreditationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accreditation Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter accreditation number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="rounded-md bg-green-500/5 text-green-800 p-4 border border-green-300 flex items-start justify-start gap-2">
                  <IconAward />
                  <div>
                    <p className="text-medium text-sm">Accreditation Status</p>
                    <p className="text-xs">
                      This school is fully accredited by Ministry of Education.
                      Accreditation is valid and up to date.
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                  <IconUsers className="text-purple-500 inline-block" />
                  <span>Additional Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg py-6 px-4 space-y-1.5">
                    <p className="text-sm text-muted-foreground">
                      Total Capacity
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium">
                      2,500 Students
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg py-6 px-4 space-y-1.5">
                    <p className="text-sm text-muted-foreground">
                      Teaching Staff
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium">
                      85 Teachers
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg py-6 px-4 space-y-1.5">
                    <p className="text-sm text-muted-foreground">
                      Student-Teacher Ratio
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium">
                      1:29
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg py-6 px-4 space-y-1.5">
                    <p className="text-sm text-muted-foreground">Campus Size</p>
                    <p className="text-lg md:text-xl lg:text-2xl font-medium">
                      15 Acres
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
