import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatDate, formatWord } from "@/lib/utils";
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconClock,
} from "@tabler/icons-react";
import React from "react";

interface Props {
  firstName: string;
  lastName: string;
  email: string;
  employeeID: string | null;
  role: string;
  image: string | null;
  title: string | null | undefined;
  dob: string | null;
  joinedDate: string | null;
}

export const StaffProfile = ({
  firstName,
  lastName,
  employeeID,
  role,
  image,
  title,
  email,
  dob,
  joinedDate,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Profile</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="text-center flex flex-col items-center justify-center gap-4">
          <UserProfilePicture
            size="lg"
            src={image}
            alt={`${firstName}'s picture`}
          />
          <div className="space-y-1.5">
            <p className="text-base lg:text-lg font-medium">
              {title} {firstName} {lastName}
            </p>
            <p className="text-muted-foreground text-sm">
              {employeeID || (
                <a
                  href={`mailto:${email}`}
                  className="hover:underline hover:text-primary"
                >
                  {email}
                </a>
              )}
            </p>
            <div className="flex items-center justify-center gap-1">
              <Badge>{formatWord[role]}</Badge>
              <Badge variant={"outlineSuccess"}>Active</Badge>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-4 text-muted-foreground text-sm">
          <div className="flex items-start justify-start gap-2">
            <IconBuilding className="size-5" />
            <div>
              <p className="text-xs">Department</p>
              <p className="text-black font-medium">Science</p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2">
            <IconBriefcase className="size-5" />
            <div>
              <p className="text-xs">Employee Number</p>
              <p className="text-black font-medium">
                {employeeID || (
                  <span className="italic">No employee number</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2">
            <IconCalendar className="size-5" />
            <div>
              <p className="text-xs">Date of Birth</p>
              <p className="text-black font-medium">
                {formatDate(dob) || (
                  <span className="italic">No Date of Birth</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-start justify-start gap-2">
            <IconClock className="size-5" />
            <div>
              <p className="text-xs">Joined Date</p>
              <p className="text-black font-medium">{formatDate(joinedDate)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
