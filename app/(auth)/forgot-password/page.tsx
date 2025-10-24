import React from "react";
import { ForgotPasswordForm } from "../_components/ForgotPasswordForm";
import { Metadata } from "next";
import { FullLogo } from "../_components/Logo";

export const metadata: Metadata = {
  title: "Forgot password | EduManage School Management",
};

const page = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <FullLogo />
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default page;
