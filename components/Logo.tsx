"use client";

import { useSidebar } from "@/components/ui/sidebar"; // import hook
import { cn } from "@/lib/utils";

export const Logo = () => {
  const { state } = useSidebar(); // get sidebar state

  const isCollapsed = state === "collapsed";

  return (
    <div
      className={cn("flex items-center gap-2", isCollapsed && "justify-center")}
    >
      <div className="p-3 bg-white rounded-xl flex items-center justify-center">
        <span className="text-primary font-bold text-lg">LGS</span>{" "}
      </div>

      {/* Text only when expanded */}
      {!isCollapsed && (
        <div className="space-y-0">
          <h1 className="font-semibold text-lg">LAGELU GRAMMAR</h1>
          <p className="text-primary-foreground/70 text-sm -mt-1">
            School Management
          </p>
        </div>
      )}
    </div>
  );
};
