import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export const StudentCards = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,278",
      textColor: "text-black",
    },
    {
      title: "Active Students",
      value: "1,290",
      textColor: "text-green-500",
    },
    {
      title: "Inactive Students",
      value: "45",
      textColor: "text-gray-700",
    },
    {
      title: "Suspended",
      value: "5",
      textColor: "text-destructive",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ value, title, textColor }, index) => {
        return (
          <Card key={index}>
            <CardContent className="flex flex-col text-center items-center justify-center gap-1">
              <CardTitle className={cn("text-3xl", textColor)}>
                {value}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm">
                {title}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
