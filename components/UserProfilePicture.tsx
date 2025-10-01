import { DEFAULT_PROFILE_IMAGE } from "@/constant";
import Image from "next/image";
import React from "react";

export const UserProfilePicture = () => {
  return (
    <Image
      src={DEFAULT_PROFILE_IMAGE}
      alt="Profile picture"
      width={1000}
      height={1000}
      className="rounded-full size-[45px] md:size-[55px] lg:size-[65px]"
    />
  );
};
