"use client";

import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ProfileSidebarType } from "@/features/home/server/get-profile";

interface SidebarHeaderContentProps {
  profile: ProfileSidebarType;
}

export function SidebarHeaderContent({ profile }: SidebarHeaderContentProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarHeader className="h-16 border-b flex flex-row items-center justify-between px-6">
      <div className="space-y-1">
        <p className="text-sm font-semibold tracking-tight">
          {profile?.fullName}
        </p>

        <p className="text-xs text-muted-foreground">
          {profile?.bio?.split("|")[0]}
        </p>
      </div>
      {isMobile && <SidebarTrigger />}
    </SidebarHeader>
  );
}
