import React, { Suspense } from "react";
import { PageHeader } from "../../../../../components/PageHeader";
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
import { useAuth } from "@/store/useAuth";
import { configService } from "@/lib/configs";

const page = async () => {
  const schoolTypes = await configService.getCategory("SCHOOL_TYPE");
  const ownershipTypes = await configService.getCategory("OWNERSHIP_TYPE");
  const states = await configService.getCategory("STATE");
  const countries = await configService.getCategory("COUNTRY");

  return (
    <div className="space-y-6">
      <PageHeader
        title="School Profile"
        description="Manage your school's information, academic settings, and administrative details."
        primaryCTA={{
          label: "Edit Profile",
          slug: "/a/school?edit=true",
          icon: IconSettings,
        }}
      />
      <SchoolProfileCards />
      <Suspense fallback={<p>Loading contact details...</p>}>
        <Tabs defaultValue="basic-information">
          <ScrollArea>
            <TabsList className="mb-3 w-full">
              <TabsTrigger value="basic-information">
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
          <TabsContent value="basic-information">
            <BasicInformation
              schoolTypes={schoolTypes.items}
              ownershipTypes={ownershipTypes.items}
            />
          </TabsContent>
          <TabsContent value="contactDetails">
            <ContactDetails states={states.items} countries={countries.items} />
          </TabsContent>
          <TabsContent value="academicSettings">
            <AcademicSettings />
          </TabsContent>
          <TabsContent value="administrative">
            <AdministrativeDetails />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  );
};

export default page;
