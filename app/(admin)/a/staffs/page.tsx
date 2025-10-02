import React from "react";
import { StaffCards } from "../_components/StaffCards";
import { PageHeader } from "../_components/PageHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { StaffsLists } from "./_components/StaffsLists";
import { StaffSearchComponent } from "../_components/StaffSearchComponent";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff Management"
        description="Manage staff members and their information"
        primaryCTA={{
          label: "Add Staff member",
          slug: "/a/staff/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Export",
          slug: "/a/staff/new",
          icon: IconDownload,
        }}
      />
      <StaffCards />
      <StaffSearchComponent />
      <StaffsLists />
    </div>
  );
};

export default page;
