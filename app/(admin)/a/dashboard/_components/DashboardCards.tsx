import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  IconBook,
  IconCalendar,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

export const DashboardCards = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: IconUsers,
      bgColor: "bg-primary",
      textColor: "text-white",
      description: "+12% from last month",
    },
    {
      title: "Active classes",
      value: "32",
      icon: IconBook,
      bgColor: "bg-green-500/20",
      textColor: "text-green-500",
      description: "+2 new classes",
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: IconCalendar,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
      description: "This week",
    },
    {
      title: "Performance",
      value: "94.2%",
      icon: IconTrendingUp,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
      description: "+2.4% improvement",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(
        ({ value, title, icon, bgColor, textColor, description }, index) => {
          const Icon = icon;
          return (
            <Card key={index}>
              <CardContent className="flex items-center justify-between gap-1">
                <div className="space-y-2">
                  <CardDescription>{title}</CardDescription>
                  <CardTitle className="text-3xl">{value} </CardTitle>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </div>
                <div className={cn(`rounded-lg p-3`, bgColor)}>
                  <Icon className={cn(`h-6 w-6`, textColor)} />
                </div>
              </CardContent>
            </Card>
          );
        }
      )}
    </div>
  );
};
