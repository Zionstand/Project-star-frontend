import React from "react";
import { Metadata } from "next";
import { NewPasswordForm } from "../_components/NewPasswordForm";

export const metadata: Metadata = {
  title: "Set new password | Lagelu Grammar School",
};

const page = () => {
  return (
    <div>
      <NewPasswordForm />
    </div>
  );
};

export default page;
