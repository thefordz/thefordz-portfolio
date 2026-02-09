"use client";

import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Edit, ExternalLink, Github, Loader, Star, Trash } from "lucide-react";
import { ProjectsType } from "../server/get-projects";
import { PREVIEW_IMAGE } from "@/lib/constants";
import { ProjectImagesCarousel } from "./project-images-carousel";
import { useTransition } from "react";
import { deleteProject } from "../server/delete-project";
import { toast } from "sonner";
import { errorToast } from "@/features/shared/errors/toast.error";
import { cn } from "@/lib/utils";

type Project = ProjectsType[number];

interface Props {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
}

export function ProjectDetailDialog({
  project,
  isOpen,
  onOpenChange,
  isAdmin,
  onEdit,
}: Props) {
  const [isPending, startTransition] = useTransition();

  if (!project) return null;

  const images = project.images?.length ? project.images : [PREVIEW_IMAGE];

  function handleDelete() {
    if (project?.id)
      startTransition(async () => {
        try {
          await deleteProject(project?.id);
          toast.success("Project deleted");
          onOpenChange(false);
        } catch (error) {
          errorToast(error);
        }
      });
  }

  const groupedSkills = project.skills?.reduce(
    (acc, ps) => {
      const category = ps.skill.category;

      if (!acc[category.id]) {
        acc[category.id] = {
          name: category.name,
          order: category.order,
          skills: [],
        };
      }

      acc[category.id].skills.push(ps.skill);

      return acc;
    },
    {} as Record<
      string,
      {
        name: string;
        order: number;
        skills: (typeof project.skills)[number]["skill"][];
      }
    >,
  );

  const sortedCategories = groupedSkills
    ? Object.values(groupedSkills).sort((a, b) => a.order - b.order)
    : [];

  return (
    <DialogWrapper
      title=""
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="w-[95%] max-w-6xl"
    >
      <div className="max-h-[85vh] overflow-y-auto">
        <div className="space-y-10 p-4 md:p-8">
          <div className="relative">
            <ProjectImagesCarousel images={images} />

            {isAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                {onEdit && (
                  <Button
                    variant="secondary"
                    onClick={() => onEdit(project)}
                    className="h-9"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="hidden md:inline">Edit</span>
                  </Button>
                )}

                <Button
                  variant="destructive"
                  // onClick={() => console.log("Test")}
                  onClick={handleDelete}
                  // disabled={isPending}
                  className="h-9"
                >
                  {isPending ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                  <span className="hidden md:inline">
                    {isPending ? "Deleting..." : "Delete"}
                  </span>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Project
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {project.title}
                </h2>

                <Badge variant="secondary" className="rounded-sm">
                  {project.projectType}
                </Badge>

                {isAdmin && project.isFeatured && (
                  <Badge className="gap-1 rounded-sm">
                    <Star className="h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            {project.summary && (
              <div className="ml-4 border-l-4 pl-2">
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl">
                  {project.summary}
                </p>
              </div>
            )}
            {(project.liveUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3 pt-1">
                {project.liveUrl && (
                  <Button asChild className="rounded-sm">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}

                {project.githubUrl && (
                  <Button asChild variant="outline" className="rounded-sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
              </div>
            )}
          </div>

          {sortedCategories.length > 0 && (
            <div className="space-y-4">
              <Separator />

              <div className="space-y-2">
                <h3 className="text-base font-semibold tracking-tight">
                  Technologies Used
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tools and frameworks used in this project.
                </p>
              </div>

              <div className="space-y-5">
                {sortedCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold tracking-tight">
                        {category.name}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {category.skills.length} items
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className={cn(
                            "px-2.5 py-1 text-xs",
                            "rounded-sm border bg-muted/40",
                          )}
                          title={[
                            skill.level ? `Level: ${skill.level}` : null,
                            skill.yearsOfExperience
                              ? `Experience: ${skill.yearsOfExperience} years`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(" • ")}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="space-y-4">
              <Separator />

              <div className="space-y-2">
                <h3 className="text-base font-semibold tracking-tight">
                  About This Project
                </h3>
                <p className="text-sm text-muted-foreground">
                  More context, key decisions, and what I built.
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none">
                {project.description}
              </div>
            </div>
          )}
        </div>
      </div>
    </DialogWrapper>
  );
}
