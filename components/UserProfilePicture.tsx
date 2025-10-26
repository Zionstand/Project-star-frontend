import { DEFAULT_PROFILE_IMAGE } from "@/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  src?: string | undefined | null;
  alt?: string;
  size?: "sm" | "default" | "lg";
}

export const UserProfilePicture = ({
  src,
  alt = "Profile picture",
  size = "default",
}: Props) => {
  return (
    <Image
      src={src || DEFAULT_PROFILE_IMAGE}
      alt={alt}
      width={1000}
      height={1000}
      className={cn(
        "rounded-full size-[45px] md:size-[55px] lg:size-[65px]",
        size === "sm" && "size-[25px] md:size-[35px] lg:size-[45px]",
        size === "lg" && "size-[100px] md:size-[120px] lg:size-[150px]"
      )}
    />
  );
};
