import {
  Sidebar,
  SidebarContent,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ProfileSidebarType } from "@/features/home/server/get-profile";
import { SidebarFooterContent } from "./sidebar-footer-content";
import { SidebarHeaderContent } from "./sidebar-header-content";
import { SidebarMenuContent } from "./sidebar-menu-content";

interface AppSidebarProps {
  profile: ProfileSidebarType;
}

export function AppSidebarRight({ profile }: AppSidebarProps) {
  return (
    <Sidebar side="right">
      <SidebarHeaderContent profile={profile} />
      <SidebarContent>
        <SidebarSeparator />
        <SidebarMenuContent />
      </SidebarContent>
      <SidebarFooterContent />
    </Sidebar>
  );
}
