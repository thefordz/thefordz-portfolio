import { auth } from "@/lib/auth";
import { ADMIN_EMAIL } from "@/lib/constants";
import { headers } from "next/headers";

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function getServerAuth() {
  const session = await getServerSession();

  const hasAdminAccess = session?.user?.email === ADMIN_EMAIL;

  return {
    session,
    user: session?.user ?? null,
    hasAdminAccess,
  };
}
