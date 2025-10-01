import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "../_components/PageHeader";
import { DashboardCards } from "./_components/DashboardCards";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  IconBook,
  IconCalendar,
  IconClock,
  IconUser,
} from "@tabler/icons-react";
import { RecentActivityBox } from "../_components/RecentActivityBox";

const page = () => {
  const quickActions = [
    {
      title: "Add new Student",
      description: "Register a new student",
      icon: IconUser,
      color: "text-primary",
      bgColor: "bg-primary/10",
      hoverBorder: "hover:border-primary",
      slug: "/",
    },
    {
      title: "Create subject",
      description: "Add new subject or class",
      icon: IconBook,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      hoverBorder: "hover:border-green-500",
      slug: "/",
    },
    {
      title: "Schedule Event",
      description: "Add calendar event",
      icon: IconCalendar,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      hoverBorder: "hover:border-purple-500",
      slug: "/",
    },
  ];

  const recentActivities = [
    {
      type: "STUDENT",
      title: "New Student enrollment",
      description: "Tomiwa Adelae enrolled in SS2A",
      time: new Date(),
    },
    {
      type: "ASSIGNMENT",
      title: "Assignment submitted",
      description: "Mathematics homework by Class 9B",
      time: new Date(),
    },
    {
      type: "CALENDAR",
      title: "Schedule updated",
      description: "Physics lab session rescheduled",
      time: new Date(),
    },
    {
      type: "GRADE",
      title: "Grade published",
      description: "English exam results for Grade 11",
      time: new Date(),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader />
      <DashboardCards />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-start">
                <IconClock className="inline-block mr-1" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-2">
              {recentActivities.map(
                ({ time, title, description, type }, index) => (
                  <RecentActivityBox
                    time={time}
                    type={type}
                    title={title}
                    description={description}
                    key={index}
                  />
                )
              )}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-3">
              {quickActions.map(
                (
                  {
                    icon,
                    title,
                    description,
                    color,
                    bgColor,
                    slug,
                    hoverBorder,
                  },
                  index
                ) => {
                  const Icon = icon;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center gap-2 cursor-pointer rounded-md p-3 border border-transparent transition-colors",
                        bgColor,
                        hoverBorder
                      )}
                    >
                      <div className="rounded-lg p-3 bg-white">
                        <Icon className={cn("h-6 w-6", color)} />
                      </div>
                      <div className="space-y-0">
                        <h4 className="font-medium text-sm">{title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
