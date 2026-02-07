"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { ProfileForm } from "./form/profile-form";
import { ProfileFormValues } from "../lib/profile.validation";
import { cn } from "@/lib/utils";
import { getGithub } from "../lib/profile.utils";

interface HeroSectionProps {
  isAdmin: boolean;
  initialValues: ProfileFormValues;
}

export function HeroSection({
  isAdmin,
  initialValues: profile,
}: HeroSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const github = getGithub(profile.socials);

  return (
    <>
      <section
        id="introduce"
        className="min-h-[calc(100vh-64px)] flex items-center"
      >
        <div
          className={cn(
            "w-full relative rounded-xl transition",
            "px-4 sm:px-6 md:px-10 lg:px-16",
            "py-16 md:py-20 lg:py-28",
            isAdmin && "hover:bg-secondary hover:shadow-2xl group",
          )}
        >
          {isAdmin && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
              <Button size="icon" onClick={() => setIsOpen(true)}>
                <Pen className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              {profile?.avatarUrl && (
                <div
                  className="
                  relative
                  sm:w-14 sm:h-14
                  md:w-16 md:h-16
                  lg:w-18 lg:h-18
                  xl:w-22 xl:h-22
                  rounded-full
                  overflow-hidden
                  shrink-0
                "
                >
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground">
                {profile?.fullName}
              </p>
            </div>

            <h1
              className="
              font-semibold tracking-tight
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl
              leading-[1.05]
              max-w-6xl
            "
            >
              {profile?.headline}
            </h1>

            {profile?.bio && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl whitespace-pre-line">
                {profile?.bio}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-5 pt-6">
              {profile.resumeUrl && (
                <Button size="lg" asChild>
                  <a href={profile.resumeUrl} target="_blank">
                    View Resume
                  </a>
                </Button>
              )}

              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                View Projects →
              </Link>

              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {isAdmin && (
        <DialogWrapper
          title="Edit Profile"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          className="h-fit"
        >
          <div className="overflow-y-auto px-2">
            <ProfileForm
              initialValues={profile}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </DialogWrapper>
      )}
    </>
  );
}
