"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { SkillCategoryType } from "../lib/skill.types";

interface Props {
  category: SkillCategoryType;
  children: React.ReactNode;
  disabled?: boolean;
}

export function SortableSkillCategory({ category, children, disabled }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: category.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-80 scale-[1.01]",
      )}
    >
      {children}
    </div>
  );
}
