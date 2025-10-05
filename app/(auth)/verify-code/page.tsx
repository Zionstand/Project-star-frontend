import React from "react";
import { VerifyCodeForm } from "../_components/VerifyCodeForm";
import { Metadata } from "next";
import { FullLogo } from "../_components/Logo";

export const metadata: Metadata = {
  title: "Verify Code | Lagelu Grammar School",
};

type SearchParams = Promise<{
  email: string;
}>;

const page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { email } = await searchParams;
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <FullLogo />
      </div>
      <VerifyCodeForm email={email} />
    </div>
  );
};

export default page;
