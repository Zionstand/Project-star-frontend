import React from "react";
import { PageHeader } from "../../../../../components/PageHeader";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { General } from "./_components/General";

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
      <Tabs defaultValue="catalog">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="catalog">
              {/* <IconBrandStackoverflow
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    /> */}
              General
            </TabsTrigger>
            <TabsTrigger value="structure" className="group">
              {/* <IconTopologyFullHierarchy
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    /> */}
              Notifications
            </TabsTrigger>
            <TabsTrigger value="mapping" className="group">
              {/* <IconReplaceUser
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    /> */}
              Security
            </TabsTrigger>
            <TabsTrigger value="mapping" className="group">
              {/* <IconReplaceUser
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    /> */}
              System
            </TabsTrigger>
            <TabsTrigger value="mapping" className="group">
              {/* <IconReplaceUser
                      className="-ms-0.5 me-1.5 opacity-60"
                      size={16}
                      aria-hidden="true"
                    /> */}
              Display
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="catalog">
          <General />
        </TabsContent>
        <TabsContent value="structure">{/* <FeeStructures /> */}</TabsContent>
        <TabsContent value="mapping">
          <p className="text-muted-foreground p-4 pt-1 text-center text-xs">
            Content for Tab 3
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
