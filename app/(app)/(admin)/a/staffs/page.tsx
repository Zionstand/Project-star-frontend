"use client";
import React, { useEffect, useState } from "react";
import { StaffCards } from "../_components/StaffCards";
import { PageHeader } from "../../../../../components/PageHeader";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { StaffsLists } from "./_components/StaffsLists";
import { StaffSearchComponent } from "../_components/StaffSearchComponent";
import { schoolService } from "@/lib/school";
import { useAuth, User } from "@/store/useAuth";
import { Loader } from "@/components/Loader";

const page = () => {
  const { user } = useAuth();
  const [staffs, setStaffs] = useState<User[]>();
  const [teachers, setTeachers] = useState<User[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [staffs, teachers] = await Promise.all([
          schoolService.getSchoolStaffs(user?.schoolId!),
          schoolService.getSchoolTeachers(user?.schoolId!),
        ]);

        setStaffs(staffs);
        setTeachers(teachers);
      } catch (error) {
        console.log(error);
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
        title="Staff Management"
        description="Manage staff members and their information"
        primaryCTA={{
          label: "Add Staff member",
          slug: "/a/staffs/new",
          icon: IconPlus,
        }}
        secondaryCTA={{
          label: "Export",
          slug: "/a/staff/new",
          icon: IconDownload,
        }}
      />
      <StaffCards
        teachers={teachers?.length!}
        total={staffs?.length!}
        onLeave={0}
        active={staffs?.length!}
      />
      <StaffSearchComponent />
      <StaffsLists staffs={staffs} />
    </div>
  );
};

export default page;
