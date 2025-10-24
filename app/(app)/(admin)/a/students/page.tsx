import React from "react";
import { PageHeader } from "../../../../../components/PageHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { StudentCards } from "../_components/StudentCards";
import { StudentSearchComponent } from "../_components/StudentSearchComponent";
import { StudentsLists } from "./_components/StudentsLists";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Management"
        description="Manage student records and information"
        primaryCTA={{
          label: "Add Students",
          slug: "/a/students/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Export",
          slug: "/a/students/new",
          icon: IconDownload,
        }}
      />
      <StudentCards />
      <StudentSearchComponent />
      <StudentsLists />
    </div>
  );
};

export default page;
