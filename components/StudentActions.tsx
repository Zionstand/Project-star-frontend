import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconMessage,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";

interface Props {
  username: string;
}

export const StudentActions = ({ username }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant={"secondary"}>
          <IconDotsVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/a/students/${username}`}>
            <IconEye />
            View Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconEdit />
          Edit Student
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconMessage />
          Send Message
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">
          <IconTrash />
          Remove Student
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
