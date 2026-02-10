"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useHash } from "@/hooks/use-hash";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { useScroll } from "@/hooks/use-scroll";

const nav = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    items: [
      { title: "Introduce", hash: "#introduce" },
      { title: "Features Projects", hash: "#projects" },
      { title: "Skills", hash: "#skills" },
      { title: "Experience", hash: "#experience" },
      { title: "Contact", hash: "#contact" },
    ],
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  // {
  //   title: "Experience",
  //   url: "/experience",
  //   icon: Briefcase,
  // },
];

export function SidebarMenuContent() {
  const pathname = usePathname();
  const hash = useHash();

  const homeSections =
    nav.find((n) => n.url === "/")?.items?.map((i) => i.hash) ?? [];
  const scrollHash = useScroll(homeSections);

  const activeHash =
    scrollHash || hash || (pathname === "/" ? homeSections[0] : "");

  // useEffect(() => {
  //   if (pathname === "/" && !window.location.hash) {
  //     window.history.replaceState(null, "", homeSections[0]);
  //   }
  // }, [pathname, homeSections]);
  //
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          {nav.map((item) => {
            const isActive = pathname === item.url;

            return (
              <Collapsible
                key={item.title}
                asChild
                open={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                  <CollapsibleContent
                    className="
    overflow-hidden
    data-[state=open]:animate-accordion-down
    data-[state=closed]:animate-accordion-up
  "
                  >
                    {item.url === "/" && pathname.startsWith(item.url) && (
                      <SidebarMenuSub>
                        {item.items?.map((sub) => {
                          const isSubActive =
                            pathname === "/" && activeHash === sub.hash;

                          return (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  "text-muted-foreground transition-colors",
                                  isSubActive && "text-foreground font-medium",
                                )}
                              >
                                <a href={`${sub.hash}`}>{sub.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    )}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
