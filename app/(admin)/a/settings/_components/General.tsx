"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  GeneralSettingsSchema,
  GeneralSettingsSchemaType,
} from "@/lib/zodSchema";
import React from "react";

export const General = () => {
  const form = useForm<GeneralSettingsSchemaType>({
    resolver: zodResolver(GeneralSettingsSchema),
    defaultValues: {
      administrativeEmail: "",
      currency: "",
      supportEmail: "",
      systemLanguage: "",
      systemName: "",
      timezone: "",
    },
  });

  function onSubmit(values: GeneralSettingsSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Card>
      <CardContent>
        <div>
          <h3 className="font-medium text-base">General Configuration</h3>
          <p className="text-sm text-muted-foreground">
            Basic system and organization settings
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          ></form>
        </Form>
      </CardContent>
    </Card>
  );
};
