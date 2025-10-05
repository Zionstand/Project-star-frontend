import React from "react";
import { ForgotPasswordForm } from "../_components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password | Lagelu Grammar School",
};

const page = () => {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  );
};

export default page;
