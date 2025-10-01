import React from "react";
import { PageHeader } from "../../_components/PageHeader";
import { StudentApprovalCards } from "../_components/StudentApprovalCards";
import { StudentSearchComponent } from "../../_components/StudentSearchComponent";
import { StudentsLists } from "./_components/StudentsLists";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title={"Student Approvals"}
        description={"Review and approve student enrollment requests"}
      />
      <StudentApprovalCards />
      <StudentSearchComponent />
      <StudentsLists />
    </div>
  );
};

export default page;
