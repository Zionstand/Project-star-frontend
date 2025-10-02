import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export const StaffCards = () => {
  const stats = [
    {
      title: "Total Staffs",
      value: 5,
      textColor: "text-black",
    },
    {
      title: "Active Staffs",
      value: "10",
      textColor: "text-green-500",
    },
    {
      title: "Teachers",
      value: "45",
      textColor: "text-primary",
    },
    {
      title: "On Leave",
      value: "5",
      textColor: "text-orange-500",
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
