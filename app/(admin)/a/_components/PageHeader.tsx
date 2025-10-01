import React from "react";

interface Props {
  title: string;
  description?: string;
}

export const PageHeader = ({ title, description }: Props) => {
  return (
    <div className="space-y-1">
      <h1 className="font-medium text-3xl lg:text-4xl">{title}</h1>
      <p className="text-sm md:text-base text-muted-foreground font-normal">
        {description}
      </p>
    </div>
  );
};
