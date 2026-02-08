"use client";

import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { ImagePlus, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";
import { DialogWrapper } from "@/features/shared/components/dialog-wrapper";
import { errorToast } from "@/features/shared/errors/toast.error";
import {
  MAX_PROJECT_IMAGES,
  ProjectFormValues,
} from "../../lib/project.validation";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProjectImagesField() {
  const form = useFormContext<ProjectFormValues>();
  const images = form.watch("images") ?? [];
  const [isOpenUploader, setIsOpenUploader] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 7 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.indexOf(active.id as string);
    const newIndex = images.indexOf(over.id as string);
    if (oldIndex === -1 || newIndex === -1) return;

    form.setValue("images", arrayMove(images, oldIndex, newIndex));
  }

  const canUpload = images.length < MAX_PROJECT_IMAGES;

  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel>
            Project Images ({images.length}/{MAX_PROJECT_IMAGES})
          </FormLabel>

          <FormControl>
            <div className="space-y-4">
              {canUpload && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpenUploader(true)}
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Upload Images
                </Button>
              )}

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={onDragEnd}
              >
                <SortableContext
                  items={images}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="flex flex-col gap-3">
                    {images.map((img, index) => (
                      <SortableImage
                        key={img}
                        id={img}
                        src={img}
                        index={index}
                        onRemove={() =>
                          field.onChange(
                            images.filter((image) => image !== img),
                          )
                        }
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <DialogWrapper
                isOpen={isOpenUploader}
                title="Upload Images"
                onOpenChange={setIsOpenUploader}
                className="w-[80%] h-[80%] p-8"
              >
                <UploadDropzone
                  className="w-full h-full"
                  endpoint="multiImage"
                  config={{ mode: "auto" }}
                  onUploadBegin={() =>
                    toast.loading("Uploading...", {
                      id: "upload-project-images",
                    })
                  }
                  onUploadError={(error) =>
                    errorToast(error, "upload-project-images")
                  }
                  onClientUploadComplete={(res) => {
                    const urls = res?.map((f) => f.ufsUrl) ?? [];

                    const remaining = MAX_PROJECT_IMAGES - images.length;
                    const allowed = urls.slice(0, remaining);

                    if (urls.length > remaining) {
                      toast.error(
                        `Maximum ${MAX_PROJECT_IMAGES} images allowed`,
                      );
                    }

                    field.onChange([...images, ...allowed]);
                    toast.success("Images uploaded successfully", {
                      id: "upload-project-images",
                    });

                    setIsOpenUploader(false);
                  }}
                />
              </DialogWrapper>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

interface SortableImageProps {
  id: string;
  src: string;
  index: number;
  onRemove: () => void;
}

function SortableImage({ id, src, index, onRemove }: SortableImageProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isPreview = index === 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center gap-4 rounded-lg bg-secondary p-1 transition-all cursor-grab active:cursor-grabbing select-none",
        "border-2 border-border",
      )}
    >
      <div className="relative w-28 aspect-video rounded-md overflow-hidden bg-black/5 shrink-0">
        <Image src={src} alt="project" fill className="object-cover" />
      </div>

      <div className="flex flex-1">
        <p className="text-sm font-medium truncate">
          {isPreview ? "Preview Image" : `Image ${index + 1}`}
        </p>
      </div>

      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}
