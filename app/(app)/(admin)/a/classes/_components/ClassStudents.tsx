import { SearchBar } from "@/components/Searchbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { StudentsTable } from "../../students/_components/StudentsTable";
import { StudentsCard } from "../../students/_components/StudentsCard";

export const ClassStudents = () => {
  return (
    <Card className="gap-2.5">
      <CardHeader>
        <CardTitle>Class students</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchBar />
        <StudentsTable />
        <StudentsCard />
      </CardContent>
    </Card>
  );
};
