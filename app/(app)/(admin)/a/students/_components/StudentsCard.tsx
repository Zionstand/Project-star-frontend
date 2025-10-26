import React from "react";
import { StudentCard } from "./StudentCard";

export const StudentsCard = () => {
  return (
    <div className="md:hidden space-y-4">
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
    </div>
  );
};
