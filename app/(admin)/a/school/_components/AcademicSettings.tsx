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
  IconCalendar,
  IconClock,
  IconEye,
  IconMapPin,
  IconPhone,
  IconTarget,
} from "@tabler/icons-react";
import React from "react";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import {
  AcademicSettingsSchema,
  AcademicSettingsSchemaType,
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

export const AcademicSettings = () => {
  const form = useForm<AcademicSettingsSchemaType>({
    resolver: zodResolver(AcademicSettingsSchema),
    defaultValues: {
      currentSession: "",
      currentTerm: "",
      termsPerSession: "",
      academicStartDate: "",
      academicEndDate: "",
      gradingSystem: "",
      passMark: "",
    },
  });

  function onSubmit(values: AcademicSettingsSchemaType) {
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
                    Academic Configuration
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configure academic year, terms, grading system, and
                    assessment settings
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconCalendar className="text-primary inline-block" />
                    <span>Current Academic Period</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="currentSession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Current Session
                              <RequiredAsterisk />
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 2025/2026" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentTerm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Current Term
                              <RequiredAsterisk />
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select term" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {academicTerms.map((term) => (
                                  <SelectItem value={term} key={term}>
                                    {term}
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
                        name="termsPerSession"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Terms Per Session
                              <RequiredAsterisk />
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select terms" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {termsPerSession.map((term) => (
                                  <SelectItem value={term} key={term}>
                                    {term}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="academicStartDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Academic Year Start Date</FormLabel>
                            <FormControl>
                              <DateSelector />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="academicEndDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Academic Year End Date</FormLabel>
                            <FormControl>
                              <DateSelector />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                  <IconAward className="text-green-500 inline-block" />
                  <span>Grading & Assessment</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gradingSystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Grading System
                          <RequiredAsterisk />
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select terms" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {gradingSystems.map((system) => (
                              <SelectItem value={system} key={system}>
                                {system}
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
                    name="passMark"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Pass Mark <RequiredAsterisk />
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
