import { getServerAuth } from "@/features/auth/server/get-server-session";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { getProjects } from "@/features/projects/server/get-projects";
import { getSkillsForProject } from "@/features/projects/server/get-skills-for-project";
import { cookies } from "next/headers";

export const revalidate = 86400; // 1 days

export default async function ProjectsPage() {
  const { hasAdminAccess } = await getServerAuth();
  const cookieStore = await cookies();

  const viewMode = cookieStore.get("admin_view")?.value;
  const isAdmin = hasAdminAccess && viewMode !== "preview";

  const categories = await getSkillsForProject();

  const projects = await getProjects();

  return (
    <div>
      <ProjectsSection
        isAdmin={!!isAdmin || false}
        projects={projects}
        categories={categories}
      />
    </div>
  );
}
