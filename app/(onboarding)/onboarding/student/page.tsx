"use client";
export const dynamic = "force-dynamic";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { configService } from "@/lib/configs";
import { schoolService } from "@/lib/school";
import { toast } from "sonner";
import { Loader } from "@/components/Loader";
import { FullLogo } from "@/app/(auth)/_components/Logo";
import { OnboardingStudentForm } from "../../_components/OnboardingStudentForm";
import { School } from "@/store/useAuth";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [classLevels, setClassLevels] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);
  const [states, setStates] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [school, setSchool] = useState<School>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [countries, states, classLevels, departments, school] =
          await Promise.all([
            configService.getCategory("COUNTRY"),
            configService.getCategory("STATE"),
            configService.getCategory("CLASS_LEVEL"),
            configService.getCategory("SCHOOL_DEPARTMENT"),
            schoolService.getSchool(id!),
          ]);

        setCountries(countries);
        setStates(states);
        setClassLevels(classLevels);
        setDepartments(departments);

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
      <OnboardingStudentForm
        countries={countries.items}
        states={states.items}
        schoolID={school?.schoolID!}
        acronym={school.acronym!}
        classLevels={classLevels.items}
        departments={departments.items}
      />
    </div>
  );
}
