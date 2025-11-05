import { Metadata } from "next";
import { configService } from "@/lib/configs";
import { FullLogo } from "@/app/(auth)/_components/Logo";
import { schoolService } from "@/lib/school";
import { OnboardingStudentForm } from "../../_components/OnboardingStudentForm";

export const metadata: Metadata = {
  title: "EduManage Student Onboarding",
};

type SearchParams = Promise<{ id: string }>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { id } = await searchParams;

  try {
    const [countries, states, classLevels, departments] = await Promise.all([
      configService.getCategory("COUNTRY"),
      configService.getCategory("STATE"),
      configService.getCategory("CLASS_LEVEL"),
      configService.getCategory("SCHOOL_DEPARTMENT"),
    ]);

    const school = await schoolService.getSchool(id);

    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo name={school.name} acronym={school.acronym} />
        </div>
        <OnboardingStudentForm
          countries={countries.items}
          states={states.items}
          schoolID={id}
          acronym={school.acronym}
          classLevels={classLevels.items}
          departments={departments.items}
        />
      </div>
    );
  } catch (err) {
    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo />
        </div>
        <OnboardingStudentForm
          schoolID={""}
          countries={[]}
          states={[]}
          acronym={""}
          classLevels={[]}
          departments={[]}
        />
      </div>
    );
  }
};

export default page;
