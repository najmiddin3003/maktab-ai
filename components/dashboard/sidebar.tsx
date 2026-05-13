"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  DASHBOARD_SETTINGS_DEFAULT,
  loadDashboardSettings,
  subscribeDashboardSettings,
} from "@/lib/dashboard-settings";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useSyncExternalStore, useState } from "react";
import {
  BarChartIcon,
  BellIcon,
  ClipboardListIcon,
  FileSpreadsheetIcon,
  LayoutDashboardIcon,
  SchoolIcon,
  SettingsIcon,
  UsersIcon,
} from "./icons";

function NavBadge({ count }: { count: number }) {
  return (
    <span className="ml-auto flex min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white shadow-sm">
      {count}
    </span>
  );
}

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
};

function NavLink({ href, icon, label, active, badge }: NavLinkProps) {
  return (
    <motion.div
      whileHover={{ x: 3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Link
        href={href}
        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
          active
            ? "bg-teal-100 text-teal-900 shadow-sm dark:bg-teal-500/20 dark:text-teal-200"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/80"
        }`}
      >
        <span className="shrink-0 opacity-90">{icon}</span>
        <span className="truncate">{label}</span>
        {badge !== undefined ? <NavBadge count={badge} /> : null}
      </Link>
    </motion.div>
  );
}

type NavButtonProps = {
  icon: React.ReactNode;
  label: string;
  badge?: number;
};

function NavButton({ icon, label, badge }: NavButtonProps) {
  return (
    <span className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-400 opacity-75 dark:text-slate-600">
      <span className="shrink-0 opacity-90">{icon}</span>
      <span className="truncate">{label}</span>
      {badge !== undefined ? <NavBadge count={badge} /> : null}
    </span>
  );
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {title}
      </p>
      <nav className="flex flex-col gap-1">{children}</nav>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const schoolLabel = useSyncExternalStore(
    subscribeDashboardSettings,
    () => loadDashboardSettings().schoolName,
    () => DASHBOARD_SETTINGS_DEFAULT.schoolName,
  );

  const dashActive = pathname === "/";
  const studentsActive = pathname === "/oquvchilar";
  const excelActive = pathname === "/excel-import";
  const reportsActive = pathname === "/hisobotlar";
  const alertsActive = pathname === "/ogohlantirishlar";
  const settingsActive = pathname === "/sozlamalar";

  const logout = useCallback(async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
      setLoggingOut(false);
    }
  }, [router]);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[272px] shrink-0 flex-col border-r border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none"
    >
      <div className="flex items-start gap-3 border-b border-slate-100 px-4 py-5 dark:border-slate-800/80">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
          <SchoolIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="truncate text-base font-semibold text-slate-900 dark:text-white">{schoolLabel}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">Chortoq — 2024-2025</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-3">
        <NavGroup title="Asosiy">
          <NavLink
            href="/"
            icon={<LayoutDashboardIcon className="h-5 w-5" />}
            label="Dashboard"
            active={dashActive}
          />
          <NavLink
            href="/oquvchilar"
            icon={<UsersIcon className="h-5 w-5" />}
            label="O'quvchilar"
            active={studentsActive}
            badge={0}
          />
          <NavLink
            href="/excel-import"
            icon={<FileSpreadsheetIcon className="h-5 w-5" />}
            label="Excel Import"
            active={excelActive}
          />
        </NavGroup>
        <NavGroup title="Monitoring">
          <NavLink
            href="/ogohlantirishlar"
            icon={<BellIcon className="h-5 w-5" />}
            label="Ogohlantirishlar"
            active={alertsActive}
            badge={0}
          />
          <NavButton icon={<BarChartIcon className="h-5 w-5" />} label="Analitika" />
          <NavLink
            href="/hisobotlar"
            icon={<ClipboardListIcon className="h-5 w-5" />}
            label="Hisobotlar"
            active={reportsActive}
          />
        </NavGroup>
        <NavGroup title="Tizim">
          <NavLink
            href="/sozlamalar"
            icon={<SettingsIcon className="h-5 w-5" />}
            label="Sozlamalar"
            active={settingsActive}
          />
        </NavGroup>
      </div>

      <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800/80">
        <ThemeToggle />
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 dark:bg-slate-900/80">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-semibold text-white shadow-sm">
            MK
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-white">Mohinur Karimova</p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">Psixolog — 14-maktab</p>
          </div>
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          disabled={loggingOut}
          onClick={logout}
          className="w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {loggingOut ? "Chiqilmoqda…" : "Chiqish"}
        </motion.button>
      </div>
    </motion.aside>
  );
}
