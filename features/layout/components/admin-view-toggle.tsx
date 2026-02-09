"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toggleAdminView } from "@/features/auth/server/toggle-admin-view";
import { useRouter } from "next/navigation";
import { Eye, Shield } from "lucide-react";

interface AdminViewToggleProps {
  isAdmin: boolean;
}

export function AdminViewToggle({ isAdmin }: AdminViewToggleProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleAdminView();
      router.refresh();
    });
  }

  return (
    <Button
      size="sm"
      variant={isAdmin ? "default" : "outline"}
      onClick={handleToggle}
      disabled={isPending}
      className="fixed bottom-6 right-6 z-50 shadow-lg"
    >
      {isAdmin ? (
        <>
          <Shield className="h-4 w-4 mr-2" />
          Admin Mode
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 mr-2" />
          Preview Mode
        </>
      )}
    </Button>
  );
}
