"use client";

import { Mail, FileText, Github } from "lucide-react";
import { SidebarGroup } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ProfileSidebarType } from "@/features/home/server/get-profile";
import { getGithub, getPrimaryEmail } from "@/features/home/lib/profile.utils";

interface SidebarHeroContentProps {
  profile: ProfileSidebarType;
}

export function SidebarHeroContent({ profile }: SidebarHeroContentProps) {
  const email = getPrimaryEmail(profile?.socials ?? []);
  const github = getGithub(profile?.socials ?? []);

  return (
    <SidebarGroup className="px-6 py-3">
      <div className="space-y-6">
        {profile?.availability && (
          <div className="flex items-center gap-2 pl-3 border-l-2  border-green-500">
            <p className="text-xs text-muted-foreground">
              {profile.availability}
            </p>
          </div>
        )}

        <div className="space-y-2">
          {email && (
            <Button size="sm" className="w-full" asChild>
              <a href={email.href}>
                <Mail className="mr-2 h-4 w-4" />
                {email.email}
              </a>
            </Button>
          )}

          {profile?.resumeUrl && (
            <Button size="sm" variant="outline" className="w-full" asChild>
              <a href={profile.resumeUrl} target="_blank">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          )}
          {github && (
            <Button size="sm" variant={"outline"} className="w-full" asChild>
              <a href={github.url} target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </div>
      </div>
    </SidebarGroup>
  );
}
