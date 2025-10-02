import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import { formatDate } from "@/lib/utils";
import { IconBan, IconCheck } from "@tabler/icons-react";
import React from "react";

export const ApprovalStudentBox = () => {
  return (
    <Card>
      <CardContent className="flex flex-col lg:flex-row items-start justify-start gap-4">
        <div className="flex-3 flex items-start justify-start gap-3 w-full">
          <UserProfilePicture />
          <div className="w-full">
            <h3 className="font-medium text-base">
              Alice Williams <Badge variant={"pending"}>Pending</Badge>
            </h3>
            <div className="text-muted-foreground text-sm w-full">
              <a
                className="hover:text-primary hover:underline transition-all"
                href={`mailto:alice@gmail.com`}
              >
                alice@gmail.com
              </a>
              <p>Applied for Grade 10 - Section A</p>
              <div className="mt-4 space-y-4 md:grid grid-cols-1 md:grid-cols-2 w-full hidden">
                <div className="space-y-0.5">
                  <p className="font-medium">Student Phone:</p>
                  <a
                    className="hover:text-primary hover:underline transition-all"
                    href="tel:9082828822"
                  >
                    +234 802 783 6001
                  </a>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">Previous school:</p>
                  <p>Caleb Primary School</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">Parent/Guardian:</p>
                  <p>Jennifer Williams</p>
                  <a
                    className="hover:text-primary hover:underline transition-all"
                    href="tel:9082828822"
                  >
                    +234 802 783 6001
                  </a>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">Date of Birth:</p>
                  <p>{formatDate(new Date())}</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">Address:</p>
                  <p>789 Cedar Lane, City, State 12345</p>
                </div>
                <div className="space-y-0.5">
                  <p className="font-medium">Application Date:</p>
                  <p>{formatDate(new Date())}</p>{" "}
                </div>
                <div className="space-y-0.5 col-span-2">
                  <p className="font-medium">Documents Submitted:</p>
                  <div className="flex gap-2 overflow-x-auto whitespace-nowrap p-1 custom-scroll">
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                    <Badge variant={"secondary"}>Birth certificate</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 gap-2">
          <Button>
            <IconCheck />
            Approve
          </Button>
          <Button variant={"outlineDestructive"}>
            <IconBan />
            Reject
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
