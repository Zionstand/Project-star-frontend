"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IconFileTypeXls, IconUserPlus } from "@tabler/icons-react";
import { AddStudentForm } from "../_components/AddStudentForm";
import { configService } from "@/lib/configs";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { schoolService } from "@/lib/school";
import { useAuth } from "@/store/useAuth";
import { Class } from "../../classes/page";
import { ImportStudents } from "../_components/ImportStudents";

const page = () => {
  const { user } = useAuth();
  const [states, setStates] = useState<any>();
  const [classes, setClasses] = useState<Class[]>([]);
  const [countries, setCountries] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  console.log(classes);

  useEffect(() => {
    const fetchConfigs = async () => {
      if (!user) return;
      try {
        const [states, classes, countries] = await Promise.all([
          configService.getCategory("STATE"),
          schoolService.getSchoolClasses(user?.school?.schoolID!),
          configService.getCategory("COUNTRY"),
        ]);

        setStates(states);
        setClasses(classes);
        setCountries(countries);
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
        title="Add Student"
        description="Add a new student manually or import from Excel/CSV"
        back
      />
      <Tabs defaultValue="manual">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="manual">
              <IconUserPlus
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Manual Entry
            </TabsTrigger>
            <TabsTrigger value="import" className="group">
              <IconFileTypeXls
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Import from file
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="manual">
          <AddStudentForm
            states={states.items}
            classes={classes}
            countries={countries.items}
          />
        </TabsContent>
        <TabsContent value="import">
          <ImportStudents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
