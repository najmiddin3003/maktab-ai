import { AlertTriangleIcon } from "./icons";

export function AttentionPanel() {
  return (
    <section className="flex min-h-[220px] flex-col rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm lg:col-span-2">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">Darhol e'tibor kerak</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Eng yuqori xavf balli o'quvchilar</p>
          </div>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
        >
          Barchasi →
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/40 px-4 py-3">
          <span className="h-3 w-3 shrink-0 rounded-full bg-amber-500 ring-4 ring-amber-100" />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-slate-900 dark:text-slate-50">32 APK</p>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">7-A — Uyqu: 8h — Juda yomon</p>
          </div>
          <span className="shrink-0 text-2xl font-bold tabular-nums text-slate-900 dark:text-slate-50">25</span>
        </div>
      </div>
    </section>
  );
}
