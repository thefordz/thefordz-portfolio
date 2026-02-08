import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface CardWrapperProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function CardWrapper({
  title,
  description,
  children,
}: CardWrapperProps) {
  return (
    <Card>
      <CardHeader className={cn(!title && "sr-only")}>
        <CardTitle className={cn(!title && "sr-only")}>{title}</CardTitle>
        <CardDescription className={cn(!title && "sr-only")}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 h-fit">{children}</CardContent>
    </Card>
  );
}
