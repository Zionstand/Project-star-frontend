import { SearchBar } from "@/components/Searchbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/store/useAuth";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatPhoneNumber, formatWord } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { IconEdit, IconPhone, IconRestore } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

interface Props {
  users: User[];
}

export const UserRoles = ({ users }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User roles & managements</CardTitle>
        <CardDescription>
          View and manage roles for all users in the system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SearchBar />
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department/Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Date</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserProfilePicture src="" alt="" size="default" />
                      <div>
                        <div className="font-medium">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <a
                          href={`mailto:${user?.email}`}
                          className="text-muted-foreground mt-0.5 text-xs hover:underline hover:text-primary"
                        >
                          {user?.email}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`tel:${user?.phoneNumber}`}
                      className="hover:underline hover:text-primary flex items-center justify-start"
                    >
                      <IconPhone className="inline-block size-5" />{" "}
                      <span>
                        {formatPhoneNumber(user?.phoneNumber) || (
                          <span className="italic ml-1">No phone</span>
                        )}
                      </span>
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outlinePurple"}>
                      {formatWord[user?.role!]}
                    </Badge>
                  </TableCell>
                  <TableCell>Mathematics</TableCell>
                  <TableCell>
                    <Badge variant={"outlineSuccess"}>Active</Badge>
                  </TableCell>
                  <TableCell>
                    {/* {user?.role === "TEACHER" &&
                          user?.Teacher?.assignments && (
                            <>
                              {user.Teacher.assignments
                                .slice(0, 2)
                                .map((a, index) => (
                                  <Badge key={index} variant="secondary">
                                    {a.Subject.name}
                                  </Badge>
                                ))}

                              {user.Teacher.assignments.length > 2 && (
                                <Badge variant="secondary">
                                  +{user.Teacher.assignments.length - 2}
                                </Badge>
                              )}
                            </>
                          )} */}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant={"ghost"} size="icon">
                        <IconEdit />
                      </Button>
                      <Button variant={"ghost"} size="icon">
                        <IconRestore />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
