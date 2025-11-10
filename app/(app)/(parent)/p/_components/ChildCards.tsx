import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  IconCheckbox,
  IconClock,
  IconCurrencyDollar,
  IconExclamationCircle,
  IconMessage,
  IconSchool,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";

export const ChildCards = () => {
  const stats = [
    {
      title: "Attendance",
      value: "94%",
      icon: IconUsers,
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      description: "This term",
    },
    {
      title: "Average Grade",
      value: "85%",
      icon: IconSchool,
      bgColor: "bg-primary/20",
      textColor: "text-primary",
      description: "Current term",
    },
    {
      title: "Pending Fees",
      value: "₦20,000",
      icon: IconCurrencyDollar,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
      description: "All cleared",
    },
    {
      title: "Messages",
      value: "3",
      icon: IconMessage,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
      description: "Unread",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-2">
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
                <div className={cn(`rounded-md p-3`, bgColor)}>
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
