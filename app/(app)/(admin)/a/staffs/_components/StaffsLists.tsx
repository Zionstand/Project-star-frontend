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
import { ExtendedUser, StaffRow } from "./StaffRow";
import { StaffCard } from "./StaffCard";
import { User } from "@/store/useAuth";

interface Props {
  staffs: User[] | undefined | ExtendedUser[];
}

export const StaffsLists = ({ staffs }: Props) => {
  return (
    <Card className="gap-0">
      <CardHeader>
        <h3 className="font-medium text-base">
          Staff members ({staffs?.length})
        </h3>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffs?.map((staff) => (
                <StaffRow key={staff?.id} staff={staff} />
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="md:hidden space-y-4">
          {staffs?.map((staff) => (
            <StaffCard key={staff?.id} staff={staff} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
