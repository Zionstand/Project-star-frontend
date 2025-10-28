import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber, formatWord } from "@/lib/utils";
import { User } from "@/store/useAuth";
import { IconDotsVertical, IconPhone } from "@tabler/icons-react";
import { Class } from "../../classes/page";
import { StaffActions } from "./StaffActions";

export interface ExtendedUser extends NonNullable<User> {
  Teacher?: {
    classes: Class[];
    assignments: {
      id: true;
      Subject: {
        name: string;
        department: string;
      };
    }[];
  };
}

interface Props {
  staff: ExtendedUser | null;
}

export const StaffRow = ({ staff }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <UserProfilePicture src="" alt="" size="default" />
          <div>
            <div className="font-medium">
              {staff?.firstName} {staff?.lastName}
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
      <TableCell>
        <Badge variant={"outlinePurple"}>{formatWord[staff?.role!]}</Badge>
      </TableCell>
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
      <TableCell>
        {staff?.role === "TEACHER" && staff?.Teacher?.assignments && (
          <>
            {staff.Teacher.assignments.slice(0, 2).map((a, index) => (
              <Badge key={index} variant="secondary">
                {a.Subject.name}
              </Badge>
            ))}

            {staff.Teacher.assignments.length > 2 && (
              <Badge variant="secondary">
                +{staff.Teacher.assignments.length - 2}
              </Badge>
            )}
          </>
        )}
        {staff?.role === "ADMINISTRATOR" && "Administration"}
        {staff?.role === "PRINCIPAL" && "Administration"}
        {staff?.role === "BURSAR" && "Finances"}
        {staff?.role === "LIBRARIAN" && "Library Services"}
        {staff?.role === "COUNSELOR" && "Library Student Services"}
      </TableCell>
      <TableCell className="text-right">
        <StaffActions id={staff?.id} />
      </TableCell>
    </TableRow>
  );
};
