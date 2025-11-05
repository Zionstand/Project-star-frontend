"use client";
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StudentApprovalCards } from "../../_components/StudentApprovalCards";
import { StudentSearchComponent } from "../../_components/StudentSearchComponent";
import { useAuth, User } from "@/store/useAuth";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { ApprovalStudentBox } from "./_components/ApprovalStudentBox";

const page = () => {
  const { user } = useAuth();

  const [students, setStudents] = useState<User[]>([]);
  const [allStudents, setAllStudents] = useState<User[]>([]); // ✅ merged list
  const [rejectedStudents, setRejectedStudents] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.schoolId) return;

      try {
        const [students, rejectedStudents] = await Promise.all([
          schoolService.getStudentsPendingApproval(user?.schoolId!),
          schoolService.getRejectedStudentsApproval(user?.schoolId!),
        ]);

        setRejectedStudents(rejectedStudents);
        setStudents(students);
        setAllStudents([...students, ...rejectedStudents]);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  const handleStudentStatusChange = (
    id: string,
    status: "approved" | "rejected"
  ) => {
    if (status === "approved") {
      // Remove approved student completely
      setStudents((prev) => prev.filter((s: any) => s.id !== id));
      setAllStudents((prev) => prev.filter((s: any) => s.id !== id));
    } else if (status === "rejected") {
      // Update student’s status in place
      setAllStudents((prev) =>
        prev.map((s: any) =>
          s.id === id
            ? {
                ...s,
                Student: {
                  ...s.Student,
                  isRejected: true,
                  isApproved: false,
                },
              }
            : s
        )
      );

      setRejectedStudents((prev) => {
        const alreadyInList = prev.some((r: any) => r.id === id);
        if (alreadyInList) return prev; // avoid duplicates
        const student = allStudents.find((s: any) => s.id === id);
        return student ? [...prev, student] : prev;
      });
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="space-y-6">
      <PageHeader
        title={"Student Approvals"}
        description={"Review and approve student enrollment requests"}
      />
      <StudentApprovalCards
        students={students.length}
        rejectedStudents={rejectedStudents.length}
      />
      <StudentSearchComponent />
      <div className="space-y-4">
        {allStudents.map((student) => (
          <ApprovalStudentBox
            key={student?.id}
            student={student}
            onStudentStatusChange={handleStudentStatusChange}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
