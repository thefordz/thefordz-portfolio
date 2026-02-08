"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProjectsForm } from "./form/project-form";
import { ProjectsType } from "../server/get-projects";
import { ProjectCard } from "./project-card";
import { ProjectDetailDialog } from "./project-detail-dialog";
import { mapProjectToFormSafe } from "../lib/project.mapper";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";
import { SkillCategoryOption } from "@/features/skill/lib/skill.types";

const ProjectsSortable = dynamic(
  () => import("./projects-sortable").then((mod) => mod.ProjectsSortable),
  {
    ssr: false,
  },
);

interface HeroSectionProps {
  isAdmin: boolean;
  projects: ProjectsType;
  categories: SkillCategoryOption[];
}
type Project = ProjectsType[number];

export function ProjectsSection({
  isAdmin,
  projects,
  categories,
}: HeroSectionProps) {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  function openDetail(project: Project) {
    setSelectedProject(project);
    setIsDetailOpen(true);
  }

  const initialValues = mapProjectToFormSafe(selectedProject);

  return (
    <>
      <section id="projects" className="flex items-center flex-col">
        <AdminContentWrapper
          isAdmin={isAdmin}
          title="My Projects"
          description="A collection of my work."
        >
          <div>
            {isAdmin && (
              <div className="absolute top-4 right-4 md:opacity-0 md:group-hover:opacity-100 transition">
                <Button onClick={() => setIsCreate(true)}>
                  <Plus className="h-4 w-4" />
                  Add New Project
                </Button>
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto space-y-6">
            {isAdmin ? (
              <ProjectsSortable projects={projects} onOpen={openDetail} />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpen={openDetail}
                  />
                ))}
              </div>
            )}
          </div>
        </AdminContentWrapper>
      </section>

      {/* Dialog For Create Proiject */}

      {isAdmin && (
        <DialogWrapper
          title="Create New Project"
          isOpen={isCreate}
          onOpenChange={setIsCreate}
          className="h-fit w-[90%] sm:max-w-7xl"
        >
          <div className="overflow-y-auto px-2">
            <ProjectsForm
              onClose={() => setIsCreate(false)}
              categories={categories}
            />
          </div>
        </DialogWrapper>
      )}

      {/* Dialog For Edit Project */}
      {isAdmin && (
        <DialogWrapper
          title={cn("Edit", selectedProject?.title)}
          isOpen={isEdit}
          onOpenChange={setIsEdit}
          className="h-fit w-[90%] sm:max-w-7xl"
        >
          <div className="overflow-y-auto px-2">
            <ProjectsForm
              categories={categories}
              projectId={selectedProject?.id}
              initialValues={initialValues}
              onClose={() => setIsEdit(false)}
            />
          </div>
        </DialogWrapper>
      )}

      {/* Dialog For Project Details */}
      <ProjectDetailDialog
        project={selectedProject}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        isAdmin={isAdmin}
        onEdit={() => {
          setIsDetailOpen(false);
          setIsEdit(true);
        }}
      />
    </>
  );
}
