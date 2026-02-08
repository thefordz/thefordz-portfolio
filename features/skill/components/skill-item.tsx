"use client";

import { useTransition } from "react";
import { deleteSkill } from "@/features/skill/server/delete-skill";
import { toast } from "sonner";
import { errorToast } from "@/features/shared/errors/toast.error";
import { X } from "lucide-react";
import { SkillItemType } from "../lib/skill.types";

interface Props {
  skill: SkillItemType;
  isAdmin?: boolean;
}

export function SkillItem({ skill, isAdmin }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteSkill(skill.id);
        toast.success("Skill deleted");
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <div className="group relative flex items-center gap-2 px-3 py-1.5 text-sm border bg-background hover:bg-muted/40 transition">
      <span className="font-medium">{skill.name}</span>

      {(skill.level || skill.yearsOfExperience) && (
        <span className="text-xs text-muted-foreground">
          {skill.level?.toLowerCase()}
          {skill.level && skill.yearsOfExperience && " · "}
          {skill.yearsOfExperience ? `${skill.yearsOfExperience}y` : null}
        </span>
      )}

      {isAdmin && (
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="absolute -top-2 -right-2  w-5 h-5 bg-destructive text-primary-foreground rounded-full flex items-center justify-center"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
