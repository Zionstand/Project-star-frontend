"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { adminNavLinks } from "@/constant";
import { useSidebar } from "@/components/ui/sidebar";

export function NavMain() {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = !isMobile && state === "collapsed";
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu
        className={cn("flex flex-col gap-2", isCollapsed && "items-center")}
      >
        {adminNavLinks.map((item) => {
          // Parent is active if ANY child matches
          const isSectionActive = item.items?.some(
            (sub) => pathname === sub.url
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isSectionActive} // auto open section if a child is active
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* Parent link */}
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      `font-medium text-xs ${
                        isCollapsed
                          ? "justify-center w-12 h-12 p-0"
                          : "justify-start px-3"
                      }`,
                      isSectionActive && "bg-white text-primary font-semibold"
                    )}
                    onClick={() => {
                      // Close sidebar on mobile if top-level link is clicked
                      if (isMobile && !item.items?.length) {
                        setOpenMobile(false);
                      }
                    }}
                  >
                    {item.icon && (
                      <item.icon
                        className={isCollapsed ? "size-6" : "size-4"}
                      />
                    )}
                    {(!isCollapsed || isMobile) && <span>{item.title}</span>}
                    {!isCollapsed && item.items && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* Submenu */}
                {(!isCollapsed || isMobile) && item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isActive = pathname.startsWith(subItem.url);
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              size="md"
                              asChild
                              className={cn(
                                isActive &&
                                  "bg-white text-primary font-medium [&>svg]:text-primary"
                              )}
                              onClick={() => {
                                if (isMobile) {
                                  setOpenMobile(false); // closes sidebar on mobile
                                }
                              }}
                            >
                              <Link href={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
