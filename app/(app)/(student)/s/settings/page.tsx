"use client";
import React from "react";
import { IconBell, IconDeviceFloppy } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/PageHeader";
import { NotificationSettings } from "@/components/NotificationSettings";
import { DisplaySettings } from "@/components/DisplaySettings";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your system preferences and configurations"
        primaryCTA={{
          label: "Save Changes",
          slug: "/a/staff/new",
          icon: IconDeviceFloppy,
        }}
      />
      <Tabs defaultValue="notifications">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="notifications" className="group">
              <IconBell
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="group">
              Security
            </TabsTrigger>

            <TabsTrigger value="display" className="group">
              Display
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        <TabsContent value="display">
          <DisplaySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
