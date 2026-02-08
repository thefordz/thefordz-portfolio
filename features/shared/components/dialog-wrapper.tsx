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
          "sm:max-w-5xl w-[90%] h-full max-h-[80%] flex flex-col pb-0",
          className,
        )}
      >
        <DialogHeader className={cn(!title && "sr-only", " border-b pb-5")}>
          <DialogTitle className={cn(!title && "sr-only")}>{title}</DialogTitle>
          <DialogDescription className={cn(!description && "sr-only")}>
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>{" "}
    </Dialog>
  );
}
