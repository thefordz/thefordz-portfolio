"use client";

import Link from "next/link";
import { Mail, FileText, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileType } from "@/features/home/server/get-profile";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";
import { SocialIcon } from "react-social-icons";

interface ContactPageProps {
  profile: ProfileType;
}

export function ContactSection({ profile }: ContactPageProps) {
  const email = profile?.socials.find((s) => s.url.startsWith("mailto:"));

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto py-24 px-6 space-y-12  min-h-[calc(50vh-64px)]"
    >
      <AdminContentWrapper
        title="Get In Touch"
        description="
              Open to full-time junior developer roles and collaboration
              opportunities.
        "
      >
        <div className="space-y-6 flex gap-4">
          {email && (
            <Button asChild size="lg" className="rounded-none w-full sm:w-auto">
              <Link href={email.url}>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Link>
            </Button>
          )}

          {profile?.resumeUrl && (
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none w-full sm:w-auto"
            >
              <Link href={profile.resumeUrl} target="_blank">
                <FileText className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          {profile?.socials.map((social) => (
            <SocialIcon
              key={social.id}
              url={social.url}
              style={{ width: 40, height: 40 }}
            />
          ))}
        </div>

        {profile?.location && (
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {profile.location}
          </div>
        )}
      </AdminContentWrapper>
    </section>
  );
}
