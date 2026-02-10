"use client";

import { ProfileType } from "@/features/home/server/get-profile";

interface Footer {
  profile: ProfileType;
}

export function Footer({ profile }: Footer) {
  return <footer className=" min-h-16 w-full "></footer>;
}
