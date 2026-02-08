"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SkillCategoryType } from "../lib/skill.types";
import { SkillItem } from "./skill-item";
import { deleteSkillCategory } from "../server/delete-skill-cateogry";
import { errorToast } from "@/features/shared/errors/toast.error";
import { toast } from "sonner";
import { useTransition } from "react";

interface Props {
  category: SkillCategoryType;
  isAdmin?: boolean;
  onEdit?: () => void;
  onAddSkill?: () => void;
}

export function SkillCategoryItem({
  category,
  isAdmin,
  onEdit,
  onAddSkill,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteSkillCategory(category.id);
        toast.success("Category deleted");
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <div className="border bg-background p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight uppercase">
          {category.name}
        </h3>

        {isAdmin && (
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              disabled={isPending}
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-6">
        {category.skills?.map((skill) => (
          <SkillItem key={skill.id} skill={skill} isAdmin={isAdmin} />
        ))}

        {isAdmin && (
          <Button className="rounded-none " onClick={onAddSkill}>
            + Add Skill
          </Button>
        )}
      </div>
    </div>
  );
}
