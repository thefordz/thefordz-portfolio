import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 w-full sticky top-0 bg-background z-10 border-b">
      <div className="h-full w-full px-6 flex items-center justify-between">
        <SidebarTrigger />
      </div>
    </header>
  );
}
