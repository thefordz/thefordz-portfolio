import { cn } from "@/lib/utils";

interface AdminSectionWrapperProps {
  isAdmin?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function AdminContentWrapper({
  isAdmin,
  children,
  className,
  title,
  description,
}: AdminSectionWrapperProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl transition w-full",
        "px-6 md:px-10 ",
        isAdmin &&
          "group hover:bg-secondary/50 hover:shadow-lg border border-transparent hover:border-border",
        className,
      )}
    >
      <div className={cn("py-9 md:py-12 lg:py-15 space-y-6")}>
        {title && (
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
