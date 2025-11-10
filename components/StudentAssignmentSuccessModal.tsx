"use client";

import React from "react";
import { Button } from "./ui/button";
import { IconCheck, IconFileDescription } from "@tabler/icons-react";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { getDashboardPath } from "@/hooks/use-role-redirect";

export const StudentAssignmentSuccessModal = ({
  onClose,
}: {
  onClose: () => void;
}) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleReturn = () => {
    if (!user) return;
    const path = getDashboardPath(user.role);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow max-w-md w-full mx-4 overflow-hidden">
        {/* Header with success icon */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <IconCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Assignment Submitted Successfully!
          </h2>
        </div>

        {/* Content */}
        <div className="px-6 py-8">
          <p className="text-muted-foreground text-center leading-relaxed mb-6">
            Great job! Your assignment has been submitted successfully. You’ll
            be notified once your teacher reviews and grades your work.
          </p>

          {/* Info box */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-md p-4 mb-6">
            <div className="flex items-start gap-3">
              <IconFileDescription className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-emerald-700">
                You can always view or update your submission before the due
                date from your dashboard.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleReturn}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={onClose}
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-muted px-6 py-4 text-center border-t border-gray-100">
          <p className="text-xs text-muted-foreground">
            Submitted by{" "}
            <span className="font-medium text-gray-700">{user?.firstName}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
