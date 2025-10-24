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
import { StaffRow } from "./StaffRow";
import { StaffCard } from "./StaffCard";

export const StaffsLists = () => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <h3 className="font-medium text-base">Staff members (4)</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <StaffRow />
              <StaffRow />
              <StaffRow />
              <StaffRow />
              <StaffRow />
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden space-y-4">
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
          <StaffCard />
        </div>
      </CardContent>
    </Card>
  );
};
