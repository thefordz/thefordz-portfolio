import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerAuth } from "@/features/auth/server/get-server-session";
import { getProfileForSidebar } from "@/features/home/server/get-profile";
import { AdminViewToggle } from "@/features/layout/components/admin-view-toggle";
import { AppSidebar } from "@/features/layout/components/app-sidebar";
import { Header } from "@/features/layout/components/header";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfileForSidebar();

  const { hasAdminAccess } = await getServerAuth();

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <main className="w-full mb-24">
        {hasAdminAccess && <AdminViewToggle />}
        <Header />
        <div className=" max-w-7xl mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
