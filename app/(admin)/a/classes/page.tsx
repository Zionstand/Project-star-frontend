import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { ClassesCards } from "../_components/ClassesCards";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IconCategoryFilled,
  IconDownload,
  IconGridScan,
  IconPlus,
  IconTopologyFullHierarchy,
} from "@tabler/icons-react";
import { SubjectCatalog } from "./_components/SubjectCatalog";
import { ClassStructures } from "./_components/ClassStructures";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Classes & Subjects"
        description="Structured curriculum management and class organization"
        primaryCTA={{
          label: "Add Subject",
          slug: "/a/classes/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Import Curriculum",
          slug: "/a/students/new",
          icon: IconDownload,
        }}
      />
      <ClassesCards />
      <Tabs defaultValue="catalog">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="catalog">
              <IconCategoryFilled
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Subject Catalog
            </TabsTrigger>
            <TabsTrigger value="structure" className="group">
              <IconTopologyFullHierarchy
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Class Structure
            </TabsTrigger>
            <TabsTrigger value="mapping" className="group">
              <IconGridScan
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Subject Mapping
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="catalog">
          <SubjectCatalog />
        </TabsContent>
        <TabsContent value="structure">
          <ClassStructures />
        </TabsContent>
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
