"use client";
import React, { useEffect, useState } from "react";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { StudentCards } from "../_components/StudentCards";
import { StudentSearchComponent } from "../_components/StudentSearchComponent";
import { StudentsLists } from "./_components/StudentsLists";
import { PageHeader } from "@/components/PageHeader";
import { useAuth, User } from "@/store/useAuth";
import { schoolService } from "@/lib/school";
import { Loader } from "@/components/Loader";
import { toast } from "sonner";

const page = () => {
  const { user } = useAuth();

  const [students, setStudents] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.schoolId) return;

      try {
        const [students] = await Promise.all([
          schoolService.getStudents(user?.schoolId!),
        ]);

        setStudents(students);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Student Management"
        description="Manage student records and information"
        primaryCTA={{
          label: "Add Students",
          slug: "/a/students/new",
          icon: IconPlus,
        }}
      />
      <StudentCards students={students.length} />
      <StudentSearchComponent />
      <StudentsLists students={students} />
    </div>
  );
};

export default page;
