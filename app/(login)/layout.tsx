import { getServerSession } from "@/features/auth/server/get-server-session";
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
    <main className="w-full h-screen  flex items-center justify-center">
      <div className="px-6">{children}</div>
    </main>
  );
}
