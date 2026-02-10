"use client";

import { useState, useTransition } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { format, differenceInMonths } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExperienceWithProjects } from "../server/get-experiences";
import { ProjectDetailDialog } from "@/features/projects/components/project-detail-dialog";
import { ProjectType } from "@/features/projects/lib/project.types";
import { errorToast } from "@/features/shared/errors/toast.error";
import { toast } from "sonner";
import { deleteExperience } from "../server/delete-experience";

interface Props {
  experience: ExperienceWithProjects;
  isAdmin: boolean;
  onEdit?: (experience: ExperienceWithProjects) => void;
}

export function ExperienceCard({ experience, isAdmin, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();

  const startDate = new Date(experience.startDate);
  const endDate = experience.isCurrent
    ? new Date()
    : experience.endDate
      ? new Date(experience.endDate)
      : null;

  const start = format(startDate, "MMM yyyy");
  const end = experience.isCurrent
    ? "Present"
    : endDate
      ? format(endDate, "MMM yyyy")
      : "";

  let duration = "";
  if (endDate) {
    const totalMonths = differenceInMonths(endDate, startDate);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    duration = [
      years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "",
      months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  const skills = [
    ...new Set(
      experience.experienceProjects
        .flatMap((ep) => ep.project.skills)
        .map((ps) => ps.skill.name),
    ),
  ];

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteExperience(experience.id);
        toast.success("Experience deleted");
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <>
      <div className="border rounded-none p-6 space-y-5 bg-background hover:bg-muted/20 transition-colors">
        <div className="flex justify-between items-start gap-4 capitalize">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              {experience.role}
            </h3>

            <p className="text-sm text-muted-foreground capitalize">
              {experience.company} ·{" "}
              {experience.employment.replace("_", " ").toLowerCase()}
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              {start} – {end}
              {duration && (
                <span className="ml-2 text-foreground font-medium">
                  ({duration})
                </span>
              )}
            </p>
          </div>

          {isAdmin && (
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit?.(experience)}
                className="rounded-none"
              >
                <Pencil className="h-4 w-4" />
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

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 8).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="rounded-none text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Expand Button */}
        <Button
          variant="ghost"
          size="sm"
          className="px-0 rounded-none text-sm"
          onClick={() => setOpen(!open)}
        >
          {open ? "Hide details" : "View details"}
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>

        {/* Details */}
        {open && (
          <div className="border-t pt-5 space-y-6 text-sm">
            <div>
              <h4 className="font-medium mb-2">Responsibilities</h4>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {experience.responsibilities}
              </p>
            </div>

            {experience.achievements && (
              <div>
                <h4 className="font-medium mb-2">Key Achievements</h4>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {experience.achievements}
                </p>
              </div>
            )}

            {experience.experienceProjects.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Related Projects</h4>

                <div className="flex flex-wrap gap-2">
                  {experience.experienceProjects.map((ep) => (
                    <Button
                      key={ep.project.id}
                      variant="outline"
                      size="sm"
                      className="rounded-none text-xs"
                      onClick={() => setSelectedProject(ep.project)}
                    >
                      {ep.project.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Project Dialog */}
      {selectedProject && (
        <ProjectDetailDialog
          project={selectedProject}
          isOpen={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
}
