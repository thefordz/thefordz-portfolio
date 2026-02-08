"use server";

import { cookies } from "next/headers";

export async function toggleAdminView() {
  const cookieStore = cookies();
  const current = (await cookieStore).get("admin_view")?.value;

  if (current === "preview") {
    (await cookieStore).set("admin_view", "admin");
  } else {
    (await cookieStore).set("admin_view", "preview");
  }
}
