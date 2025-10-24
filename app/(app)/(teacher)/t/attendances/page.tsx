import { PageHeader } from "@/components/PageHeader";
import { AttendanceSearchComponent } from "../_components/AttendanceSearchComponent";

const page = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title={`Mark Attendance`}
        description={"Record daily attendance for your classes"}
      />
      <AttendanceSearchComponent />
    </div>
  );
};

export default page;
