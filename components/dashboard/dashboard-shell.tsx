import { DashboardSidebar } from "./sidebar";
import { PageTransition } from "@/components/motion/page-transition";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-slate-100/90 dark:bg-slate-950">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden p-6 text-slate-900 dark:text-slate-100 lg:p-8">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
