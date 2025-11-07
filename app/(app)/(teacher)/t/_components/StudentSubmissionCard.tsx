import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatDate } from "@/lib/utils";
import { AssignmentSubmissions } from "@/store/useAuth";
import { IconAward, IconClock, IconEye, IconMail } from "@tabler/icons-react";
import React from "react";

interface Props {
  submission: AssignmentSubmissions;
}

export const StudentSubmissionCard = ({ submission }: Props) => {
  return (
    <Card>
      <CardContent className="flex flex-col 2xl:flex-row items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start justify-start gap-3 flex-1 min-w-0">
          <UserProfilePicture
            src={submission.Student.user?.image}
            alt={`${submission.Student.user?.firstName}'s picture`}
            size="sm"
          />
          <div className="space-y-1.5 w-full">
            <div>
              <p className="flex items-center justify-start gap-2 font-medium text-base flex-wrap">
                <span>
                  {submission.Student.user?.firstName}{" "}
                  {submission.Student.user?.lastName}
                </span>
                <Badge>{submission.status}</Badge>
              </p>
              <p className="text-xs md:text-sm text-muted-foreground break-words">
                {submission?.Student.admissionNumber}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs md:text-sm flex items-center justify-start gap-1">
                <IconClock className="size-4" />
                {formatDate(submission.submittedAt)}
              </p>
              <p className="text-muted-foreground flex items-center justify-start gap-1 text-sm w-full bg-muted rounded-md p-2 break-words whitespace-normal">
                <IconMail className="size-4" />
                {submission.comment}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row 2xl:justify-end gap-2 w-full 2xl:w-auto mt-2 2xl:mt-0">
          <Button
            className="flex-1 2xl:flex-none w-full 2xl:w-auto"
            variant="outline"
          >
            <IconEye />
            View
          </Button>
          <Button className="flex-1 2xl:flex-none w-full 2xl:w-auto">
            <IconAward />
            Grade
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
