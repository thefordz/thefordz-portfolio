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
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useTransition, useState, useEffect } from "react";
import { toast } from "sonner";
import { reorderProjects } from "../server/reorder-projects";
import { SortableProjectCard } from "./sortable-project-card";
import { ProjectsType } from "../server/get-projects";
import { ProjectType } from "../server/get-project";

interface Props {
  projects: ProjectsType;
  onOpen: (project: ProjectType) => void;
}

export function ProjectsSortable({ projects, onOpen }: Props) {
  const [items, setItems] = useState(projects);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setItems(projects);
  }, [projects]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((p) => p.id === active.id);
    const newIndex = items.findIndex((p) => p.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    const prevItems = items;

    setItems(newItems);

    startTransition(async () => {
      try {
        await reorderProjects(newItems.map((p) => p.id));
        toast.success("Project order updated");
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
        items={items.map((p) => p.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((project) => (
            <SortableProjectCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              disabled={isPending}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
