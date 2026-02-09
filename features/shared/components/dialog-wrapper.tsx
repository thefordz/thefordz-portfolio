"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DialogContentDialogProps {
  title?: string;
  description?: string;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function DialogWrapper({
  children,
  title,
  description,
  isOpen,
  onOpenChange,
  className,
}: DialogContentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "sm:max-w-5xl bg-secondary w-[90%] px-0 gap-0  h-full max-h-[80%] flex flex-col pb-0",
          className,
        )}
      >
        <DialogHeader
          className={cn(!title && "sr-only", " border-b pb-5 px-6")}
        >
          <DialogTitle className={cn(!title && "sr-only")}>{title}</DialogTitle>
          <DialogDescription className={cn(!description && "sr-only")}>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-full flex flex-col overflow-y-auto px-6 pt-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
