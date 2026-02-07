import { SidebarFooter } from "@/components/ui/sidebar";

export function SidebarFooterContent() {
  return (
    <SidebarFooter className="text-xs text-muted-foreground h-16  flex items-center justify-center">
      &copy; {new Date().getFullYear()}
    </SidebarFooter>
  );
}
