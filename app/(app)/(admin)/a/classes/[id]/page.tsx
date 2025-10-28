"use client";
import React, { useEffect, useState } from "react";
import {
  IconBooks,
  IconEdit,
  IconPlus,
  IconTrash,
  IconUsers,
} from "@tabler/icons-react";
import { Loader } from "@/components/Loader";
import { schoolService } from "@/lib/school";
import { School, useAuth, User } from "@/store/useAuth";
import { PageHeader } from "@/components/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ClassDetailsCards } from "../_components/ClassDetailsCard";
import { ClassTeacherBox } from "../_components/ClassTeacherBox";
import { ClassInformationBox } from "../_components/ClassInformationBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ClassStudents } from "../_components/ClassStudents";
import { ClassSubjects } from "../_components/ClassSubjects";

export type Class = {
  level: string;
  section: string;
  description?: string;
  capacity: string;
  classRoomNumber?: string;

  school: School;
  Teacher: {
    user: User;
  };

  id: string;
};

const page = () => {
  const { user } = useAuth();

  const { id } = useParams();

  const [classDetails, setClassDetails] = useState<Class>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user || !user.school?.schoolID || !id) return;

      try {
        const classDetails = await schoolService.getSchoolClassDetails(
          user?.school?.schoolID!,
          id!
        );
        setClassDetails(classDetails);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user, id]);

  if (loading || !classDetails) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${classDetails?.level}${classDetails?.section}`}
        description={`Academic Year ${user?.school?.currentSession}`}
        primaryCTA={{
          label: "Delete",
          slug: ``,
          icon: IconTrash,
        }}
        secondaryCTA={{
          label: "Edit class",
          slug: `/a/classes/${classDetails?.id}/edit`,
          icon: IconEdit,
        }}
      />
      <ClassDetailsCards />
      <ClassTeacherBox
        teacher={
          classDetails.Teacher !== null ? classDetails.Teacher.user : null
        }
      />
      <ClassInformationBox
        location={classDetails.classRoomNumber}
        academicYear={user?.school?.currentSession}
        capacity={classDetails.capacity}
      />
      <Tabs defaultValue="students">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="students">
              <IconUsers
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Students (42)
            </TabsTrigger>
            <TabsTrigger value="subjects">
              <IconBooks
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Subjects (12)
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="students">
          <ClassStudents />
        </TabsContent>
        <TabsContent value="subjects">
          <ClassSubjects />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
