import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ProfileSidebarType } from "@/features/home/server/get-profile";
import { SidebarHeroContent } from "./sidebar-hero-content";
import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarMenuContent } from "./sidebar-menu-content";

interface AppSidebarProps {
  profile: ProfileSidebarType;
}

export function AppSidebar({ profile }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeaderContent profile={profile} />
      <SidebarContent>
        <SidebarHeroContent profile={profile} />
        <SidebarSeparator />
        <SidebarMenuContent />
      </SidebarContent>
      <SidebarFooterContent />
    </Sidebar>
  );
}
