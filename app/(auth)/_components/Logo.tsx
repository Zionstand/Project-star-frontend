import { cn } from "@/lib/utils";

export const FullLogo = () => {
  return (
    <div className={cn("flex items-center gap-2 justify-start")}>
      <Logo />
      <div className="space-y-0">
        <h2 className="font-semibold text-lg">LAGELU GRAMMAR</h2>
        <p className="text-muted-foreground text-sm -mt-1">School Management</p>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <div className="p-3 bg-primary text-white rounded-xl flex items-center justify-center">
      <span className="font-bold text-lg">LGS</span>
    </div>
  );
};
