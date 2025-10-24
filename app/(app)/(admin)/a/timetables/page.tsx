import React from "react";
import { PageHeader } from "../../../../../components/PageHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Timetables"
        description="Manage class schedules and time slots"
        primaryCTA={{
          label: "Create Timetable",
          slug: "/a/staff/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Export PDF",
          slug: "/a/staff/new",
          icon: IconDownload,
        }}
      />
    </div>
  );
};

export default page;
