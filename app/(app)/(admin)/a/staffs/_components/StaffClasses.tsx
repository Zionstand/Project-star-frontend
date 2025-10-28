import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconSchool, IconUsers } from "@tabler/icons-react";
import React from "react";
import { Class } from "../../classes/page";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/EmptyState";

interface Props {
  classes: Class[] | undefined;
}

export const StaffClasses = ({ classes }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-1">
          <IconUsers className="size-4" />
          Assigned Classes {classes !== undefined && `(${classes?.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {classes === undefined && <EmptyState />}
        {classes?.map((c) => (
          <div className="space-y-1.5 border rounded-lg px-3 py-4">
            <p className="flex items-center justify-between gap-2 text-base font-medium">
              <span>
                {c.level}-{c.section}
              </span>
              <Badge variant={"outline"}>32 students</Badge>
            </p>
            <p className="text-muted-foreground text-sm">Further Mathematics</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
