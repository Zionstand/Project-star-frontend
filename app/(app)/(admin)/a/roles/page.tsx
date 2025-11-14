"use client";
import { PageHeader } from "@/components/PageHeader";
import React, { useEffect, useState } from "react";
import { RolesCards } from "../_components/RolesCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  IconLock,
  IconUserCheck,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import { UserRoles } from "./_components/UserRoles";
import { useAuth, User } from "@/store/useAuth";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { RolesDefinitions } from "./_components/RolesDefinitions";
import { Permissions } from "./_components/Permissions";
import { configService } from "@/lib/configs";

const page = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [parents, setParents] = useState<User[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [jobRoles, setJobRoles] = useState<any>([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [users, teachers, parents, students, admins, jobRoles] =
          await Promise.all([
            schoolService.getSchoolUsers(user?.schoolId!),
            schoolService.getSchoolTeachers(user?.schoolId!),
            schoolService.getSchoolParents(user?.schoolId!),
            schoolService.getStudents(user?.schoolId!),
            schoolService.getSchoolAdmins(user?.schoolId!),
            configService.getCategory("JOB_ROLE"),
          ]);

        setUsers(users);
        setTeachers(teachers);
        setParents(parents);
        setStudents(students);
        setAdmins(admins);
        setJobRoles(jobRoles);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
  }, [user]);

  const handleRefresh = async () => {
    if (!user?.schoolId) return;

    try {
      const [users, teachers, parents, students, admins, jobRoles] =
        await Promise.all([
          schoolService.getSchoolUsers(user?.schoolId!),
          schoolService.getSchoolTeachers(user?.schoolId!),
          schoolService.getSchoolParents(user?.schoolId!),
          schoolService.getStudents(user?.schoolId!),
          schoolService.getSchoolAdmins(user?.schoolId!),
          configService.getCategory("JOB_ROLE"),
        ]);

      setUsers(users);
      setTeachers(teachers);
      setParents(parents);
      setStudents(students);
      setAdmins(admins);
      setJobRoles(jobRoles);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Roles & Permissions"
        description="Manage user roles, permissions, and access control for the school system"
      />
      <RolesCards total={users.length} />
      <Tabs defaultValue="users">
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="users">
              <IconUsersGroup
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Users & Roles
            </TabsTrigger>
            <TabsTrigger value="roles" className="group">
              <IconUserCheck
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Roles Definitions
            </TabsTrigger>
            <TabsTrigger value="permissions" className="group">
              <IconLock
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Permissions
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="users">
          <UserRoles
            users={users}
            onRefresh={() => handleRefresh()}
            jobRoles={jobRoles.items}
          />
        </TabsContent>
        <TabsContent value="roles">
          <RolesDefinitions
            teachers={teachers.length}
            students={students.length}
            admins={admins.length}
            parents={parents.length}
          />
        </TabsContent>
        <TabsContent value="permissions">
          <Permissions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
