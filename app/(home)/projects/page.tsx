import { getServerSession } from "@/features/auth/server/get-server-session";
import { ProjectsSection } from "@/features/projects/components/projects-section";
import { getProjects } from "@/features/projects/server/get-projects";
import { ADMIN_EMAIL } from "@/lib/constants";

export default async function ProjectsPage() {
  const session = await getServerSession();
  const isAdmin = session && session.user.email === ADMIN_EMAIL;

  const projects = await getProjects();

  return (
    <div>
      <ProjectsSection isAdmin={!!isAdmin || false} projects={projects} />
    </div>
  );
}
