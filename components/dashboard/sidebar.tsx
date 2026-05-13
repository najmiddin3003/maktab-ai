"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChartIcon,
  BellIcon,
  FileSpreadsheetIcon,
  LayoutDashboardIcon,
  SchoolIcon,
  SettingsIcon,
  UsersIcon,
} from "./icons";

function NavBadge({ count }: { count: number }) {
  return (
    <span className="ml-auto flex min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
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
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
        active
          ? "bg-teal-500/20 text-teal-300"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className="shrink-0 opacity-90">{icon}</span>
      <span className="truncate">{label}</span>
      {badge !== undefined ? <NavBadge count={badge} /> : null}
    </Link>
  );
}

type NavButtonProps = {
  icon: React.ReactNode;
  label: string;
  badge?: number;
};

function NavButton({ icon, label, badge }: NavButtonProps) {
  return (
    <span className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 opacity-80">
      <span className="shrink-0 opacity-90">{icon}</span>
      <span className="truncate">{label}</span>
      {badge !== undefined ? <NavBadge count={badge} /> : null}
    </span>
  );
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 first:mt-0">
      <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">{title}</p>
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const dashActive = pathname === "/";
  const studentsActive = pathname === "/oquvchilar";
  const excelActive = pathname === "/excel-import";

  return (
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-slate-800/80 bg-[#0f172a] text-slate-100">
      <div className="flex items-start gap-3 border-b border-slate-800/80 p-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-500/15 text-teal-400">
          <SchoolIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="truncate text-base font-semibold text-white">14-maktab</p>
          <p className="truncate text-xs text-slate-400">Chorak — 2025-2026</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
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
          <NavButton icon={<BellIcon className="h-5 w-5" />} label="Ogohlantirishlar" badge={0} />
          <NavButton icon={<BarChartIcon className="h-5 w-5" />} label="Analitika" />
          <NavButton icon={<FileSpreadsheetIcon className="h-5 w-5" />} label="Hisobotlar" />
        </NavGroup>
        <NavGroup title="Tizim">
          <NavButton icon={<SettingsIcon className="h-5 w-5" />} label="Sozlamalar" />
        </NavGroup>
      </div>

      <div className="border-t border-slate-800/80 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-800/40 px-3 py-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-semibold text-white">
            MK
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Mohinur Karimova</p>
            <p className="truncate text-xs text-slate-400">Psixolog — 14-maktab</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
