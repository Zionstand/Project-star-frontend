import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  IconAlertCircle,
  IconCheckbox,
  IconClock,
  IconExclamationCircle,
  IconFileDescription,
  IconTrendingUp,
} from "@tabler/icons-react";
import React from "react";

interface Props {
  total: number;
}

export const AssignmentsCards = ({ total }: Props) => {
  const stats = [
    {
      title: "Total Assignments",
      value: total,
      icon: IconFileDescription,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      title: "Pending",
      value: 2,
      icon: IconAlertCircle,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
    },
    {
      title: "Submitted",
      value: 3,
      icon: IconFileDescription,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
    },
    {
      title: "Graded",
      value: 47,
      icon: IconFileDescription,
      bgColor: "bg-green-600/20",
      textColor: "text-green-600",
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
