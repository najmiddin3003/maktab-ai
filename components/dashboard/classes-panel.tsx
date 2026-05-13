import { UsersGroupIcon } from "./icons";

const classes = [{ name: "7-A", high: 0, medium: 0, low: 1 }];

export function ClassesPanel() {
  return (
    <section className="flex h-full min-h-[220px] flex-col rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <UsersGroupIcon className="h-5 w-5 text-teal-600" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">Sinflar bo'yicha</h2>
      </div>
      <ul className="flex flex-col gap-3">
        {classes.map((c) => (
          <li
            key={c.name}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40 px-3 py-2.5"
          >
            <span className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</span>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-red-600">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {c.high}
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                {c.medium}
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {c.low}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
