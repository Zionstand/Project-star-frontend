import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { IconDotsVertical } from "@tabler/icons-react";

export const StudentRow = () => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <UserProfilePicture />
          <div>
            <div className="font-medium">Tomiwa Adelae Ademola </div>
            <span className="text-muted-foreground mt-0.5 text-xs">
              tomiwaadelae@gmail.com
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>STU2025001</TableCell>
      <TableCell>JSS1</TableCell>
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
