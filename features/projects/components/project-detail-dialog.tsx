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

  function handleDelete() {
    const confirmed = confirm(
      `Are you sure you want to delete "${project?.title}"?`,
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        if (!project?.id) return;
        await deleteProject(project?.id);
        toast.success("Project deleted successfully");
        onOpenChange(false);
      } catch (error) {
        errorToast(error);
      }
    });
  }

  const images = project.images?.length > 0 ? project.images : [PREVIEW_IMAGE];

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

            <div className="flex gap-3 absolute top-2 right-2">
              {isAdmin && onEdit && (
                <Button variant="secondary" onClick={() => onEdit(project)}>
                  <Edit />
                  <span className="hidden md:block">Edit Project</span>
                </Button>
              )}
              {isAdmin && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {isPending ? <Loader className="animate-spin" /> : <Trash />}
                  <span className="hidden md:block">
                    {isPending ? "Deleting..." : "Delete"}
                  </span>
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl md:text-3xl font-bold">
                {project.title}
              </h2>

              <Badge variant="secondary">{project.projectType}</Badge>

              {project.isFeatured && (
                <Badge className="gap-1">
                  <Star className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>

            {project.summary && (
              <p className="text-muted-foreground text-base md:text-lg">
                {project.summary}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" />
                  View Source
                </a>
              </Button>
            )}
          </div>

          <Separator />

          {/* Description */}
          {project.description && (
            <div className="prose dark:prose-invert max-w-none">
              {project.description}
            </div>
          )}

          {/* Skills */}
          {/* {project.skills?.length > 0 && ( */}
          {/*   <> */}
          {/*     <Separator /> */}
          {/*     <div className="space-y-3"> */}
          {/*       <h3 className="font-semibold text-lg">Tech Stack</h3> */}
          {/*       <div className="flex flex-wrap gap-2"> */}
          {/*         {project.skills.map((s) => ( */}
          {/*           <Badge key={s.skillId} variant="outline"> */}
          {/*             {s.skill.name} */}
          {/*           </Badge> */}
          {/*         ))} */}
          {/*       </div> */}
          {/*     </div> */}
          {/*   </> */}
          {/* )} */}
        </div>
      </div>
    </DialogWrapper>
  );
}
