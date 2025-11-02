import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { User } from "@/store/useAuth";
import { IconDotsVertical } from "@tabler/icons-react";

interface Props {
  student: User;
}

export const StudentRow = ({ student }: Props) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <UserProfilePicture />
          <div>
            <div className="font-medium">
              {student?.firstName} {student?.lastName} {student?.otherName}
            </div>
            <a
              href={`mailto:${student?.email}`}
              className="hover:text-primary hover:underline text-muted-foreground mt-0.5 text-xs"
            >
              {student?.email}
            </a>
          </div>
        </div>
      </TableCell>
      <TableCell>STU2025001</TableCell>
      <TableCell>
        {student?.Student.Class.level}
        {student?.Student.Class.section}
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
