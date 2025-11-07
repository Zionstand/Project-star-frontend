import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Assignment, useAuth } from "@/store/useAuth";
import {
  IconCalendar,
  IconCheck,
  IconClock,
  IconEye,
  IconFileDescription,
  IconFileText,
  IconUpload,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface Props {
  assignment: Assignment;
}

export const AssignmentCard = ({ assignment }: Props) => {
  const { user } = useAuth();
  const studentId = user?.Student?.id;
  const hasSubmitted = assignment.assignmentSubmissions?.some(
    (submission) => submission.studentId === studentId
  );
  const submission = assignment.assignmentSubmissions?.find(
    (s) => s.studentId === studentId
  );
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="">
        <div className="flex flex-col lg:flex-row items-start gap-4 justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div className={`p-3 rounded-lg bg-primary/10`}>
              <IconFileText className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1 space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link
                    href={`/s/assignments/${assignment.slug || assignment.id}`}
                    className="font-semibold text-lg line-clamp-1 hover:underline hover:text-primary"
                  >
                    {assignment.title}
                  </Link>
                  <Badge
                    variant={
                      assignment.type === "ASSIGNMENT"
                        ? "outlinePrimary"
                        : assignment.type === "HOMEWORK"
                        ? "outlineSuccess"
                        : "outlinePurple"
                    }
                    className="text-xs"
                  >
                    {assignment.type}
                  </Badge>
                  {/* Submission status badge */}
                  {hasSubmitted ? (
                    <Badge variant="default" className="text-xs">
                      Submitted
                    </Badge>
                  ) : (
                    <Badge variant="pending" className="text-xs">
                      Pending
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {assignment.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <IconFileDescription className="w-4 h-4" />
                  <span>{assignment.subject.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCalendar className="w-4 h-4" />
                  <span>Assigned: {formatDate(assignment.createdAt)}</span>
                </div>
                <div className="flex text-red-600 items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  <span>Due: {formatDate(assignment.dueDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconClock className="w-4 h-4" />
                  <span>
                    Teacher: {assignment.Teacher.user?.title}{" "}
                    {assignment.Teacher.user?.firstName}{" "}
                    {assignment.Teacher.user?.lastName}
                  </span>
                </div>
                {hasSubmitted && (
                  <div className="hidden md:flex items-center gap-2 text-green-500">
                    <IconClock className="w-4 h-4" />
                    <span>
                      Submitted on: {formatDate(submission?.submittedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto">
            <Button
              variant="outline"
              asChild
              className="w-full lg:w-auto hover:bg-gray-100"
            >
              <Link href={`/s/assignments/${assignment.slug || assignment.id}`}>
                <IconEye className="w-4 h-4" /> <span>View</span>
              </Link>
            </Button>
            {hasSubmitted ? (
              <Button disabled className="w-full lg:w-auto cursor-not-allowed">
                <IconCheck className="w-4 h-4" /> <span>Submitted</span>
              </Button>
            ) : (
              <Button className="w-full lg:w-auto" asChild>
                <Link
                  href={`/s/assignments/${
                    assignment.slug || assignment.id
                  }?submit=true`}
                >
                  <IconUpload className="w-4 h-4" /> <span>Submit</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
        {/* Optional small note for submitted ones */}
        {hasSubmitted && (
          <div className="mt-3 text-xs text-muted-foreground text-center md:hidden">
            Submitted on {formatDate(submission?.submittedAt)} —{" "}
            <span className="capitalize">
              {submission?.status.toLowerCase()}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
