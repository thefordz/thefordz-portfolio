"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { AdminContentWrapper } from "@/features/shared/components/admin-content-wrapper";
import { SkillCategoryForm } from "@/features/skill/components/skill-cateogry-form";
import { SkillCategoriesType } from "@/features/skill/server/get-skill-categories";
import { SkillCategoryType } from "@/features/skill/lib/skill.types";
import { SkillForm } from "@/features/skill/components/skill-form";
import { SkillCategoryItem } from "@/features/skill/components/skill-category-item";

const SkillCategorySortable = dynamic(
  () =>
    import("@/features/skill/components/skill-category-sortable").then(
      (mod) => mod.SkillCategorySortable,
    ),
  {
    ssr: false,
  },
);

interface SkillSectionProps {
  categories: SkillCategoriesType;
  isAdmin: boolean;
}

export function SkillSection({ isAdmin, categories }: SkillSectionProps) {
  // Selected Skill Category
  const [selected, setSelected] = useState<SkillCategoryType | null>(null);
  const isEditMode = !!selected;

  // Create & Edit Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Selected Skill Category To Create Skill child
  const [selectedCategoryForSkill, setSelectedCategoryForSkill] =
    useState<SkillCategoryType | null>(null);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);

  function openCreate() {
    setSelected(null);
    setIsDialogOpen(true);
  }

  function openEdit(category: SkillCategoryType) {
    setSelected(category);
    setIsDialogOpen(true);
  }

  return (
    <>
      <section id="skills" className="">
        <AdminContentWrapper
          isAdmin={isAdmin}
          title="My Skills"
          description="Technologies I work with."
        >
          {isAdmin && (
            <div className="absolute top-4 right-4">
              <Button onClick={openCreate}>
                <Plus className="h-4 w-4" />
                New Skill Category
              </Button>
            </div>
          )}

          <div className="max-w-7xl mx-auto space-y-6">
            {isAdmin ? (
              <SkillCategorySortable
                categories={categories}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onAddSkill={(category) => {
                  setSelectedCategoryForSkill(category);
                  setIsSkillDialogOpen(true);
                }}
              />
            ) : (
              <div className="space-y-6">
                {categories?.map((category) => (
                  <SkillCategoryItem
                    key={category.id}
                    category={category}
                    isAdmin={isAdmin}
                    onEdit={() => openEdit(category)}
                    onAddSkill={() => {
                      setSelectedCategoryForSkill(category);
                      setIsSkillDialogOpen(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </AdminContentWrapper>
      </section>

      {/* Create && Edit Skill Category Dialog */}
      {isAdmin && (
        <DialogWrapper
          title={isEditMode ? "Edit Skill Category" : "Create Skill Category"}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          className="h-fit sm:max-w-md"
        >
          <SkillCategoryForm
            categoryId={selected?.id}
            initialValues={selected ?? undefined}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogWrapper>
      )}

      {/* Add Skill To Category */}
      {isAdmin && (
        <DialogWrapper
          title="Add Skill"
          isOpen={isSkillDialogOpen}
          onOpenChange={setIsSkillDialogOpen}
          className="h-fit sm:max-w-md"
        >
          <SkillForm
            categoryId={selectedCategoryForSkill?.id}
            onClose={() => {
              setIsSkillDialogOpen(false);
              setSelectedCategoryForSkill(null);
            }}
          />
        </DialogWrapper>
      )}
    </>
  );
}
