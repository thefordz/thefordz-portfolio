"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Edit, Mouse } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { ProfileForm } from "./form/profile-form";
import { ProfileFormValues } from "../lib/profile.validation";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";

interface HeroSectionProps {
  isAdmin: boolean;
  initialValues: ProfileFormValues;
}

export function HeroSection({
  isAdmin,
  initialValues: profile,
}: HeroSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section
        id="introduce"
        className="relative flex items-center min-h-[calc(100vh-64px)] "
      >
        <div className="hidden md:flex absolute w-full bottom-6 justify-center">
          <Mouse className="animate-bounce opacity-60" />
        </div>

        <AdminContentWrapper isAdmin={isAdmin}>
          {isAdmin && (
            <div className="absolute top-4 right-4 ">
              <Button className="rounded-sm" onClick={() => setIsOpen(true)}>
                <Edit className="w-4 h-4" />
                Edit
              </Button>
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex items-center gap-4">
              {profile?.avatarUrl && (
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full overflow-hidden shrink-0 border">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.fullName}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {profile?.fullName}
              </p>
            </div>

            {/* Headline */}
            <h1
              className="font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] max-w-5xl
        "
            >
              {profile?.headline}
            </h1>

            {/* Bio */}
            {profile?.bio && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl whitespace-pre-line">
                {profile?.bio}
              </p>
            )}

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              {profile.resumeUrl && (
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-sm px-8 border-2"
                  asChild
                >
                  <a href={profile.resumeUrl} target="_blank">
                    View Resume
                  </a>
                </Button>
              )}

              <Link
                href="/projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                View My Projects →
              </Link>
            </div>
          </div>
        </AdminContentWrapper>
      </section>

      {isAdmin && (
        <DialogWrapper
          title="Edit Profile"
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          className="h-fit "
        >
          <ProfileForm
            initialValues={profile}
            onClose={() => setIsOpen(false)}
          />
        </DialogWrapper>
      )}
    </>
  );
}
