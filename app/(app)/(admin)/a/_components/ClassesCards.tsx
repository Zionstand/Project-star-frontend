import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  IconBook,
  IconBrightness2,
  IconCalendar,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

export const ClassesCards = () => {
  const stats = [
    {
      title: "Total Subjects",
      value: 4,
      icon: IconBook,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
      description: "3 active",
    },
    {
      title: "Class Levels",
      value: 3,
      icon: IconBrightness2,
      bgColor: "bg-green-500/20",
      textColor: "text-green-500",
      description: "Organized by streams",
    },
    {
      title: "Total sections",
      value: 7,
      icon: IconUsers,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
      description: "Across all levels",
    },
    {
      title: "Weekly hours",
      value: 20,
      icon: IconTrendingUp,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
      description: "Total instruction time",
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
                  <CardDescription className="line-clamp-1">
                    {title}
                  </CardDescription>
                  <CardTitle className={cn("text-3xl", textColor)}>
                    {value}{" "}
                  </CardTitle>
                  <p className="text-muted-foreground text-xs line-clamp-1">
                    {description}
                  </p>
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
