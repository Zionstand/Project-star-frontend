import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber, formatWord } from "@/lib/utils";
import { User } from "@/store/useAuth";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconMessage,
  IconPhone,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { Class } from "../../classes/page";
import { StaffActions } from "./StaffActions";

export interface ExtendedUser extends NonNullable<User> {
  Teacher?: {
    classes: Class[];
    assignments: {
      id: true;
      Subject: {
        name: string;
        department: string;
      };
    }[];
  };
}

interface Props {
  staff: ExtendedUser | null;
}

export const StaffCard = ({ staff }: Props) => {
  return (
    <div className="space-y-4 border-b last:border-0 pb-4">
      <div className="flex items-center justify-start gap-2">
        <UserProfilePicture src="" alt="" size="default" />
        <div className="flex-1">
          <h3 className="font-medium text-base line-clamp-1">
            {staff?.firstName} {staff?.lastName}{" "}
            <Badge variant={"outlineSuccess"}>Active</Badge>
          </h3>
          <a
            className="hover:text-primary inline-block text-sm text-muted-foreground hover:underline transition-all line-clamp-1"
            href={`mailto:${staff?.email}`}
          >
            {staff?.email}
          </a>
        </div>
        <StaffActions id={staff?.id} />
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        <p className="flex items-center justify-between gap-1">
          <span>
            {staff?.role === "TEACHER" && staff?.Teacher?.assignments && (
              <div className="flex gap-1">
                {staff.Teacher.assignments.slice(0, 1).map((a, index) => (
                  <Badge key={index} variant="secondary">
                    {a.Subject.name}
                  </Badge>
                ))}

                {staff.Teacher.assignments.length > 1 && (
                  <Badge variant="secondary">
                    +{staff.Teacher.assignments.length - 1}
                  </Badge>
                )}
              </div>
            )}
            {staff?.role === "ADMINISTRATOR" && "Administration"}
            {staff?.role === "PRINCIPAL" && "Administration"}
            {staff?.role === "BURSAR" && "Finances"}
            {staff?.role === "LIBRARIAN" && "Library Services"}
            {staff?.role === "COUNSELOR" && "Library Student Services"}
          </span>
          <Badge variant={"outlinePurple"}>{formatWord[staff?.role!]}</Badge>
        </p>
        <p className="flex items-center justify-between gap-1">
          <span>
            <IconUser className="inline-block size-4.5" />
            EMP2024099
          </span>
          <a
            className="hover:text-primary hover:underline transition-all flex items-center justify-start"
            href={`tel:${staff?.phoneNumber}`}
          >
            <IconPhone className="inline-block size-4.5" />{" "}
            {staff?.phoneNumber ? (
              formatPhoneNumber(staff?.phoneNumber)
            ) : (
              <span className="italic">No phone</span>
            )}
          </a>
        </p>
      </div>
    </div>
  );
};
