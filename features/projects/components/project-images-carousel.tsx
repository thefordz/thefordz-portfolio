"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Props {
  images: string[];
}

export function ProjectImagesCarousel({ images }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img}>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted">
                <Image src={img} alt="" fill className="object-cover" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative h-20 w-32 shrink-0 overflow-hidden rounded-md border transition",
                current === index
                  ? "border-foreground"
                  : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
