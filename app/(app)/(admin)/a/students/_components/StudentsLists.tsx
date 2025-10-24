import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentRow } from "./StudentRow";
import { StudentCard } from "./StudentCard";

export const StudentsLists = () => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <h3 className="font-medium text-base">Students (4)</h3>
      </CardHeader>
      <CardContent>
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Admission No.</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <StudentRow />
              <StudentRow />
              <StudentRow />
              <StudentRow />
              <StudentRow />
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden space-y-4">
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
          <StudentCard />
        </div>
      </CardContent>
    </Card>
  );
};
