"use client";
import { AccountPendingModal } from "@/components/AccountPendingModal";
import { Assignment, useAuth } from "@/store/useAuth";
import React, { useEffect, useState } from "react";
import { RejectedApprovalBanner } from "../_components/RejectedApprovalBanner";
import { PageHeader } from "@/components/PageHeader";
import { AssignmentsCards } from "../_components/AssignmentsCards";
import { studentService } from "@/lib/student";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";
import { SearchBar } from "@/components/Searchbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AssignmentCard } from "../_components/AssignmentCard";

const page = () => {
  const { user } = useAuth();

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.schoolId) return;

      try {
        const [assignments] = await Promise.all([
          studentService.getStudentAssignments(user?.school?.id!, user.id),
        ]);

        setAssignments(assignments);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  if (loading) return <Loader />;

  console.log(assignments);

  return (
    <div className="space-y-6">
      {user?.Student.applicationStatus === "pending" && <AccountPendingModal />}
      {user?.Student.applicationStatus === "rejected" && (
        <RejectedApprovalBanner reasons={user.Student.rejectionReason} />
      )}
      <PageHeader
        title="My Assignments"
        description="View and submit your assignments"
      />
      <AssignmentsCards total={assignments.length} />
      <SearchBar placeholder="Search assignments..." />
      <Tabs defaultValue="all">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="submitted">Submitted</TabsTrigger>
            <TabsTrigger value="graded">Graded</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="all" className="space-y-4 mt-6">
          {assignments.map((document) => (
            <AssignmentCard key={document.id} assignment={document} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6"></TabsContent>

        <TabsContent value="submitted" className="space-y-4 mt-6"></TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
