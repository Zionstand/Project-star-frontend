import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminDropdown } from "../AdminDropdown";
import { Button } from "@/components/ui/button";
import { IconBell } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/Searchbar";
import { FullLogo, Logo } from "@/components/Logo";

export const AppSidebarHeader = () => {
  return (
    <header className="sticky top-0 bg-background border-b flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-20">
      <div className="flex items-center justify-between w-full gap-2 px-4">
        <div className="flex flex-1 items-center gap-1">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical]:h-4"
          />
          <div className="md:hidden">
            <Logo />
          </div>
        </div>
        <div className="flex flex-12 lg:flex-2 xl:flex-1 w-full items-center justify-end gap-2">
          <div className="hidden w-full md:block">
            <SearchBar />
          </div>
          <Button
            size="icon"
            variant={"secondary"}
            className="relative hidden md:inline-flex"
          >
            <Badge
              variant={"destructive"}
              className="absolute -top-2 -right-2 rounded-full text-xs"
            >
              3
            </Badge>
            <IconBell />
          </Button>
          <AdminDropdown />
        </div>
      </div>
    </header>
  );
};
