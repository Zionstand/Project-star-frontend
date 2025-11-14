"use client";
import React, { Suspense, useEffect, useState } from "react";
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
import { configService } from "@/lib/configs";
import { PageHeader } from "@/components/PageHeader";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { useAuth, User } from "@/store/useAuth";
import { schoolService } from "@/lib/school";

const page = () => {
  const { user } = useAuth();
  const [schoolTypes, setSchoolTypes] = useState<any>();
  const [ownershipTypes, setOwnershipTypes] = useState<any>();
  const [states, setStates] = useState<any>();
  const [countries, setCountries] = useState<any>();
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      if (!user) return;
      try {
        const [
          schoolTypes,
          ownershipTypes,
          states,
          countries,
          students,
          teachers,
        ] = await Promise.all([
          configService.getCategory("SCHOOL_TYPE"),
          configService.getCategory("OWNERSHIP_TYPE"),
          configService.getCategory("STATE"),
          configService.getCategory("COUNTRY"),
          schoolService.getStudents(user?.school?.id!),
          schoolService.getSchoolTeachers(user?.school?.id!),
        ]);

        setSchoolTypes(schoolTypes);
        setOwnershipTypes(ownershipTypes);
        setStates(states);
        setCountries(countries);
        setStudents(students);
        setTeachers(teachers);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, [user]);

  if (loading) return <Loader />;

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
            <AdministrativeDetails
              students={students?.length}
              teachers={teachers?.length}
            />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  );
};

export default page;
