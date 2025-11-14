"use client";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconFileTypeXls, IconUserPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { AddClassForm } from "./_components/AddClassForm";
import { configService } from "@/lib/configs";
import { schoolService } from "@/lib/school";
import { useAuth, User } from "@/store/useAuth";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { ImportClasses } from "../_components/ImportClasses";

const page = () => {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState<User[]>([]);
  const [classLevels, setClassLevels] = useState<any>([]);
  const [classSections, setClassSections] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [teachers, classSections, classLevels, departments] =
          await Promise.all([
            schoolService.getSchoolTeachers(user?.schoolId!),
            configService.getCategory("CLASS_SECTION"),
            configService.getCategory("CLASS_LEVEL"),
            configService.getCategory("SCHOOL_DEPARTMENT"),
          ]);

        setTeachers(teachers);
        setClassLevels(classLevels);
        setClassSections(classSections);
        setDepartments(departments);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, [user]);

  if (loading) return <Loader />;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Create new class"
        description="Add a new class to the school system"
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
          <AddClassForm
            classLevels={classLevels?.items}
            classSections={classSections?.items}
            teachers={teachers}
            departments={departments.items}
          />
        </TabsContent>
        <TabsContent value="import">
          <ImportClasses />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
