import { getServerAuth } from "@/features/auth/server/get-server-session";
import { ContactSection } from "@/features/contact/components/contact-section";
import { EducationSection } from "@/features/education/components/education-section";
import { getEducations } from "@/features/education/server/get-educations";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { getExperienceFormOptions } from "@/features/experience/server/get-experience-form-options";
import { getExperiences } from "@/features/experience/server/get-experiences";
import { FeaturedProjectsSection } from "@/features/home/components/features-project-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { SkillSection } from "@/features/home/components/skill-section";
import { getProfile } from "@/features/home/server/get-profile";
import { Footer } from "@/features/layout/components/footer";
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
  const educations = await getEducations();

  const { projectOptions } = await getExperienceFormOptions();
  const experiences = await getExperiences();

  return (
    <div className="space-y-16">
      <HeroSection isAdmin={isAdmin || false} initialValues={profile} />
      {featuredProjects.length > 0 && (
        <FeaturedProjectsSection
          projects={featuredProjects}
          isAdmin={isAdmin || false}
        />
      )}
      <SkillSection isAdmin={isAdmin || false} categories={skillCategories} />
      <EducationSection isAdmin={isAdmin} educations={educations} />
      <ExperienceSection
        isAdmin={isAdmin}
        projectOptions={projectOptions}
        experiences={experiences}
      />
      <ContactSection profile={profile} />
    </div>
  );
}
