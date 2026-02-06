import { SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/features/auth/server/get-server-session";
import { AppSidebar } from "@/features/layout/components/app-sidebar";
import { Header } from "@/features/layout/components/header";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <div className="px-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
