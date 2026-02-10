import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerAuth } from "@/features/auth/server/get-server-session";
import { getProfileForSidebar } from "@/features/home/server/get-profile";
import { AdminViewToggle } from "@/features/layout/components/admin-view-toggle";
import { AppSidebar } from "@/features/layout/components/app-sidebar";
import { Header } from "@/features/layout/components/header";
import { cookies } from "next/headers";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await getProfileForSidebar();

  const cookieStore = await cookies();
  const viewMode = cookieStore.get("admin_view")?.value;
  const { hasAdminAccess } = await getServerAuth();
  const isAdmin = hasAdminAccess && viewMode !== "preview";

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <main className="w-full">
        {hasAdminAccess && <AdminViewToggle isAdmin={isAdmin} />}
        <Header />
        <div className=" max-w-7xl mx-auto my-6">{children}</div>
      </main>

      {/* <AppSidebarRight profile={profile} /> */}
    </SidebarProvider>
  );
}
