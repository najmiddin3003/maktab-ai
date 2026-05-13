import { DashboardSidebar } from "./sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full bg-slate-100/80">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden p-6 lg:p-8">{children}</main>
    </div>
  );
}
