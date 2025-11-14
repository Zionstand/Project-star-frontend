import { SearchBar } from "@/components/Searchbar";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Class } from "@/store/useAuth";
import { useState } from "react";

interface Props {
  classes: Class[];
  onChange: (value: { classId: string; date: string }) => void;
}

export const AttendanceSearchComponent = ({ classes, onChange }: Props) => {
  const defaultClassId = classes.length > 0 ? classes[0].id : "";
  const [selectedClass, setSelectedClass] = useState(defaultClassId);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Default: today's date
  });

  const handleChange = (classId: string, newDate: string) => {
    onChange({ classId, date: newDate });
  };

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* 🔍 Search bar */}
        <SearchBar
          label="Search students"
          placeholder="Search by name or admission number..."
        />

        {/* 🧩 Class and Date Filters */}
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          {/* 🏫 Class Selector */}
          <div className="flex-1 w-full">
            <Label className="mb-2 block">Class</Label>
            <Select
              value={selectedClass}
              onValueChange={(value) => {
                setSelectedClass(value);
                handleChange(value, date);
              }}
            >
              <SelectTrigger className="[&>span_svg]:text-muted-foreground/80 bg-muted [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((c, index) => (
                  <SelectItem key={index} value={c.id}>
                    {c.level}
                    {c.section} {c.department ? `(${c.department})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 🗓️ Date Picker */}
          <div className="flex-1 w-full">
            <Label className="mb-2 block">Date</Label>
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                handleChange(selectedClass, e.target.value);
              }}
              className="border rounded-md px-3 py-2 w-full bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
