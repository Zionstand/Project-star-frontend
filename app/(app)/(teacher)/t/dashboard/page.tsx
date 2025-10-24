"use client";
import { DashboardCards } from "@/components/DashboardCards";
import { PageHeader } from "@/components/PageHeader";
import { useAuth } from "@/store/useAuth";
import React from "react";
import {
  IconAlertCircle,
  IconBook,
  IconCalendar,
  IconClock,
  IconMessage,
  IconTrendingUp,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dot } from "lucide-react";
import { TodaySchedule } from "./_components/TodaySchedule";
import { Button } from "@/components/ui/button";
import { PendingTask } from "./_components/PendingTask";
import { QuickActions } from "./_components/QuickActions";

const page = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "My classes",
      value: "6",
      icon: IconUsers,
      bgColor: "bg-primary",
      textColor: "text-white",
      description: "Active classes",
    },
    {
      title: "Total Students",
      value: "267",
      icon: IconUsersGroup,
      bgColor: "bg-green-500/20",
      textColor: "text-green-500",
      description: "Across all classes",
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: IconAlertCircle,
      bgColor: "bg-orange-500/20",
      textColor: "text-orange-500",
      description: "3 high priority",
    },
    {
      title: "Messages",
      value: "12",
      icon: IconMessage,
      bgColor: "bg-purple-500/20",
      textColor: "text-purple-500",
      description: "5 unread",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.firstName}`}
        description={"Here's what's happening with your classes today."}
      />
      <DashboardCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-start">
                <IconCalendar className="inline-block mr-1" />
                Today's schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-2">
              <TodaySchedule />
              <TodaySchedule />
              <TodaySchedule />
              <TodaySchedule />
              <Button variant={"outline"} className="w-full">
                View Full Timetable
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <Card className="gap-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-start">
                <IconClock className="inline-block mr-1" />
                Today's schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 mt-3">
              <PendingTask />
              <PendingTask />
              <PendingTask />
              <PendingTask />
              <Button variant={"outline"} className="w-full">
                View all tasks
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <QuickActions />
    </div>
  );
};

export default page;
