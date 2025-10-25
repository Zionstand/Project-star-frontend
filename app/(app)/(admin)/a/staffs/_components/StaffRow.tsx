import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber, formatWord } from "@/lib/utils";
import { User } from "@/store/useAuth";
import { IconDotsVertical, IconPhone } from "@tabler/icons-react";

interface Props {
  staff: User;
}

export const StaffRow = ({ staff }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <UserProfilePicture src="" alt="" size="default" />
          <div>
            <div className="font-medium">
              {staff?.firstName} {staff?.lastName}{" "}
              <Badge variant={"outlinePurple"}>
                {formatWord[staff?.role!]}
              </Badge>
            </div>
            <a
              href={`mailto:${staff?.email}`}
              className="text-muted-foreground mt-0.5 text-xs hover:underline hover:text-primary"
            >
              {staff?.email}
            </a>
          </div>
        </div>
      </TableCell>
      <TableCell>EMP2025001</TableCell>
      <TableCell>Mathematics</TableCell>
      <TableCell>
        <a
          href={`tel:${staff?.phoneNumber}`}
          className="hover:underline hover:text-primary flex items-center justify-start"
        >
          <IconPhone className="inline-block size-5" />{" "}
          <span>
            {formatPhoneNumber(staff?.phoneNumber) || (
              <span className="italic ml-1">No phone</span>
            )}
          </span>
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
