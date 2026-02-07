import { getServerSession } from "@/features/auth/server/get-server-session";
import { FeaturesProjectSection } from "@/features/home/components/features-project-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { mapProfileToFormSafe } from "@/features/home/lib/profile.mapper";
import { getProfile } from "@/features/home/server/get-profile";
import { ADMIN_EMAIL } from "@/lib/constants";

export default async function Home() {
  const session = await getServerSession();
  const isAdmin = session && session.user.email === ADMIN_EMAIL;

  const profile = await getProfile();
  const initialProfile = mapProfileToFormSafe(profile);

  return (
    <div>
      <HeroSection
        isAdmin={!!isAdmin || false}
        initialValues={initialProfile}
      />
      <FeaturesProjectSection />
    </div>
  );
}
