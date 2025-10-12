import React from "react";
import { PageHeader } from "../_components/PageHeader";
import {
  IconAward,
  IconBook,
  IconBuildings,
  IconMap,
  IconSettings,
} from "@tabler/icons-react";
import { SchoolProfileCards } from "../_components/SchoolProfileCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { BasicInformation } from "./_components/BasicInformation";
import { ContactDetails } from "./_components/ContactDetails";
import { AcademicSettings } from "./_components/AcademicSettings";
import { AdministrativeDetails } from "./_components/AdministrativeDetails";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="School Profile"
        description="Manage your school's information, academic settings, and administrative details."
        primaryCTA={{
          label: "Edit Profile",
          slug: "/a/school/edit",
          icon: IconSettings,
        }}
      />
      <SchoolProfileCards />
      <Tabs defaultValue="basicInformation">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="basicInformation">
              <IconBuildings
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Basic Information
            </TabsTrigger>
            <TabsTrigger value="contactDetails" className="group">
              <IconMap
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Contact Details
            </TabsTrigger>
            <TabsTrigger value="academicSettings" className="group">
              <IconBook
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Academic Settings
            </TabsTrigger>
            <TabsTrigger value="administrative" className="group">
              <IconAward
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Administrative
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="basicInformation">
          <BasicInformation />
        </TabsContent>
        <TabsContent value="contactDetails">
          <ContactDetails />
        </TabsContent>
        <TabsContent value="academicSettings">
          <AcademicSettings />
        </TabsContent>
        <TabsContent value="administrative">
          <AdministrativeDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
