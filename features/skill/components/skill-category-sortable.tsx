"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";

import { SkillCategoriesType } from "../server/get-skill-categories";
import { SkillCategoryType } from "../lib/skill.types";
import { SkillCategoryItem } from "./skill-category-item";
import { reorderSkillCategory } from "../server/reorder-skill-category";
import { SortableSkillCategory } from "./sortable-skill-category";

interface Props {
  categories: SkillCategoriesType;
  isAdmin?: boolean;
  onEdit?: (category: SkillCategoryType) => void;
  onAddSkill?: (category: SkillCategoryType) => void;
}

export function SkillCategorySortable({
  categories,
  isAdmin,
  onEdit,
  onAddSkill,
}: Props) {
  const [items, setItems] = useState(categories);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setItems(categories);
  }, [categories]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    const prevItems = items;

    setItems(newItems);

    startTransition(async () => {
      try {
        await reorderSkillCategory(newItems.map((i) => i.id));
        toast.success("Skill Category order updated");
      } catch {
        setItems(prevItems);
        toast.error("Failed to reorder");
      }
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-6">
          {items.map((category) => (
            <SortableSkillCategory
              key={category.id}
              category={category}
              disabled={isPending}
            >
              <SkillCategoryItem
                category={category}
                isAdmin={isAdmin}
                onEdit={() => onEdit?.(category)}
                onAddSkill={() => onAddSkill?.(category)}
              />
            </SortableSkillCategory>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
