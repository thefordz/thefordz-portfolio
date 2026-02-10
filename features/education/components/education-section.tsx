"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";
import { EducationForm } from "./education-form";
import { EducationType } from "../lib/education.types";
import { EducationsType } from "../server/get-educations";
import { mapEducationToFormSafe } from "../lib/education.mapper";
import { EducationCard } from "./education-card";

interface EducationSectionProps {
  isAdmin: boolean;
  educations: EducationsType;
}

export function EducationSection({
  isAdmin,
  educations,
}: EducationSectionProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selected, setSelected] = useState<EducationType | null>(null);

  const isEditMode = !!selected;
  const initialValues = selected ? mapEducationToFormSafe(selected) : undefined;

  function openCreate() {
    setSelected(null);
    setIsDialogOpen(true);
  }

  function openEdit(education: EducationType) {
    setSelected(education);
    setIsDialogOpen(true);
  }

  function handleClose() {
    setIsDialogOpen(false);
    setSelected(null);
  }

  return (
    <>
      <section id="education" className="">
        <AdminContentWrapper
          isAdmin={isAdmin}
          title="My Education"
          description="A collection of my work."
        >
          {isAdmin && (
            <div className="absolute top-4 right-4 ">
              <Button className="rounded-sm" onClick={openCreate}>
                <Plus className="w-4 h-4" />
                New Education
              </Button>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-6">
            {educations?.map((education) => (
              <div key={education.id}>
                <EducationCard
                  education={education}
                  isAdmin={isAdmin}
                  onEdit={openEdit}
                />
              </div>
            ))}
          </div>
        </AdminContentWrapper>
      </section>

      {/* Create Edit Education */}
      {isAdmin && (
        <DialogWrapper
          title={isEditMode ? "Edit Education" : "New Education"}
          isOpen={isDialogOpen}
          onOpenChange={handleClose}
          className="h-fit"
        >
          <EducationForm
            educationId={selected?.id}
            initialValues={initialValues}
            onClose={handleClose}
          />
        </DialogWrapper>
      )}
    </>
  );
}
