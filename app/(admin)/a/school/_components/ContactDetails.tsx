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
  IconBuildings,
  IconEye,
  IconMapPin,
  IconPhone,
  IconTarget,
} from "@tabler/icons-react";
import React from "react";
import { RequiredAsterisk } from "@/components/RequiredAsterisk";
import {
  ContactDetailsSchema,
  ContactDetailsSchemaType,
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
  countries,
  ownershipTypes,
  schoolTypes,
  states,
  years,
} from "@/constant";

export const ContactDetails = () => {
  const form = useForm<ContactDetailsSchemaType>({
    resolver: zodResolver(ContactDetailsSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  function onSubmit(values: ContactDetailsSchemaType) {
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
                  <h3 className="font-medium text-base">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    School address, phone numbers, email, and website details
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                    <IconMapPin className="text-primary inline-block" />
                    <span>Physical Address</span>
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
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem value={state} key={state}>
                                    {state}
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
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code </FormLabel>
                            <FormControl>
                              <Input placeholder="100001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Country <RequiredAsterisk />
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {countries.map((country) => (
                                  <SelectItem value={country} key={country}>
                                    {country}
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
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-medium text-sm flex items-center justify-start gap-1">
                  <IconPhone className="text-green-500 inline-block" />
                  <span>Communication Details</span>
                </h3>
                <div className="grid grid-col-1 md:grid-cols-2 gap-4 space-y-4">
                  <FormField
                    control={form.control}
                    name="primaryPhoneNumber"
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
                  <FormField
                    control={form.control}
                    name="alternatePhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alternate Phone</FormLabel>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email Address <RequiredAsterisk />{" "}
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="info@lgs.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website </FormLabel>
                        <FormControl>
                          <Input placeholder="www.lgs.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Separator />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
