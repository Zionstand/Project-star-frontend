"use client";
import { RoleModal } from "@/components/RoleModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SchoolRoles } from "@/store/useAuth";
import {
  IconKey,
  IconTrash,
  IconUser,
  IconUserQuestion,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  staffId: string;
  jobRoles: {
    id: string;
    name: string;
  }[];
  role: string;
  schoolRoles: SchoolRoles[];
  onRefresh: () => void;
}

export const QuickActions = ({
  firstName,
  username,
  lastName,
  staffId,
  jobRoles,
  role,
  schoolRoles,
  onRefresh,
}: Props) => {
  const [openRoleModal, setOpenRoleModal] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button asChild className="justify-start" variant={"outline"}>
          <Link href={`/a/staffs/${username}`}>
            <IconUser />
            Edit {firstName}'s details
          </Link>
        </Button>
        <Button
          onClick={() => setOpenRoleModal(true)}
          className="justify-start"
          variant={"outline"}
        >
          <IconUserQuestion />
          Assign Role
        </Button>
        <Button className="justify-start" variant={"outline"}>
          <IconKey />
          Reset Password
        </Button>
        <Button className="justify-start" variant={"outlineDestructive"}>
          <IconTrash />
          Delete {firstName}'s account
        </Button>
      </CardContent>
      {openRoleModal && (
        <RoleModal
          firstName={firstName}
          lastName={lastName}
          staffId={staffId}
          open={openRoleModal}
          jobRoles={jobRoles}
          role={role}
          schoolRoles={schoolRoles}
          onClose={() => {
            setOpenRoleModal(false);
            onRefresh();
          }}
        />
      )}
    </Card>
  );
};
