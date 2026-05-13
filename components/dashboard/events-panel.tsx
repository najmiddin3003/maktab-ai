import { BellIcon } from "./icons";

const events = [
  { tone: "emerald" as const, text: "APK: 32 (7-A) — Past xavf", time: "15:07" },
  { tone: "sky" as const, text: "Tizim ishga tushdi…", time: "15:05" },
];

const ring: Record<(typeof events)[number]["tone"], string> = {
  emerald: "bg-emerald-500 ring-emerald-200",
  sky: "bg-sky-500 ring-sky-200",
};

export function EventsPanel() {
  return (
    <section className="flex h-full min-h-[220px] flex-col rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <BellIcon className="h-5 w-5 text-teal-600" />
        <h2 className="text-base font-semibold text-slate-900">Hodisalar</h2>
      </div>
      <ul className="relative flex flex-1 flex-col gap-0 pl-1">
        <span className="absolute bottom-2 left-[7px] top-2 w-px bg-slate-200" aria-hidden />
        {events.map((e, i) => (
          <li key={i} className="relative flex gap-3 py-2.5 pl-0">
            <span
              className={`relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ring-2 ${ring[e.tone]}`}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-snug text-slate-800">{e.text}</p>
              <p className="mt-0.5 text-xs tabular-nums text-slate-400">{e.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
