import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber } from "@/lib/utils";
import { User } from "@/store/useAuth";
import {
  IconMail,
  IconMessage,
  IconPhone,
  IconSchool,
} from "@tabler/icons-react";
import React from "react";

interface Props {
  teacher: User;
}

export const ClassTeacherBox = ({ teacher }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-2">
          <IconSchool />
          Class Teacher
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-start justify-start gap-2">
        <UserProfilePicture
          src={teacher?.image}
          alt={`${teacher?.firstName}'s picture`}
        />
        <div className="flex-1 space-y-2">
          <h2 className="font-medium text-base md:text-lg">
            {teacher?.title} {teacher?.firstName} {teacher?.lastName}
          </h2>
          <div className="text-muted-foreground text-sm md:text-base space-y-1">
            <p className="text-sm flex items-center justify-start gap-1">
              <IconPhone className="size-4" />
              {teacher?.phoneNumber ? (
                formatPhoneNumber(teacher?.phoneNumber)
              ) : (
                <span className="italic">No phone</span>
              )}
            </p>
            <a
              href={`mailto:${teacher?.email}`}
              className="text-sm flex items-center justify-start gap-1 hover:underline hover:text-primary"
            >
              <IconMail className="size-4" />
              {teacher?.email}
            </a>
          </div>
        </div>
        <Button variant={"outline"}>
          <IconMessage />
          Send Message
        </Button>
      </CardContent>
    </Card>
  );
};
