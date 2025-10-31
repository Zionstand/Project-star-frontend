"use client";
import React, { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import { schoolService } from "@/lib/school";
import { useAuth, User } from "@/store/useAuth";
import { Loader } from "@/components/Loader";
import { TeachersCards } from "../_components/TeachersCard";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/Searchbar";
import { ExtendedUser, TeacherLists } from "./_components/TeacherLists";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const page = () => {
  const { user } = useAuth();
  const [teachers, setTeachers] = useState<ExtendedUser[]>([]);
  const [assignments, setAssignments] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [teachers, assignments] = await Promise.all([
          schoolService.getSchoolTeachers(user?.schoolId!),
          schoolService.getTeacherAssignments(user?.school?.schoolID!),
        ]);

        setTeachers(teachers);
        setAssignments(assignments);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teachers"
        description="Assign teachers to classes and subjects"
        primaryCTA={{
          label: "New Assignment",
          slug: "/a/teachers/new",
          icon: IconPlus,
        }}
      />
      <TeachersCards
        assignments={assignments?.length}
        teachers={teachers?.length!}
      />
      <Card>
        <CardContent className="space-y-4">
          <SearchBar />
          <TeacherLists teachers={teachers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
