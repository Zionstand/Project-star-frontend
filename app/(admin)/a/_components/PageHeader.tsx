import React from "react";

export const PageHeader = () => {
  return (
    <div className="space-y-1">
      <h1 className="font-medium text-3xl lg:text-4xl">Dashboard</h1>
      <p className="text-sm md:text-base text-muted-foreground font-normal">
        Welcome back! Here's what's happening at your school today.
      </p>
    </div>
  );
};
