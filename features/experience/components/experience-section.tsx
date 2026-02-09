"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";
import { ExperienceForm } from "./experience-form";
import { ProjectOption } from "@/features/projects/lib/project.types";
import { ExperienceWithProjects } from "../server/get-experiences";
import { ExperienceCard } from "./experience-card";
import { mapExperienceToFormSafe } from "../lib/experience.mapper";

interface ExperienceSectionProps {
  isAdmin: boolean;
  experiences: ExperienceWithProjects[];
  projectOptions: ProjectOption[];
}

export function ExperienceSection({
  isAdmin,
  projectOptions,
  experiences,
}: ExperienceSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selected, setSelected] = useState<ExperienceWithProjects | null>(null);

  const isEditMode = !!selected;
  const initialValues = selected
    ? mapExperienceToFormSafe(selected)
    : undefined;

  function openCreate() {
    setSelected(null);
    setIsDialogOpen(true);
  }

  function openEdit(category: ExperienceWithProjects) {
    setSelected(category);
    setIsDialogOpen(true);
  }

  function handleClose() {
    setIsDialogOpen(false);
    setSelected(null);
  }

  return (
    <>
      <section id="experience" className="">
        <AdminContentWrapper
          isAdmin={isAdmin}
          title="My Experiences"
          description="A collection of my work."
        >
          {isAdmin && (
            <div className="absolute top-4 right-4 ">
              <Button className="rounded-sm" onClick={openCreate}>
                <Plus className="w-4 h-4" />
                New Experience
              </Button>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-6">
            {experiences?.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                isAdmin={isAdmin}
                onEdit={openEdit}
              />
            ))}
          </div>
        </AdminContentWrapper>
      </section>

      {/* Create Edit Experience */}
      {isAdmin && (
        <DialogWrapper
          title={isEditMode ? "Edit Experience" : "New Experience"}
          isOpen={isDialogOpen}
          onOpenChange={handleClose}
          className="h-fit"
        >
          <ExperienceForm
            experienceId={selected?.id}
            initialValues={initialValues}
            projectOptions={projectOptions}
            onClose={handleClose}
          />
        </DialogWrapper>
      )}
    </>
  );
}
