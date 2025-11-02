import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber } from "@/lib/utils";
import { User } from "@/store/useAuth";
import { IconDotsVertical, IconPhone, IconUser } from "@tabler/icons-react";
import React from "react";

interface Props {
  student: User;
}

export const StudentCard = ({ student }: Props) => {
  return (
    <div className="space-y-4 border-b last:border-0 pb-4">
      <div className="flex items-center justify-start gap-2">
        <UserProfilePicture />
        <div className="flex-1">
          <h3 className="font-medium text-base line-clamp-1">
            {student?.firstName} {student?.lastName} {student?.otherName}
            <Badge variant={"outlineSuccess"}>Active</Badge>
          </h3>
          <a
            className="hover:text-primary text-sm text-muted-foreground hover:underline transition-all line-clamp-1"
            href={`mailto:${student?.email}`}
          >
            {student?.email}
          </a>
        </div>
        <Button size="icon" variant={"secondary"}>
          <IconDotsVertical />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          <span>
            {student?.Student.Class.level} - Section{" "}
            {student?.Student.Class.section}
          </span>
        </p>
        <p className="flex items-center justify-between gap-1">
          <span>
            <IconUser className="inline-block size-4.5" />
            STU2024099
          </span>
          <a
            className="hover:text-primary hover:underline transition-all flex items-center justify-start"
            href={`tel:alice@gmail.com`}
          >
            <IconPhone className="inline-block size-4.5" />
            {student?.phoneNumber ? (
              formatPhoneNumber(student?.phoneNumber)
            ) : (
              <span className="italic">No phone</span>
            )}
          </a>
        </p>
      </div>
    </div>
  );
};
