import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber, formatWord } from "@/lib/utils";
import { User } from "@/store/useAuth";
import { IconDotsVertical, IconPhone, IconUser } from "@tabler/icons-react";
import React from "react";

interface Props {
  staff: User;
}

export const StaffCard = ({ staff }: Props) => {
  return (
    <div className="space-y-4 border-b last:border-0 pb-4">
      <div className="flex items-center justify-start gap-2">
        <UserProfilePicture src="" alt="" size="default" />
        <div className="flex-1">
          <h3 className="font-medium text-base line-clamp-1">
            {staff?.firstName} {staff?.lastName}
            <Badge variant={"outlineSuccess"}>Active</Badge>
          </h3>
          <a
            className="hover:text-primary inline-block text-sm text-muted-foreground hover:underline transition-all line-clamp-1"
            href={`mailto:${staff?.email}`}
          >
            {staff?.email}
          </a>
        </div>
        <Button size="icon" variant={"secondary"}>
          <IconDotsVertical />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground space-y-2">
        <p className="flex items-center justify-between gap-1">
          <span>Mathematics</span>
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
            <IconPhone className="inline-block size-4.5" />
            {formatPhoneNumber(staff?.phoneNumber)}
          </a>
        </p>
      </div>
    </div>
  );
};
