import { cn } from "@/lib/utils";

interface AdminSectionWrapperProps {
  isAdmin?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function AdminContentWrapper({
  isAdmin,
  children,
  className,
  title,
}: AdminSectionWrapperProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl transition w-full",
        "px-3 md:px-10 lg:px-16",
        isAdmin &&
          "group hover:bg-secondary/50 hover:shadow-lg border border-transparent hover:border-border",
        className,
      )}
    >
      <div className={cn("py-9 md:py-12 lg:py-15 space-y-6")}>
        {title && (
          <span className="font-medium text-xl md:text-4xl ">{title}</span>
        )}

        {children}
      </div>
    </div>
  );
}
