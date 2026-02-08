"use client";

import Image from "next/image";
import { ProjectsType } from "../server/get-projects";
import { PREVIEW_IMAGE } from "@/lib/constants";

type Project = ProjectsType[number];

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const previewImage =
    project.images?.length > 0 ? project.images[0] : PREVIEW_IMAGE;

  const hasLinks = project.liveUrl || project.githubUrl;

  return (
    <div
      onClick={() => onOpen(project)}
      className="group/card cursor-pointer flex flex-col space-y-3"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={previewImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out scale-105 group-hover/card:scale-100"
        />

        {project.projectType && (
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded text-[11px] uppercase tracking-wide text-white">
            {project.projectType}
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <h3 className="text-md font-medium tracking-tight leading-snug ">
          {project.title}
        </h3>

        {hasLinks && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 hover:text-foreground transition"
              >
                Live
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 hover:text-foreground transition"
              >
                Github
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
