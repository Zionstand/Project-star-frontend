import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { IconDotsVertical, IconPhone } from "@tabler/icons-react";

export const StaffRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <UserProfilePicture />
          <div>
            <div className="font-medium">
              Tomiwa Adelae <Badge variant={"outlinePurple"}>Principal</Badge>
            </div>
            <a
              href=""
              className="text-muted-foreground mt-0.5 text-xs hover:underline hover:text-primary"
            >
              tomiwaadelae@gmail.com
            </a>
          </div>
        </div>
      </TableCell>
      <TableCell>EMP2025001</TableCell>
      <TableCell>Mathematics</TableCell>
      <TableCell>
        <a
          href="tel:"
          className="hover:underline hover:text-primary flex items-center justify-start"
        >
          <IconPhone className="inline-block size-5" />{" "}
          <span>+234 802 787 6666</span>
        </a>
      </TableCell>
      <TableCell>
        <Badge variant={"outlineSuccess"}>Active</Badge>
      </TableCell>
      <TableCell className="text-right">
        <Button size="icon" variant={"secondary"}>
          <IconDotsVertical />
        </Button>
      </TableCell>
    </TableRow>
  );
};
