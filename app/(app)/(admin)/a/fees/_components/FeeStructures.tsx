import { SearchBar } from "@/components/Searchbar";
import React from "react";
import { FeeStructure } from "./FeeStructure";

export const FeeStructures = () => {
  return (
    <div className="space-y-4">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FeeStructure />
        <FeeStructure />
        <FeeStructure />
        <FeeStructure />
        <FeeStructure />
        <FeeStructure />
      </div>
    </div>
  );
};
