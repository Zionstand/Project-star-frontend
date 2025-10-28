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

const page = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      if (!user?.schoolId) return;

      try {
        const [users] = await Promise.all([
          schoolService.getSchoolUsers(user?.schoolId!),
        ]);

        setUsers(users);
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
        title="Roles & Permissions"
        description="Manage user roles, permissions, and access control for the school system"
      />
      <RolesCards />
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
          <UserRoles users={users} />
        </TabsContent>
        <TabsContent value="roles">
          <RolesDefinitions />
        </TabsContent>
        <TabsContent value="permissions">
          <Permissions />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
