import React from "react";
import { PageHeader } from "../_components/PageHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessment Setup"
        description="Configure assessment types, grading schemes, and evaluation criteria"
        primaryCTA={{
          label: "Create Assessment",
          slug: "/a/students/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Import Template",
          slug: "/a/students/new",
          icon: IconDownload,
        }}
      />
    </div>
  );
};

export default page;
