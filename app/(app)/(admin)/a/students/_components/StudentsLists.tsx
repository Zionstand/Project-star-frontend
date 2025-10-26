import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { StudentCard } from "./StudentCard";
import { StudentsTable } from "./StudentsTable";
import { StudentsCard } from "./StudentsCard";

export const StudentsLists = () => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <h3 className="font-medium text-base">Students (4)</h3>
      </CardHeader>
      <CardContent>
        <StudentsTable />
        <StudentsCard />
      </CardContent>
    </Card>
  );
};
