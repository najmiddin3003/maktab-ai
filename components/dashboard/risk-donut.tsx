import { PieChartIcon } from "./icons";

const segments = [
  { label: "Yuqori xavf", count: 0, color: "#ef4444" },
  { label: "O'rtacha xavf", count: 0, color: "#f59e0b" },
  { label: "Past xavf", count: 1, color: "#22c55e" },
];

export function RiskDonut() {
  const total = segments.reduce((s, x) => s + x.count, 0);

  let angle = 0;
  const stops: string[] = [];
  if (total > 0) {
    for (const seg of segments) {
      if (seg.count === 0) continue;
      const span = (seg.count / total) * 360;
      const a0 = angle;
      const a1 = angle + span;
      stops.push(`${seg.color} ${a0}deg ${a1}deg`);
      angle = a1;
    }
  }

  const diskStyle: React.CSSProperties =
    total === 0
      ? { background: "#e2e8f0" }
      : {
          background: `conic-gradient(from -90deg, ${stops.join(", ")})`,
        };

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20">
      <div className="mb-4 flex items-center gap-2">
        <PieChartIcon className="h-5 w-5 text-teal-600" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">Xavf taqsimoti</h2>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative grid h-40 w-40 shrink-0 place-items-center">
          <div
            className="col-start-1 row-start-1 h-40 w-40 rounded-full shadow-sm [mask-image:radial-gradient(farthest-side,transparent_calc(50%-11px),#000_calc(50%-10px),#000_calc(50%+10px),transparent_calc(50%+11px))] [-webkit-mask-image:radial-gradient(farthest-side,transparent_calc(50%-11px),#000_calc(50%-10px),#000_calc(50%+10px),transparent_calc(50%+11px))]"
            style={diskStyle}
            aria-hidden
          />
          <div className="pointer-events-none col-start-1 row-start-1 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{total}</span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Jami</span>
          </div>
        </div>
        <ul className="flex w-full flex-col gap-2.5 text-sm sm:max-w-[11rem]">
          {segments.map((s) => (
            <li key={s.label} className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                {s.label}
              </span>
              <span className="font-semibold text-slate-900 dark:text-slate-50">{s.count} nafar</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
