"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <>
      <CardHeader className="text-center space-y-2 ">
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription>Owner access only.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <Button
          size="lg"
          className="w-full"
          onClick={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
            })
          }
        >
          Sign in with Google
        </Button>

        {error === "no_permission" && (
          <Alert variant="destructive">
            <AlertDescription className="text-center">
              You don&apos;t have permission to sign in.
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-2">
          <Link
            href="/"
            className="block text-center text-sm text-muted-foreground hover:underline"
          >
            Back to home
          </Link>
        </div>
      </CardContent>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-sm">
        <Suspense
          fallback={
            <>
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-xl">Login</CardTitle>
                <CardDescription>Owner access only.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Button size="lg" className="w-full" disabled>
                  Loading...
                </Button>
              </CardContent>
            </>
          }
        >
          <LoginContent />
        </Suspense>
      </Card>
    </div>
  );
}
