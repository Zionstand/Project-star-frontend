"use client";
import { Class, useAuth } from "@/store/useAuth";
import React, { useEffect, useState } from "react";
import { PendingApprovalBanner } from "../_components/PendingApprovalBanner";
import { StudentDashboardCard } from "../_components/StudentDashboardCard";
import { ApplicationProgress } from "../_components/ApplicationProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  IconBrandStackoverflow,
  IconFileDescription,
  IconUser,
} from "@tabler/icons-react";
import { DashboardOverview } from "../_components/DashboardOverview";
import { DashboardDocuments } from "../_components/DashboardDocuments";
import { DashboardPersonalInformationForm } from "../_components/DashboardPersonalInformationForm";
import { configService } from "@/lib/configs";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { DashboardParentInformationForm } from "../_components/DashboardParentInformationForm";
import { DashboardEducationInformationForm } from "../_components/DashboardEducationInformationForm";
import { RejectedApprovalBanner } from "../_components/RejectedApprovalBanner";

const page = () => {
  const { user } = useAuth();

  const [states, setStates] = useState<any>();
  const [classes, setClasses] = useState<Class[]>([]);
  const [countries, setCountries] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [timelines, setTimelines] = useState<any[]>([]);
  const [classLevels, setClassLevels] = useState<any>([]);
  const [documents, setDocuments] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const refreshDocuments = async () => {
    if (!user) return;
    try {
      const [documents, timelines] = await Promise.all([
        schoolService.getStudentDocuments(user.id, user?.schoolId!),
        schoolService.getStudentTimelines(user.id, user?.schoolId!),
      ]);

      setDocuments(documents);
      setTimelines(timelines);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to refresh documents"
      );
    }
  };

  useEffect(() => {
    const fetchConfigs = async () => {
      if (!user) return;
      try {
        const [
          states,
          classes,
          countries,
          departments,
          classLevels,
          documents,
          timelines,
        ] = await Promise.all([
          configService.getCategory("STATE"),
          schoolService.getSchoolClasses(user?.school?.schoolID!),
          configService.getCategory("COUNTRY"),
          configService.getCategory("SCHOOL_DEPARTMENT"),
          configService.getCategory("CLASS_LEVEL"),
          schoolService.getStudentDocuments(user.id, user?.schoolId!),
          schoolService.getStudentTimelines(user.id, user?.schoolId!), // 👈 NEW
        ]);

        setStates(states);
        setClasses(classes);
        setCountries(countries);
        setDepartments(departments);
        setClassLevels(classLevels);
        setDocuments(documents);
        setTimelines(timelines); // 👈 store timeline
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConfigs();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {user?.Student.applicationStatus === "pending" && (
        <PendingApprovalBanner />
      )}
      {user?.Student.applicationStatus === "rejected" && (
        <RejectedApprovalBanner reasons={user.Student.rejectionReason} />
      )}
      <StudentDashboardCard
        firstName={user?.firstName}
        lastName={user?.lastName}
        desiredClass={user?.Student.desiredClass}
        appliedDate={user?.createdAt}
        email={user?.email}
        image={user?.image}
        candidateNumber={user?.Student.candidateNumber}
        applicationStatus={user?.Student.applicationStatus}
      />
      <ApplicationProgress documents={documents} />
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <ScrollArea>
          <TabsList className="mb-3 w-full">
            <TabsTrigger value="overview">
              <IconBrandStackoverflow
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Overview
            </TabsTrigger>
            <TabsTrigger value="documents" className="group">
              <IconFileDescription
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              Documents
            </TabsTrigger>
            <TabsTrigger value="profile" className="group">
              <IconUser
                className="-ms-0.5 me-1.5 opacity-60"
                size={16}
                aria-hidden="true"
              />
              My Profile
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="overview">
          <DashboardOverview
            timelines={timelines}
            documents={documents}
            onTabChange={setActiveTab}
          />
        </TabsContent>
        <TabsContent value="documents">
          <DashboardDocuments
            documents={documents}
            onRefresh={refreshDocuments}
          />
        </TabsContent>
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <DashboardPersonalInformationForm
                states={states.items}
                classes={classes}
                countries={countries.items}
                departments={departments.items}
              />
            </div>
            <div className="grid gap-4">
              <div>
                <DashboardEducationInformationForm
                  departments={departments.items}
                  classLevels={classLevels.items}
                />
                <DashboardParentInformationForm
                  states={states.items}
                  classes={classes}
                  countries={countries.items}
                  departments={departments.items}
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
