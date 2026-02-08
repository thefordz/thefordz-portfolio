"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleAdminView } from "@/features/auth/server/toggle-admin-view";

export function AdminViewToggle() {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      await toggleAdminView();
      window.location.reload();
    });
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleToggle}
      disabled={isPending}
      className="fixed bottom-6 right-6 z-50"
    >
      Toggle Admin View
    </Button>
  );
}
