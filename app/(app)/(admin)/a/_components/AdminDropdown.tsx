"use client";
import {
  BoltIcon,
  BookOpenIcon,
  ChevronDownIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_PROFILE_IMAGE } from "@/constant";
import { useSignout } from "@/hooks/use-signout";
import { useAuth } from "@/store/useAuth";
import { formatWord } from "@/lib/utils";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";

export function AdminDropdown() {
  const handleSignout = useSignout();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto p-0 hover:bg-transparent gap-4"
        >
          <Avatar>
            <AvatarImage
              src={user?.image || DEFAULT_PROFILE_IMAGE}
              alt={`${user?.firstName}'s picture` || ""}
            />
            <AvatarFallback>EMS</AvatarFallback>
          </Avatar>
          <div className="text-left hidden md:block">
            <p className="font-medium text-sm">
              {user?.title} {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs font-normal text-muted-foreground">
              {formatWord[user.role]}{" "}
              {user.role === "STUDENT" &&
                `- ${user.Student.desiredClass || "No class"}`}
            </p>
          </div>
          <ChevronDownIcon
            size={16}
            className="opacity-60"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="text-foreground truncate text-sm font-medium">
            {user?.title} {user?.firstName} {user?.lastName}
          </span>
          <span className="text-muted-foreground truncate text-xs font-normal">
            {formatWord[user.role]} - {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.username}`}>
              <IconUser size={16} className="opacity-60" aria-hidden="true" />
              <span>View profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignout}>
          <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
