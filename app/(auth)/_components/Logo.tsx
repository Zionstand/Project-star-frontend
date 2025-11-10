import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  name?: string;
  acronym?: string;
}

export const FullLogo = ({ name = "EduManage", acronym = "EMS" }: Props) => {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2 justify-start")}
    >
      <Link
        href="/"
        className="p-3 bg-primary text-white rounded-xl flex items-center justify-center"
      >
        <span className="font-bold text-lg">{acronym}</span>
      </Link>
      <div className="space-y-0">
        <h2 className="font-medium text-lg group-hover:text-primary transition-all">
          {name}
        </h2>
        <p className="text-muted-foreground text-sm -mt-1 group-hover:text-black transition-all">
          School Management
        </p>
      </div>
    </Link>
  );
};

export const Logo = ({ acronym = "EMS" }: Props) => {
  return (
    <Link
      href="/"
      className="p-3 bg-primary text-white rounded-xl flex items-center justify-center"
    >
      <span className="font-bold text-lg">{acronym}</span>
    </Link>
  );
};
