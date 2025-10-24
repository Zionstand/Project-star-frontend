import { SearchBar } from "@/components/Searchbar";
import React from "react";
import { AssessmentBox } from "./AssessmentBox";

export const AssessmentTypes = () => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AssessmentBox />
        <AssessmentBox />
        <AssessmentBox />
        <AssessmentBox />
        <AssessmentBox />
      </div>
    </div>
  );
};
