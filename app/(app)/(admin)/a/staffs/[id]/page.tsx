"use client";
import React, { useEffect, useState } from "react";
import {
  IconBooks,
  IconEdit,
  IconPlus,
  IconTrash,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons-react";
import { Loader } from "@/components/Loader";
import { schoolService } from "@/lib/school";
import { School, useAuth, User } from "@/store/useAuth";
import { PageHeader } from "@/components/PageHeader";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Class } from "../../classes/page";
import { StaffProfile } from "../_components/StaffProfile";
import { StaffContactInformation } from "../_components/StaffContactInformation";
import { StaffPerformance } from "../_components/StaffPerformance";

export interface ExtendedUser extends NonNullable<User> {
  Teacher?: {
    classes: Class[];
    assignments: {
      id: true;
      Subject: {
        name: string;
        department: string;
      };
    }[];
  };
}

const page = () => {
  const { user } = useAuth();

  const { id } = useParams();

  const [staff, setStaff] = useState<ExtendedUser>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user || !user.school?.schoolID || !id) return;

      try {
        const staff = await schoolService.getSchoolStaff(
          user?.school?.schoolID!,
          id!
        );
        setStaff(staff);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user, id]);

  if (loading || !staff) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Staff Details`}
        description={`Complete information about the ${staff.firstName} ${staff.lastName}`}
        destructiveCTA={{
          label: "Delete",
          slug: ``,
          icon: IconTrash,
        }}
        secondaryCTA={{
          label: "Edit",
          slug: `/a/staffs/${staff?.id}/edit`,
          icon: IconEdit,
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="grid gap-4 col-span-1 lg:col-span-3">
          <StaffProfile
            firstName={staff.firstName}
            lastName={staff.lastName}
            email={staff.email}
            employeeID={staff.employeeID}
            role={staff.role}
            image={staff.image}
            title={staff.title}
            dob={staff.dob}
            joinedDate={staff.createdAt}
          />
          <StaffContactInformation
            email={staff.email}
            phoneNumber={staff.phoneNumber}
            address={`${staff.address}, ${staff.city}, ${staff.state}, ${staff.country}`}
            emergencyContactName={staff.emergencyContactName}
            emergencyPhoneNumber={staff.emergencyPhoneNumber}
          />
          <StaffPerformance />
        </div>
      </div>
    </div>
  );
};

export default page;
