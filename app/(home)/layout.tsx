import { SidebarProvider } from "@/components/ui/sidebar";
import { getProfileForSidebar } from "@/features/home/server/get-profile";
import { AppSidebar } from "@/features/layout/components/app-sidebar";
import { Header } from "@/features/layout/components/header";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfileForSidebar();

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <main className="w-full">
        <Header />
        <div className="px-6 max-w-7xl mx-auto py-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
