"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IconFileTypeXls, IconUserPlus } from "@tabler/icons-react";
import { AddStudentForm } from "../_components/AddStudentForm";
import { configService } from "@/lib/configs";
import { ImportStudent } from "../_components/ImportStudent";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";

const page = () => {
  const [states, setStates] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const [states] = await Promise.all([
          configService.getCategory("STATE"),
        ]);

        setStates(states);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, []);

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
          <AddStudentForm states={states.items} />
        </TabsContent>
        <TabsContent value="import">
          <ImportStudent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
