import React from "react";
import { VerifyCodeForm } from "../_components/VerifyCodeForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Code | Lagelu Grammar School",
};

const page = () => {
  return (
    <div>
      <VerifyCodeForm />
    </div>
  );
};

export default page;
