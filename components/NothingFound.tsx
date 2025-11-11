import { IconTelescope } from "@tabler/icons-react";
import React from "react";

export const NothingFound = ({
  message = "Nothing found",
}: {
  message?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-2 text-center flex-col">
      <IconTelescope className="text-primary size-20" />
      <p className="text-base text-muted-foreground">{message}</p>
    </div>
  );
};
