"use client";
export const dynamic = "force-dynamic";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { School } from "@/store/useAuth";
import { configService } from "@/lib/configs";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { FullLogo } from "@/app/(auth)/_components/Logo";
import { OnboardingStaffForm } from "../../_components/OnboardingStaffForm";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [jobRoles, setJobRoles] = useState<any>();
  const [states, setStates] = useState<any>();
  const [countries, setCountries] = useState<any>();
  const [school, setSchool] = useState<School>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [jobRolesRes, countriesRes, statesRes, schoolRes] =
          await Promise.all([
            configService.getCategory("JOB_ROLE"),
            configService.getCategory("COUNTRY"),
            configService.getCategory("STATE"),
            schoolService.getSchool(id),
          ]);

        setJobRoles(jobRolesRes);
        setStates(statesRes);
        setCountries(countriesRes);
        setSchool(schoolRes);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (!school) return notFound();

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-center">
        <FullLogo
          name={school.name}
          acronym={school.acronym!}
          logo={school.logo!}
        />
      </div>
      <OnboardingStaffForm
        jobRoles={jobRoles.items}
        countries={countries.items}
        states={states.items}
        schoolID={school.schoolID!}
        acronym={school.acronym!}
      />
    </div>
  );
}
