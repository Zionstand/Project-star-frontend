import { Metadata } from "next";
import { configService } from "@/lib/configs";
import { FullLogo } from "@/app/(auth)/_components/Logo";
import { OnboardingStaffForm } from "../../_components/OnboardingStaffForm";
import api from "@/lib/api";
import { schoolService } from "@/lib/school";

export const metadata: Metadata = {
  title: "EduManage School Management",
};

type SearchParams = Promise<{
  id: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { id } = await searchParams;

  try {
    const [jobRoles, countries, states, school] = await Promise.all([
      configService.getCategory("JOB_ROLE"),
      configService.getCategory("COUNTRY"),
      configService.getCategory("STATE"),
      schoolService.getSchool(id),
    ]);

    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo
            name={school.name}
            acronym={school.acronym}
            logo={school.logo}
          />
        </div>
        <OnboardingStaffForm
          jobRoles={jobRoles.items}
          countries={countries.items}
          states={states.items}
          schoolID={id}
          acronym={school.acronym}
        />
      </div>
    );
  } catch (err) {
    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo />
        </div>
        <OnboardingStaffForm
          schoolID={""}
          jobRoles={[]}
          countries={[]}
          states={[]}
          acronym={""}
        />
      </div>
    );
  }
};

export default page;
