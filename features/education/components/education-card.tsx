"use client";

import { useState, useTransition } from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { format, differenceInMonths } from "date-fns";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { errorToast } from "@/features/shared/errors/toast.error";

import { deleteEducation } from "../server/delete-education";
import { EducationType } from "../lib/education.types";

interface Props {
  education: EducationType;
  isAdmin: boolean;
  onEdit?: (education: EducationType) => void;
}

export function EducationCard({ education, isAdmin, onEdit }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const startDate = education.startYear ? new Date(education.startYear) : null;

  const endDate = education.endYear ? new Date(education.endYear) : null;

  const start = startDate ? format(startDate, "MMM yyyy") : "";
  const end = endDate ? format(endDate, "MMM yyyy") : "Present";

  let duration = "";
  if (startDate && endDate) {
    const totalMonths = differenceInMonths(endDate, startDate);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    duration = [
      years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "",
      months > 0 ? `${months} mo${months > 1 ? "s" : ""}` : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteEducation(education.id);
        toast.success("Education deleted");
      } catch (error) {
        errorToast(error);
      }
    });
  }

  return (
    <div className="border rounded-none p-6 space-y-5 bg-background hover:bg-muted/20 transition-colors">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            {education.degree}
          </h3>

          <p className="text-sm text-muted-foreground">
            {education.institution}
            {education.field && ` · ${education.field}`}
          </p>

          {(start || end) && (
            <p className="text-sm text-muted-foreground mt-1">
              {start} – {end}
              {duration && (
                <span className="ml-2 text-foreground font-medium">
                  ({duration})
                </span>
              )}
            </p>
          )}
        </div>

        {isAdmin && (
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit?.(education)}
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

      {/* Expand */}
      {education.description && (
        <>
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

          {open && (
            <div className="border-t pt-5 text-sm">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {education.description}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
