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
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { SocialIcon } from "react-social-icons";
import { GripVertical, Trash2 } from "lucide-react";

import { useFormContext, useFieldArray } from "react-hook-form";

import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProfileFormValues } from "../../lib/profile.validation";

export function SocialLinksField() {
  const form = useFormContext<ProfileFormValues>();

  const socials = useFieldArray({
    control: form.control,
    name: "socials",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = socials.fields.findIndex((f) => f.id === active.id);
    const newIndex = socials.fields.findIndex((f) => f.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    socials.move(oldIndex, newIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={socials.fields.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {socials.fields.map((field, index) => (
            <SortableSocialItem
              key={field.id}
              id={field.id}
              index={index}
              onRemove={() => socials.remove(index)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

type SortableSocialItemProps = {
  id: string;
  index: number;
  onRemove: () => void;
};

function SortableSocialItem({ id, index, onRemove }: SortableSocialItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-md border bg-background p-2"
    >
      <Button
        variant={"ghost"}
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground"
      >
        <GripVertical className="h-4 w-4" />
      </Button>

      <FormField
        control={undefined}
        name={`socials.${index}.url`}
        render={({ field }) => (
          <>
            <SocialIcon
              url={field.value || "https://example.com"}
              style={{ width: 28, height: 28 }}
            />
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="https://youtube.com/..." {...field} />
              </FormControl>
            </FormItem>
          </>
        )}
      />

      <Button type="button" variant="ghost" size="icon" onClick={onRemove}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
