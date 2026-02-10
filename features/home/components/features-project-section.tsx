"use client";

import { useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectDetailDialog } from "@/features/projects/components/project-detail-dialog";
import { ProjectsType } from "@/features/projects/server/get-projects";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";

interface Props {
  projects: ProjectsType;
  isAdmin?: boolean;
}

export function FeaturedProjectsSection({ projects, isAdmin }: Props) {
  const [selectedProject, setSelectedProject] = useState<
    ProjectsType[number] | null
  >(null);

  const [isOpen, setIsOpen] = useState(false);

  function openDetail(project: ProjectsType[number]) {
    setSelectedProject(project);
    setIsOpen(true);
  }

  return (
    <>
      <section id="projects" className="">
        <AdminContentWrapper
          title="Featured Projects"
          description="Selected work that represents my experience and focus."
        >
          <div className="space-y-3">
            {projects.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={openDetail}
                    />
                  ))}
                </div>

                <div className="flex justify-end">
                  <Link
                    href="/projects"
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
                  >
                    See all projects →
                  </Link>
                </div>
              </>
            ) : null}
          </div>
        </AdminContentWrapper>
      </section>

      <ProjectDetailDialog
        project={selectedProject}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        isAdmin={isAdmin}
      />
    </>
  );
}
