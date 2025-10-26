"use client";
import { Loader } from "@/components/Loader";
import { schoolService } from "@/lib/school";
import { useAuth, User } from "@/store/useAuth";
import React, { useEffect, useState } from "react";
import { Class } from "../../classes/page";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { AssignTeacherForm } from "../_components/AssignTeacherForm";
import { Subject } from "../../subjects/page";

const page = () => {
  const { user } = useAuth();

  const [teachers, setTeachers] = useState<User[]>();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Class[]>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [teachers, classes, subjects] = await Promise.all([
          schoolService.getSchoolTeachers(user?.schoolId!),
          schoolService.getSchoolClasses(user?.school?.schoolID!),
          schoolService.getSchoolSubjects(user?.school?.schoolID!),
        ]);

        setTeachers(teachers);
        setClasses(classes);
        setSubjects(subjects);
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
        title="Assign Teacher"
        description="Assign a teacher to a class or subject"
      />
      <AssignTeacherForm
        teachers={teachers}
        classes={classes}
        subjects={subjects}
      />
    </div>
  );
};

export default page;
