import React from "react";
import { IconBook, IconShield, IconUsers } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { FullLogo } from "../_components/Logo";
import { RegisterForm } from "../_components/RegisterForm";
import { configService } from "@/lib/configs";

export const metadata: Metadata = {
  title: "Lagelu Grammar School",
};

// const page = async () => {
//   const schoolTypes = await configService.getCategory("SCHOOL_TYPE");
//   const jobRoles = await configService.getCategory("JOB_ROLE");
//   const ownershipTypes = await configService.getCategory("OWNERSHIP_TYPE");
//   const countries = await configService.getCategory("COUNTRY");
//   const states = await configService.getCategory("STATE");

//   return (
//     <div className="space-y-4 w-full">
//       <div className="flex items-center justify-center">
//         <FullLogo />
//       </div>
//       <RegisterForm
//         schoolTypes={schoolTypes.items}
//         jobRoles={jobRoles.items}
//         ownershipTypes={ownershipTypes.items}
//         countries={countries.items}
//         states={states.items}
//       />
//     </div>
//   );
// };

// export default page;

const page = async () => {
  try {
    const [schoolTypes, jobRoles, ownershipTypes, countries, states] =
      await Promise.all([
        configService.getCategory("SCHOOL_TYPE"),
        configService.getCategory("JOB_ROLE"),
        configService.getCategory("OWNERSHIP_TYPE"),
        configService.getCategory("COUNTRY"),
        configService.getCategory("STATE"),
      ]);

    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo />
        </div>
        <RegisterForm
          schoolTypes={schoolTypes.items}
          jobRoles={jobRoles.items}
          ownershipTypes={ownershipTypes.items}
          countries={countries.items}
          states={states.items}
        />
      </div>
    );
  } catch (err) {
    console.error("Error fetching categories:", err);

    // fallback empty data so build won't fail
    return (
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-center">
          <FullLogo />
        </div>
        <RegisterForm
          schoolTypes={[]}
          jobRoles={[]}
          ownershipTypes={[]}
          countries={[]}
          states={[]}
        />
      </div>
    );
  }
};
