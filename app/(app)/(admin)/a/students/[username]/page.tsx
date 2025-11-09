"use client";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { UserProfilePicture } from "@/components/UserProfilePicture";
import api from "@/lib/api";
import { schoolService } from "@/lib/school";
import { calculateAge, cn, formatDate, formatPhoneNumber } from "@/lib/utils";
import { Class, useAuth, User } from "@/store/useAuth";
import {
  IconActivity,
  IconAward,
  IconBuilding,
  IconCalendar,
  IconCheck,
  IconClock,
  IconDotsVertical,
  IconDownload,
  IconEye,
  IconFileDescription,
  IconMail,
  IconMapPin2,
  IconPencil,
  IconPhone,
  IconSchool,
  IconTrash,
  IconTrendingUp,
  IconUser,
  IconUsers,
  IconWallet,
  IconX,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StudentRejectionModal } from "@/components/StudentRejectionModal";
import { StudentApprovalModal } from "@/components/StudentApprovalModal";
import { Progress } from "@/components/ui/progress";

const page = () => {
  const { user } = useAuth();

  const { username } = useParams();

  const [student, setStudent] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!user || !user.school?.id || !username) return;

      try {
        const student = await schoolService.getStudentDetails(
          user?.school?.id!,
          username!
        );

        setStudent(student);
      } catch (error: any) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [user, username]);

  if (loading || !student) return <Loader />;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Student Details`}
        description={`Complete information about ${student.firstName} ${student.lastName}`}
        destructiveCTA={{
          label: "Delete",
          slug: ``,
          icon: IconTrash,
        }}
        secondaryCTA={{
          label: "Edit",
          slug: ``,
          icon: IconPencil,
        }}
        back
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        <div className="col-span-1 lg:col-span-3">
          <div className="grid gap-4 ">
            <Card>
              <CardHeader>
                <CardTitle>Student Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="text-center flex flex-col items-center justify-center gap-4">
                  <UserProfilePicture
                    size="lg"
                    src={student?.image}
                    alt={`${student?.firstName}'s picture`}
                  />
                  <div className="space-y-1.5">
                    <p className="text-base lg:text-lg font-medium">
                      {student.title} {student.firstName} {student.lastName}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {student.Student.candidateNumber}
                    </p>
                    <div className="flex items-center justify-center gap-1">
                      <Badge
                        variant={
                          student?.Student.isApproved
                            ? "default"
                            : student?.Student.isRejected
                            ? "destructive"
                            : "pending"
                        }
                      >
                        {student?.Student.isApproved
                          ? "Approved"
                          : student?.Student.isRejected
                          ? "Application rejected"
                          : "Pending approval"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4 text-muted-foreground text-sm">
                  <div className="flex items-start justify-start gap-2">
                    <IconSchool className="size-5" />
                    <div>
                      <p className="text-xs">Class</p>
                      <p className="text-black font-medium">
                        {student.Student.desiredClass}
                      </p>
                    </div>
                  </div>
                  {student?.Student.Class.level &&
                    ["SS1", "SS2", "SS3"].includes(
                      student?.Student?.Class.level
                    ) && (
                      <div className="flex items-start justify-start gap-2">
                        <IconBuilding className="size-5" />
                        <div>
                          <p className="text-xs">Department</p>
                          <p className="text-black font-medium">
                            {student.department || (
                              <span className="italic">
                                No department selected
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  <div className="flex items-start justify-start gap-2">
                    <IconUser className="size-5" />
                    <div>
                      <p className="text-xs">Gender</p>
                      <p className="text-black font-medium">
                        {student.gender || (
                          <span className="italic">No gender selected</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-start gap-2">
                    <IconCalendar className="size-5" />
                    <div>
                      <p className="text-xs">Date of Birth</p>
                      <p className="text-black font-medium">
                        {`${formatDate(student.dob)} (${calculateAge(
                          student?.dob!
                        )} years)` || (
                          <span className="italic">No Date of Birth</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-start gap-2">
                    <IconAward className="size-5" />
                    <div>
                      <p className="text-xs">Admission Number</p>
                      <p className="text-black font-medium">
                        {student.Student.admissionNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 text-muted-foreground text-sm">
                <div className="flex items-start justify-start gap-2">
                  <IconMail className="size-5" />
                  <div>
                    <p className="text-xs">Email</p>
                    <p className="text-black font-medium">
                      {student.email ? (
                        <a
                          className="hover:underline hover:text-primary"
                          href={`mailto:${student.email}`}
                        >
                          {student.email}
                        </a>
                      ) : (
                        <span className="italic">No email</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-start gap-2">
                  <IconPhone className="size-5" />
                  <div>
                    <p className="text-xs">Phone</p>
                    <p className="text-black font-medium">
                      {student.phoneNumber ? (
                        <a
                          className="hover:underline hover:text-primary"
                          href={`tel:${student.phoneNumber}`}
                        >
                          {formatPhoneNumber(student.phoneNumber)}
                        </a>
                      ) : (
                        <span className="italic">No phone</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start justify-start gap-2">
                  <IconMapPin2 className="size-5" />
                  <div>
                    <p className="text-xs">Address</p>
                    <p className="text-black font-medium">
                      {student.address ? (
                        <p className="hover:underline hover:text-primary">
                          {student.address}, {student.city}, {student.state},{" "}
                          {student.country}
                        </p>
                      ) : (
                        <span className="italic">No address</span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-start gap-2">
                  <IconUsers className="size-4" />
                  Parents/Guardians Details
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cn(
                  "grid gap-4 grid-cols-1",
                  student.Student.ParentStudentLink.length > 1 &&
                    "lg:grid-cols-2"
                )}
              >
                {student.Student.ParentStudentLink.map((parent, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between gap-2">
                        {parent.relation}
                        <Badge variant={"secondary"}>{parent.relation}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-sm grid gap-4">
                      <div>
                        <p className="text-xs">Name</p>
                        <p className="font-medium text-black">
                          {parent.parent.user?.title}{" "}
                          {parent.parent.user?.firstName}{" "}
                          {parent.parent.user?.lastName}{" "}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Phone</p>
                        <p className="font-medium text-black">
                          {parent.parent.user?.phoneNumber ? (
                            <a href={`tel:${parent.parent.user?.phoneNumber}`}>
                              {formatPhoneNumber(
                                parent.parent.user?.phoneNumber
                              )}
                            </a>
                          ) : (
                            <span className="italic">No phone</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Phone</p>
                        <p className="font-medium text-black">
                          {parent.parent.user?.email ? (
                            <a href={`mailto:${parent.parent.user?.email}`}>
                              {parent.parent.user?.email}
                            </a>
                          ) : (
                            <span className="italic">No email</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs">Occupation</p>
                        <p className="font-medium text-black">
                          {parent.parent.user?.occupation ? (
                            parent.parent.user.occupation
                          ) : (
                            <span className="italic">No occupation</span>
                          )}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-start gap-2">
                  <IconCalendar className="size-4" />
                  Enrollment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm grid grid-cols-1 gap-2 md:grid-cols-2">
                <div>
                  <p className="text-xs">Admission Date:</p>
                  <p className="text-black font-medium">
                    {formatDate(student.Student.approvalDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs">Current Class:</p>
                  <p className="text-black font-medium">
                    {student.Student.Class.level}
                    {student.Student.Class.section}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-start gap-2">
                  <IconTrendingUp className="size-4" />
                  Academic Performance Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-xs text-muted-foreground">Current GPA</p>
                    <p className="text-primary">3.85</p>
                  </div>
                  <div className="p-4 bg-muted/10 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      Previous GPA
                    </p>
                    <p className="text-primary">3.72</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-base">
                    Current Term Performance
                  </p>
                  <div className="grid gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-black">Mathematics</p>
                        <p className="text-muted-foreground flex items-center justify-end gap-2">
                          <span>92%</span> <Badge variant={"outline"}>A</Badge>
                        </p>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-black">Mathematics</p>
                        <p className="text-muted-foreground flex items-center justify-end gap-2">
                          <span>92%</span> <Badge variant={"outline"}>A</Badge>
                        </p>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-black">Mathematics</p>
                        <p className="text-muted-foreground flex items-center justify-end gap-2">
                          <span>92%</span> <Badge variant={"outline"}>A</Badge>
                        </p>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-black">Mathematics</p>
                        <p className="text-muted-foreground flex items-center justify-end gap-2">
                          <span>92%</span> <Badge variant={"outline"}>A</Badge>
                        </p>
                      </div>
                      <Progress value={92} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-black">Mathematics</p>
                        <p className="text-muted-foreground flex items-center justify-end gap-2">
                          <span>92%</span> <Badge variant={"outline"}>A</Badge>
                        </p>
                      </div>
                      <Progress value={92} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-start gap-2">
                  <IconClock className="size-4" />
                  Attendance Record
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid text-center grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-muted-foreground text-xs mb-1">
                      Total Days
                    </p>
                    <p className="text-2xl font-semibold text-primary">180</p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4">
                    <p className="text-muted-foreground text-xs mb-1">
                      Present
                    </p>
                    <p className="text-2xl font-semibold text-green-600">172</p>
                  </div>
                  <div className="rounded-lg bg-red-50 p-4">
                    <p className="text-muted-foreground text-xs mb-1">Absent</p>
                    <p className="text-2xl font-semibold text-red-600">8</p>
                  </div>
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-muted-foreground text-xs mb-1">
                      Percentage
                    </p>
                    <p className="text-2xl font-semibold text-blue-600">
                      95.6%
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Attendance Rate</p>
                    <p className="text-sm font-semibold">95.6%</p>
                  </div>
                  <Progress value={95.6} className="h-2" />
                  <div className="flex items-center gap-2 text-green-600">
                    <IconCheck className="size-4" />
                    <p className="text-sm">Excellent attendance record</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-start gap-2">
                  <IconWallet className="size-4" />
                  Payment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Payment Status
                    </p>
                    <Badge variant="default" className="bg-green-600">
                      Paid
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Balance
                    </p>
                    <p className="text-lg font-semibold text-green-600">₦0</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Total Fees
                    </p>
                    <p className="font-semibold">₦450,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Amount Paid
                    </p>
                    <p className="font-semibold text-green-600">₦450,000</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Outstanding
                    </p>
                    <p className="font-semibold text-green-600">₦0</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium mb-3">Last Payment</p>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">₦150,000</p>
                      <p className="text-xs text-muted-foreground">
                        15/09/2024
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <IconEye />
                      View Receipt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
