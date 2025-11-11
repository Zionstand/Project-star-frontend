import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers } from "@tabler/icons-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";
import { Class } from "@/store/useAuth";
import { NothingFound } from "@/components/NothingFound";

interface Props {
  classes: Class[] | undefined;
}

export const StaffClasses = ({ classes }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-1">
          <IconUsers className="text-primary size-4" />
          Assigned Classes {classes?.length !== 0 && `(${classes?.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes?.length === 0 && <NothingFound message="No class assigned" />}
        {classes?.map((c, index) => (
          <div key={index} className="space-y-1.5 border rounded-md px-3 py-4">
            <p className="flex items-center justify-between gap-2 text-base font-medium">
              <span>
                {c.level}
                {c.section}
              </span>
              <Badge variant={"outline"}>{c.students.length} students</Badge>
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
