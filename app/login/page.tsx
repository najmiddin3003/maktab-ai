import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kirish",
};

function LoginFallback() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-slate-100 dark:bg-slate-950">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-teal-200 dark:bg-teal-900" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
