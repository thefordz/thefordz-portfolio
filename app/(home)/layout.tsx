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
      <main className="w-full mb-24">
        <Header />
        <div className=" max-w-7xl mx-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
