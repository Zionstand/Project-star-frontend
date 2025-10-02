import { SearchBar } from "@/components/Searchbar";
import React from "react";
import { GradingScheme } from "./GradingScheme";

export const GradingSchemes = () => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <GradingScheme />
      <GradingScheme />
      <GradingScheme />
    </div>
  );
};
