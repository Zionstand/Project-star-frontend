"use client";
import { Loader } from "@/components/Loader";
import { StudentRejectionModal } from "@/components/StudentRejectionModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import api from "@/lib/api";
import { formatDate, formatPhoneNumber } from "@/lib/utils";
import { useAuth, User } from "@/store/useAuth";
import { IconBan, IconCheck, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  student: User;
  onStudentStatusChange: (
    id: string,
    type: "approved" | "rejected",
    student?: User
  ) => void;
}

export const ApprovalStudentBox = ({
  student,
  onStudentStatusChange,
}: Props) => {
  const { user } = useAuth();

  const [isVisible, setIsVisible] = useState(true); // ✅ fade control
  const [pendingApprove, startApproveTransition] = useTransition();
  const [pendingReject, startRejectTransition] = useTransition();
  const [studentRejectModalOpen, setStudentRejectModalOpen] = useState(false);

  const handleApprove = () => {
    startApproveTransition(async () => {
      try {
        const res = await api.post(
          `/students/${user?.schoolId}/approval/${student?.id}`
        );

        toast.success(res.data.message);
        setIsVisible(false);

        onStudentStatusChange(student?.id!, "approved");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    });
  };

  const handleReject = () => {
    startRejectTransition(async () => {
      try {
        const res = await api.post(
          `/students/${user?.schoolId}/rejection/${student?.id}`
        );

        toast.success(res.data.message);
        // ✅ fade away then remove
        setIsVisible(false);
        onStudentStatusChange(student?.id!, "rejected");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred");
      }
    });
  };

  return (
    isVisible && (
      <Card>
        <CardContent className="flex flex-col lg:flex-row items-start justify-start gap-4">
          <div className="flex-3 flex items-start justify-start gap-3 w-full">
            <UserProfilePicture
              src={student?.image}
              alt={`${student?.firstName}'s picture`}
            />
            <div className="w-full">
              <h3 className="font-medium text-base">
                {student?.firstName} {student?.lastName} {student?.otherName} {}
                <Badge
                  variant={
                    student?.Student.isApproved
                      ? "default"
                      : student?.Student.isRejected
                      ? "destructive"
                      : "pending"
                  }
                >
                  {student?.Student.isApproved
                    ? "Approved"
                    : student?.Student.isRejected
                    ? "Rejected"
                    : "Pending"}
                </Badge>
              </h3>
              <div className="text-muted-foreground text-sm w-full">
                <a
                  className="hover:text-primary hover:underline transition-all"
                  href={`mailto:${student?.email}`}
                >
                  {student?.email}
                </a>
                <p>Applied for {student?.Student.desiredClass || "No class"}</p>
                <div className="mt-4 space-y-4 md:grid grid-cols-1 md:grid-cols-2 w-full hidden">
                  <div className="space-y-0.5">
                    <p className="font-medium">Student Phone:</p>
                    {student?.phoneNumber ? (
                      <a
                        className="hover:text-primary hover:underline transition-all"
                        href={`tel:${student?.phoneNumber}`}
                      >
                        {formatPhoneNumber(student?.phoneNumber)}
                      </a>
                    ) : (
                      <span className="italic">No phone</span>
                    )}
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium">Previous school:</p>
                    <p>
                      {student?.Student.previousSchool || (
                        <span className="italic">Not provided</span>
                      )}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium">Parent/Guardian:</p>
                    <p>
                      {" "}
                      {
                        student?.Student.ParentStudentLink[0].parent.user
                          ?.firstName
                      }{" "}
                      {
                        student?.Student.ParentStudentLink[0].parent.user
                          ?.lastName
                      }{" "}
                      ({student?.Student.ParentStudentLink[0].relation})
                    </p>
                    <a
                      className="hover:text-primary hover:underline transition-all"
                      href={`tel:${student?.Student.ParentStudentLink[0].parent.user?.phoneNumber}`}
                    >
                      {formatPhoneNumber(
                        student?.Student.ParentStudentLink[0].parent.user
                          ?.phoneNumber
                      )}
                    </a>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium">Date of Birth:</p>
                    <p>{formatDate(student?.dob)}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium">Address:</p>
                    <p>
                      {student?.address}, {student?.city}, {student?.state},{" "}
                      {student?.country}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-medium">Application Date:</p>
                    <p>{formatDate(student?.createdAt)}</p>{" "}
                  </div>
                  <div className="space-y-0.5 col-span-2">
                    <p className="font-medium">Documents Submitted:</p>
                    <div className="flex gap-2 overflow-x-auto whitespace-nowrap p-1 custom-scroll">
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                      <Badge variant={"secondary"}>Birth certificate</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full grid grid-cols-3 lg:grid-cols-1 gap-2">
            <Button disabled={pendingApprove} asChild>
              <Link href={`/a/students/approval/${student?.username}`}>
                <IconEye />
                Review
              </Link>
            </Button>
            <Button
              disabled={pendingApprove}
              variant={"success"}
              onClick={handleApprove}
            >
              {pendingApprove ? (
                <Loader text="Approving..." />
              ) : (
                <>
                  <IconCheck />
                  Approve
                </>
              )}
            </Button>
            <Button
              disabled={pendingReject || student?.Student.isRejected}
              onClick={() => setStudentRejectModalOpen(true)}
              variant={"outlineDestructive"}
            >
              {pendingReject ? (
                <Loader text="Rejecting..." />
              ) : (
                <>
                  <IconBan />
                  Reject
                </>
              )}
            </Button>
          </div>
        </CardContent>
        {studentRejectModalOpen && (
          <StudentRejectionModal
            open={studentRejectModalOpen}
            onClose={() => {
              setStudentRejectModalOpen(false);
              setIsVisible(false);
            }}
            student={student}
          />
        )}
      </Card>
    )
  );
};
