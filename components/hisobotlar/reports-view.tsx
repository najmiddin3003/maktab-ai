import { CalendarDayIcon, CalendarIcon, ClipboardListIcon, FloppyDiskIcon } from "@/components/dashboard/icons";
import type { ReactNode } from "react";

function oylikSubtitle(): string {
  const d = new Date();
  return `${d.toLocaleDateString("en-US", { month: "long" })} ${d.getFullYear()}`;
}

type ReportTileProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

function ReportTile({ icon, title, subtitle }: ReportTileProps) {
  return (
    <button
      type="button"
      className="flex flex-col items-start gap-3 rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 text-left shadow-sm transition-colors hover:border-teal-200 hover:bg-teal-50/40"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-teal-600 shadow-sm ring-1 ring-slate-100">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
    </button>
  );
}

export function ReportsView() {
  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-100">
          <ClipboardListIcon className="h-6 w-6" />
        </span>
        <h2 className="text-xl font-bold text-slate-900">Hisobotlar</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ReportTile
          icon={<FloppyDiskIcon className="h-6 w-6" />}
          title="Excel eksport"
          subtitle="Barcha ma'lumotlar"
        />
        <ReportTile
          icon={<CalendarIcon className="h-6 w-6" />}
          title="Haftalik hisobot"
          subtitle="Joriy hafta natijalari"
        />
        <ReportTile
          icon={<CalendarDayIcon className="h-6 w-6" day="31" />}
          title="Oylik hisobot"
          subtitle={oylikSubtitle()}
        />
      </div>
    </section>
  );
}
