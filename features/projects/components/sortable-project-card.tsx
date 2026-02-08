"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";
import { ProjectsType } from "../server/get-projects";

type Project = ProjectsType[number];

interface SortableProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  disabled: boolean;
}

export function SortableProjectCard({
  project,
  onOpen,
  disabled,
}: SortableProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project?.id, disabled });

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
        isDragging && "opacity-80",
      )}
    >
      <ProjectCard project={project} onOpen={onOpen} />
    </div>
  );
}
