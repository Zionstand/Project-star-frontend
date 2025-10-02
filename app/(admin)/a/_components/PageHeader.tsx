import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description?: string;
  primaryCTA?: {
    label: string;
    slug: string;
    icon: any;
  };
  secondaryCTA?: {
    label: string;
    slug: string;
    icon: any;
  };
}

export const PageHeader = ({
  title,
  description,
  primaryCTA,
  secondaryCTA,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
      <div className="space-y-1">
        <h1 className="font-medium text-3xl lg:text-4xl">{title}</h1>
        <p className="text-sm md:text-base text-muted-foreground font-normal">
          {description}
        </p>
      </div>
      <div className="flex items-center justify-end gap-2 w-full md:w-auto">
        {secondaryCTA && (
          <Button className="flex-1 md:flex-auto" asChild variant={"outline"}>
            <Link href={secondaryCTA.slug}>
              <secondaryCTA.icon />
              {secondaryCTA.label}
            </Link>
          </Button>
        )}
        {primaryCTA && (
          <Button className="flex-1 md:flex-auto" asChild>
            <Link href={primaryCTA.slug}>
              <primaryCTA.icon />
              {primaryCTA.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
