import { getServerAuth } from "@/features/auth/server/get-server-session";
import { ExperienceSection } from "@/features/experience/components/experience-section";
import { getExperienceFormOptions } from "@/features/experience/server/get-experience-form-options";
import { getExperiences } from "@/features/experience/server/get-experiences";
import { cookies } from "next/headers";

export default async function ExperiencePage() {
  const { hasAdminAccess } = await getServerAuth();
  const cookieStore = await cookies();

  const viewMode = cookieStore.get("admin_view")?.value;
  const isAdmin = hasAdminAccess && viewMode !== "preview";

  const { projectOptions } = await getExperienceFormOptions();
  const experiences = await getExperiences();

  return (
    <div>
      <ExperienceSection
        isAdmin={isAdmin}
        projectOptions={projectOptions}
        experiences={experiences}
      />
    </div>
  );
}
