"use client";
import { configService } from "@/lib/configs";
import { FullLogo } from "@/app/(auth)/_components/Logo";
import { OnboardingStaffForm } from "../../_components/OnboardingStaffForm";
import api from "@/lib/api";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import { School } from "@/store/useAuth";
import { Loader } from "@/components/Loader";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [jobRoles, setJobRoles] = useState<any>();
  const [states, setStates] = useState<any>();
  const [countries, setCountries] = useState<any>();
  const [school, setSchool] = useState<School>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [jobRoles, countries, states, school] = await Promise.all([
          configService.getCategory("JOB_ROLE"),
          configService.getCategory("COUNTRY"),
          configService.getCategory("STATE"),
          schoolService.getSchool(id!),
        ]);

        setJobRoles(jobRoles);
        setStates(states);

        setCountries(countries);
        setSchool(school);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
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
        schoolID={school?.id}
        acronym={school.acronym!}
      />
    </div>
  );
};

export default page;
