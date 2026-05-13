import { UserGraduateIcon } from "./icons";

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${className}`}>
      {children}
    </span>
  );
}

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <UserGraduateIcon className="h-6 w-6" />
          </div>
          <Badge className="border border-slate-200 bg-slate-50 text-slate-600">APK + Excel</Badge>
        </div>
        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">1</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Jami o'quvchilar</p>
      </article>

      <article className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
            <span className="h-4 w-4 rounded-full bg-red-500 ring-4 ring-red-100" />
          </div>
          <Badge className="border border-red-200 bg-red-50 text-red-600">Diqqat!</Badge>
        </div>
        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">0</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Yuqori xavf</p>
      </article>

      <article className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
            <span className="h-4 w-4 rounded-full bg-amber-500 ring-4 ring-amber-100" />
          </div>
          <Badge className="border border-amber-200 bg-amber-50 text-amber-700">Kuzatuv</Badge>
        </div>
        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">0</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">O'rtacha xavf</p>
      </article>

      <article className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
            <span className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
          </div>
          <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">Yaxshi</Badge>
        </div>
        <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">1</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Xavfsiz</p>
      </article>
    </div>
  );
}
