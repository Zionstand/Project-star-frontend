import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  IconAward,
  IconBook,
  IconBrightness2,
  IconBuilding,
  IconCalendar,
  IconCircleDashedLetterA,
  IconSchool,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

export const SchoolProfileCards = () => {
  const stats = [
    {
      title: "Established",
      value: "1976",
      icon: IconCalendar,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      title: "Current Session",
      value: "2025/2026",
      icon: IconSchool,
      bgColor: "bg-green-500/20",
      textColor: "text-green-500",
    },
    {
      title: "Current Term",
      value: "First Term",
      icon: IconBook,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
    },
    {
      title: "School Type",
      value: "Secondary",
      icon: IconBuilding,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(({ value, title, icon, bgColor, textColor }, index) => {
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
              </div>
              <div className={cn(`rounded-lg p-3`, bgColor)}>
                <Icon className={cn(`h-6 w-6`, textColor)} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
