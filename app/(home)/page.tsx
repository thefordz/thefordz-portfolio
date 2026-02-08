import { getServerAuth } from "@/features/auth/server/get-server-session";
import { FeaturedProjectsSection } from "@/features/home/components/features-project-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SkillSection } from "@/features/home/components/skill-section";
import { mapProfileToFormSafe } from "@/features/home/lib/profile.mapper";
import { getProfile } from "@/features/home/server/get-profile";
import { getFeaturedProjects } from "@/features/projects/server/get-projects";
import { getSkillCategories } from "@/features/skill/server/get-skill-categories";
import { cookies } from "next/headers";

export default async function Home() {
  const { hasAdminAccess } = await getServerAuth();
  const cookieStore = await cookies();

  const viewMode = cookieStore.get("admin_view")?.value;
  const isAdmin = hasAdminAccess && viewMode !== "preview";

  const profile = await getProfile();
  const featuredProjects = await getFeaturedProjects(3);
  const skillCategories = await getSkillCategories();

  const initialProfile = mapProfileToFormSafe(profile);

  return (
    <div className="space-y-16">
      <HeroSection isAdmin={isAdmin || false} initialValues={initialProfile} />
      {featuredProjects.length > 0 && (
        <FeaturedProjectsSection
          projects={featuredProjects}
          isAdmin={isAdmin || false}
        />
      )}
      <SkillSection isAdmin={isAdmin || false} categories={skillCategories} />
    </div>
  );
}
