import { ProfileType } from "../server/get-profile";
import { ProfileFormValues } from "./profile.validation";

export function mapProfileToFormSafe(
  profile: ProfileType | null,
): ProfileFormValues {
  return {
    fullName: profile?.fullName ?? "",
    headline: profile?.headline ?? "",
    bio: profile?.bio ?? "",
    avatarUrl: profile?.avatarUrl ?? "",
    availability: profile?.availability ?? "",
    resumeUrl: profile?.resumeUrl ?? "",
    location: profile?.location ?? "",
    socials:
      profile?.socials.map((s) => ({
        url: s.url,
        label: s.label ?? "",
        isPrimary: s.isPrimary,
        order: s.order,
      })) ?? [],
  };
}
