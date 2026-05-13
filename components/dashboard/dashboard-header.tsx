import { DownloadIcon, SearchIcon } from "./icons";

export function formatHeaderTime(options?: { withSeconds?: boolean }): string {
  const d = new Date();
  return d.toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(options?.withSeconds ? { second: "2-digit" } : {}),
  });
}

type DashboardHeaderProps = {
  title: string;
  /** Bo‘sh qoldirilsa: 14-maktab · Real-vaqt monitoring · vaqt */
  description?: string;
  /** `minimal` — faqat sarlavha (Excel Import kabi ichki sahifalar) */
  variant?: "full" | "minimal";
};

export function DashboardHeader({
  title,
  description,
  variant = "full",
}: DashboardHeaderProps) {
  const meta =
    description ??
    `14-maktab · Real-vaqt monitoring · ${formatHeaderTime({ withSeconds: false })}`;

  return (
    <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{title}</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          <span className="tabular-nums">{meta}</span>
        </p>
      </div>
      {variant === "full" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/50 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Real-vaqt
          </div>
          <label className="relative flex min-w-[200px] flex-1 sm:max-w-xs">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <input
              type="search"
              placeholder="O'quvchi qidirish..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none ring-teal-500/30 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
            />
          </label>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
          >
            <DownloadIcon className="h-4 w-4" />
            Excel yuklash
          </button>
        </div>
      ) : null}
    </header>
  );
}
