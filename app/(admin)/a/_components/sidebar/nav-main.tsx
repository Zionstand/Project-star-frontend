"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { adminNavLinks } from "@/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";

// export function NavMain() {
//   const { state } = useSidebar();
//   const isCollapsed = state === "collapsed";

//   return (
//     <SidebarGroup>
//       <SidebarMenu
//         className={cn("flex flex-col gap-2", isCollapsed && "items-center")}
//       >
//         {adminNavLinks.map((item) => (
//           <Collapsible
//             key={item.title}
//             asChild
//             defaultOpen={item.isActive}
//             className="group/collapsible"
//           >
//             <SidebarMenuItem>
//               <CollapsibleTrigger asChild>
//                 <SidebarMenuButton
//                   tooltip={item.title}
//                   className={`font-medium text-xs ${
//                     isCollapsed
//                       ? "justify-center w-12 h-12 p-0" // collapsed → only icon centered
//                       : "justify-start px-3" // expanded → icon + text
//                   }`}
//                 >
//                   {item.icon && (
//                     <item.icon className={isCollapsed ? "size-6" : "size-4"} />
//                   )}
//                   {!isCollapsed && <span>{item.title}</span>}
//                   {!isCollapsed && (
//                     <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//                   )}
//                 </SidebarMenuButton>
//               </CollapsibleTrigger>

//               {!isCollapsed && (
//                 <CollapsibleContent>
//                   <SidebarMenuSub>
//                     {item.items?.map((subItem) => (
//                       <SidebarMenuSubItem key={subItem.title}>
//                         <SidebarMenuSubButton size="md" asChild>
//                           <Link href={subItem.url}>
//                             {subItem.icon && <subItem.icon />}
//                             <span>{subItem.title}</span>
//                           </Link>
//                         </SidebarMenuSubButton>
//                       </SidebarMenuSubItem>
//                     ))}
//                   </SidebarMenuSub>
//                 </CollapsibleContent>
//               )}
//             </SidebarMenuItem>
//           </Collapsible>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
//   );
// }

export function NavMain() {
  const { state, isMobile } = useSidebar();
  // collapse applies ONLY on desktop
  const isCollapsed = !isMobile && state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarMenu
        className={cn("flex flex-col gap-2", isCollapsed && "items-center")}
      >
        {adminNavLinks.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={`font-medium text-xs ${
                    isCollapsed
                      ? "justify-center w-12 h-12 p-0" // desktop collapsed
                      : "justify-start px-3" // desktop expanded OR mobile
                  }`}
                >
                  {item.icon && (
                    <item.icon className={isCollapsed ? "size-6" : "size-4"} />
                  )}
                  {/* ✅ Always show titles on mobile */}
                  {(!isCollapsed || isMobile) && <span>{item.title}</span>}

                  {/* Only desktop expanded should show chevron */}
                  {!isCollapsed && !isMobile && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                  {!isCollapsed && isMobile && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              {/* ✅ Keep submenu visible on mobile */}
              {(!isCollapsed || isMobile) && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton size="md" asChild>
                          <Link href={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                            {(!isCollapsed || isMobile) && (
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            )}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
