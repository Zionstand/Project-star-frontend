import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { IconDotsVertical, IconPhone, IconUser } from "@tabler/icons-react";
import React from "react";

export const StudentCard = () => {
  return (
    <div className="space-y-4 border-b last:border-0 pb-4">
      <div className="flex items-center justify-start gap-2">
        <UserProfilePicture />
        <div className="flex-1">
          <h3 className="font-medium text-base line-clamp-1">
            Tomiwa Adelae Ademola Evelyn Opara timetable
            <Badge variant={"outlineSuccess"}>Active</Badge>
          </h3>
          <a
            className="hover:text-primary text-sm text-muted-foreground hover:underline transition-all line-clamp-1"
            href={`mailto:alice@gmail.com`}
          >
            alicewilliams@gmail.com
          </a>
        </div>
        <Button size="icon" variant={"secondary"}>
          <IconDotsVertical />
        </Button>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          <span>JSS1 - Section A</span>
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
            +234 802 789 7888
          </a>
        </p>
      </div>
    </div>
  );
};
