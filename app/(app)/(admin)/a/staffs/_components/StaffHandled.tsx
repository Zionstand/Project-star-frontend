import { EmptyState } from "@/components/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconBook } from "@tabler/icons-react";
import React from "react";

interface Props {
  assignments:
    | {
        id: true;
        Subject: {
          name: string;
          department: string;
        };
      }[]
    | undefined;
}

export const StaffHandled = ({ assignments }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-1">
          <IconBook className="size-4" />
          Subjects Handled
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assignments === undefined && <EmptyState />}
        <div className="grid grid-cols-2 gap-2">
          {assignments?.map((a, index) => (
            <div key={index} className="rounded-md border p-3 text-sm">
              {a.Subject.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
