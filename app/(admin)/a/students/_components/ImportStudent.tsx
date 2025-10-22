"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  IconAlertCircle,
  IconCheck,
  IconDownload,
  IconFileTypeXls,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  class: string;
  section: string;
  admissionNumber: string;
  address: string;
  city: string;
  state: string;
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentRelationship: string;
  medicalConditions: string;
  emergencyContact: string;
  emergencyPhone: string;
}

interface ImportedStudent extends StudentFormData {
  status: "valid" | "error" | "warning";
  errors: string[];
}

const items = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.t@company.com",
    location: "San Francisco, US",
    status: "Active",
    balance: "$1,250.00",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    location: "Singapore",
    status: "Active",
    balance: "$600.00",
  },
  {
    id: "3",
    name: "James Wilson",
    email: "j.wilson@company.com",
    location: "London, UK",
    status: "Inactive",
    balance: "$650.00",
  },
];

export const ImportStudent = () => {
  const router = useRouter();

  const [importedData, setImportedData] = useState<ImportedStudent[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const downloadTemplate = () => {
    // In a real application, this would download an actual Excel template
    const csvContent = `First Name,Last Name,Email,Phone,Date of Birth,Gender,Class,Section,Admission Number,Address,City,State,Parent First Name,Parent Last Name,Parent Email,Parent Phone,Parent Relationship,Medical Conditions,Emergency Contact,Emergency Phone
John,Doe,john.doe@student.school.com,+234 801 234 5678,2008-05-15,Male,JSS1,A,STU2024101,123 Main Street,Ibadan,Oyo State,Michael,Doe,michael.doe@email.com,+234 802 345 6789,Father,None,Jane Doe,+234 803 456 7890`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_import_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast.success("Template downloaded successfully!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    const validTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (!validTypes.includes(file.type) && !file.name.endsWith(".csv")) {
      toast.error("Please upload a valid Excel or CSV file");
      return;
    }

    // Simulate file parsing
    toast.success("File uploaded successfully! Processing...");

    // Mock imported data
    setTimeout(() => {
      const mockData: ImportedStudent[] = [
        {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@student.school.com",
          phone: "+234 801 234 5678",
          dateOfBirth: "2008-05-15",
          gender: "Male",
          class: "JSS1",
          section: "A",
          admissionNumber: "STU2024101",
          address: "123 Main Street",
          city: "Ibadan",
          state: "Oyo State",
          parentFirstName: "Michael",
          parentLastName: "Doe",
          parentEmail: "michael.doe@email.com",
          parentPhone: "+234 802 345 6789",
          parentRelationship: "Father",
          medicalConditions: "None",
          emergencyContact: "Jane Doe",
          emergencyPhone: "+234 803 456 7890",
          status: "valid",
          errors: [],
        },
        {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane.smith@student.school.com",
          phone: "+234 804 567 8901",
          dateOfBirth: "2007-08-22",
          gender: "Female",
          class: "SS2",
          section: "B",
          admissionNumber: "STU2024102",
          address: "456 Oak Avenue",
          city: "Ibadan",
          state: "Oyo State",
          parentFirstName: "Robert",
          parentLastName: "Smith",
          parentEmail: "robert.smith@email.com",
          parentPhone: "+234 805 678 9012",
          parentRelationship: "Father",
          medicalConditions: "Asthma",
          emergencyContact: "Mary Smith",
          emergencyPhone: "+234 806 789 0123",
          status: "valid",
          errors: [],
        },
        {
          firstName: "Error",
          lastName: "Test",
          email: "invalid-email",
          phone: "123456",
          dateOfBirth: "2009-01-10",
          gender: "Male",
          class: "JSS3",
          section: "C",
          admissionNumber: "",
          address: "789 Pine Street",
          city: "Ibadan",
          state: "Oyo State",
          parentFirstName: "Test",
          parentLastName: "Parent",
          parentEmail: "test@email.com",
          parentPhone: "+234 807 890 1234",
          parentRelationship: "Mother",
          medicalConditions: "None",
          emergencyContact: "Emergency Contact",
          emergencyPhone: "+234 808 901 2345",
          status: "error",
          errors: [
            "Invalid email format",
            "Invalid phone format",
            "Admission number is required",
          ],
        },
      ];
      setImportedData(mockData);
      setShowPreview(true);
      toast.success(
        `Processed ${mockData.length} records. Please review before importing.`
      );
    }, 1000);
  };

  return (
    <Card>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-base">
            Import Students from Excel/CSV
          </h3>
          <p className="text-sm text-muted-foreground">
            Upload a file containing student data
          </p>
        </div>
        <div className="border p-3 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="flex text-sm text-muted-foreground items-center justify-start gap-1">
            <IconDownload className="size-4" />
            Download our template to ensure your data is formatted correctly
          </p>
          <Button
            onClick={downloadTemplate}
            className="w-full md:w-auto"
            variant={"outline"}
          >
            <IconDownload />
            Download Template
          </Button>
        </div>
        {!showPreview && (
          <div className="flex flex-col items-center justify-center gap-2.5 border-dashed border-2 px-6 py-10 rounded-lg">
            <IconUpload />
            <p className="font-medium text-md:md:text-lg">
              Upload Student Data
            </p>
            <p className="text-sm text-muted-foreground">
              Supports Excel (.xlsx, .xls) and CSV files
            </p>
            <Button
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <IconFileTypeXls />
              Choose File
            </Button>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}
        {showPreview && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ">
              <div>
                <h3 className="font-medium text-base">Preview Imported Data</h3>
                <p className="text-sm text-muted-foreground">
                  2 valid records, 1 errors
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowPreview(false);
                  setImportedData([]);
                }}
                variant={"outline"}
                className="w-full sm:w-auto"
              >
                <IconX />
                Clear
              </Button>
            </div>
            <Card className="gap-0">
              <CardContent>
                {" "}
                <div className="[&>div]:max-h-96">
                  <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                    <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Status</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Admission No.</TableHead>
                        <TableHead>Parent</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {importedData.map((student, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {student.status === "valid" ? (
                              <Badge variant={"outlineSuccess"}>
                                <IconCheck />
                                Valid
                              </Badge>
                            ) : (
                              <Badge variant={"destructive"}>
                                <IconAlertCircle />
                                Error
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>{student.admissionNumber}</TableCell>
                          <TableCell>
                            <div>
                              {student.parentFirstName} {student.parentLastName}
                              ({student.parentRelationship})
                              <small className="block text-sm text-muted-foreground">
                                {student.parentPhone}
                              </small>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <Separator />
            {/* ==== SAVE / CANCEL ==== */}
            <div className="flex items-center justify-end gap-2">
              <Button
                onClick={() => router.push("/a/students")}
                type="button"
                variant="secondary"
                // disabled={pending}
              >
                Cancel
              </Button>
              <Button
                //   disabled={pending}
                type="submit"
              >
                {false ? (
                  <Loader text="Importing..." />
                ) : (
                  `Import ${importedData.length} students`
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
