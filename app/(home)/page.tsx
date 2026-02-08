import { getServerSession } from "@/features/auth/server/get-server-session";
import { FeaturedProjectsSection } from "@/features/home/components/features-project-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SkillSection } from "@/features/home/components/skill-section";
import { mapProfileToFormSafe } from "@/features/home/lib/profile.mapper";
import { getProfile } from "@/features/home/server/get-profile";
import { getFeaturedProjects } from "@/features/projects/server/get-projects";
import { getSkillCategories } from "@/features/skill/server/get-skill-categories";
import { ADMIN_EMAIL } from "@/lib/constants";

export default async function Home() {
  const session = await getServerSession();
  const isAdmin = session && session.user.email === ADMIN_EMAIL;
  const featuredProjects = await getFeaturedProjects(3);

  const profile = await getProfile();

  const skillCategories = await getSkillCategories();

  const initialProfile = mapProfileToFormSafe(profile);

  return (
    <div className="space-y-16">
      <HeroSection
        isAdmin={!!isAdmin || false}
        initialValues={initialProfile}
      />
      {featuredProjects.length > 0 && (
        <FeaturedProjectsSection
          projects={featuredProjects}
          isAdmin={!!isAdmin || false}
        />
      )}
      <SkillSection isAdmin={!!isAdmin || false} categories={skillCategories} />
    </div>
  );
}
