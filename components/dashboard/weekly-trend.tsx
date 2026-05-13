import { CalendarIcon } from "./icons";

const days = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];

const weekly = [
  { high: 0, medium: 0, low: 0 },
  { high: 0, medium: 0, low: 0 },
  { high: 0, medium: 0, low: 0 },
  { high: 0, medium: 0, low: 0 },
  { high: 0, medium: 0, low: 3 },
  { high: 0, medium: 0, low: 0 },
  { high: 0, medium: 0, low: 0 },
];

export function WeeklyTrend() {
  const totals = weekly.map((d) => d.high + d.medium + d.low);
  const maxTotal = Math.max(...totals, 1);

  return (
    <section className="flex h-full min-h-[220px] flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-teal-600" />
        <h2 className="text-base font-semibold text-slate-900">Haftalik trend</h2>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-36 flex-1 items-end justify-between gap-2 border-b border-slate-200 px-0.5 pb-1">
          {weekly.map((d, i) => {
            const sum = d.high + d.medium + d.low;
            const colPct = sum === 0 ? 0 : Math.max((sum / maxTotal) * 100, 12);
            return (
              <div key={days[i]} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <div className="flex h-28 w-full max-w-10 flex-col justify-end">
                  <div
                    className="flex w-full flex-col overflow-hidden rounded-md border border-slate-100 bg-slate-50 shadow-inner"
                    style={{ height: `${colPct}%`, minHeight: sum ? 8 : 0 }}
                  >
                    {sum > 0 ? (
                      <>
                        {d.high > 0 ? (
                          <div className="min-h-[2px] w-full bg-red-500" style={{ flex: d.high }} />
                        ) : null}
                        {d.medium > 0 ? (
                          <div className="min-h-[2px] w-full bg-amber-500" style={{ flex: d.medium }} />
                        ) : null}
                        {d.low > 0 ? (
                          <div className="min-h-[2px] w-full bg-emerald-500" style={{ flex: d.low }} />
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
                <span className="text-[11px] font-medium text-slate-500">{days[i]}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-red-500" /> Yuqori
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-amber-500" /> O'rta
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Past
          </span>
        </div>
      </div>
    </section>
  );
}
