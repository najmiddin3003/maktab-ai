"use client";

import { useMemo, useState } from "react";

export type RiskLevel = "high" | "medium" | "low";

export type StudentRow = {
  id: number;
  name: string;
  className: string;
  source: string;
  risk: RiskLevel;
  score: number;
  sleep: string;
  mood: string;
  lesson: string;
  social: string;
};

const MOCK_STUDENTS: StudentRow[] = [
  {
    id: 1,
    name: "32 APK",
    className: "7-A",
    source: "APK",
    risk: "low",
    score: 25,
    sleep: "8h",
    mood: "Juda yomon",
    lesson: "Ha, barcha darslarga",
    social: "Oddiy, bir nechta do'stim bor",
  },
];

type FilterKey = "all" | RiskLevel | "apk";

const riskLabel: Record<RiskLevel, string> = {
  high: "Yuqori xavf",
  medium: "O'rtacha xavf",
  low: "Past xavf",
};

function RiskDot({ risk }: { risk: RiskLevel }) {
  const cls =
    risk === "high"
      ? "bg-red-500 ring-red-200"
      : risk === "medium"
        ? "bg-amber-500 ring-amber-200"
        : "bg-emerald-500 ring-emerald-200";
  return <span className={`inline-block h-2 w-2 shrink-0 rounded-full ring-2 ${cls}`} />;
}

function ScoreCell({ score, risk }: { score: number; risk: RiskLevel }) {
  const barColor =
    risk === "high" ? "bg-red-500" : risk === "medium" ? "bg-amber-500" : "bg-emerald-500";
  const w = Math.min(Math.max(score, 0), 100);
  return (
    <div className="flex min-w-[7rem] items-center gap-2">
      <span className="text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-50">{score}</span>
      <div className="h-2 flex-1 max-w-[6rem] overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${w}%` }} />
      </div>
    </div>
  );
}

export function StudentsView() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sortKey, setSortKey] = useState<"risk" | "score" | "name">("risk");

  const counts = useMemo(() => {
    const all = MOCK_STUDENTS.length;
    const high = MOCK_STUDENTS.filter((s) => s.risk === "high").length;
    const medium = MOCK_STUDENTS.filter((s) => s.risk === "medium").length;
    const low = MOCK_STUDENTS.filter((s) => s.risk === "low").length;
    const apk = MOCK_STUDENTS.filter((s) => s.source === "APK").length;
    return { all, high, medium, low, apk };
  }, []);

  const filtered = useMemo(() => {
    let rows = [...MOCK_STUDENTS];
    if (filter === "apk") rows = rows.filter((s) => s.source === "APK");
    else if (filter !== "all") rows = rows.filter((s) => s.risk === filter);

    const riskOrder: Record<RiskLevel, number> = { high: 0, medium: 1, low: 2 };
    rows.sort((a, b) => {
      if (sortKey === "score") return b.score - a.score;
      if (sortKey === "name") return a.name.localeCompare(b.name, "uz");
      return riskOrder[a.risk] - riskOrder[b.risk];
    });
    return rows;
  }, [filter, sortKey]);

  type Pill = { key: FilterKey; label: string; count: number; dot?: string };

  const pills: Pill[] = [
    { key: "all", label: "Barchasi", count: counts.all },
    { key: "high", label: "Yuqori", count: counts.high, dot: "bg-red-500" },
    { key: "medium", label: "O'rtacha", count: counts.medium, dot: "bg-amber-500" },
    { key: "low", label: "Past", count: counts.low, dot: "bg-emerald-500" },
    { key: "apk", label: "APK", count: counts.apk, dot: "bg-teal-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {pills.map((p) => {
          const active = filter === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setFilter(p.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-teal-500 bg-teal-500 text-white shadow-sm"
                  : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300"
              }`}
            >
              {p.dot ? (
                <span className={`h-2 w-2 rounded-full ${p.dot} ${active ? "ring-2 ring-white/40" : ""}`} />
              ) : null}
              {p.label}
              <span
                className={`tabular-nums ${active ? "text-white/90" : "text-slate-400 dark:text-slate-500"}`}
              >
                ({p.count})
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          aria-label="Saralash"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as typeof sortKey)}
          className="rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 px-3 py-2 text-sm font-medium text-slate-900 dark:text-slate-50 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/25"
        >
          <option value="risk">Xavf</option>
          <option value="score">Ball</option>
          <option value="name">Ism</option>
        </select>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Eksport
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-400">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Ism familiya</th>
                <th className="px-4 py-3">Sinf</th>
                <th className="px-4 py-3">Manba</th>
                <th className="px-4 py-3">Xavf</th>
                <th className="px-4 py-3">Ball</th>
                <th className="px-4 py-3">Uyqu</th>
                <th className="px-4 py-3">Kayfiyat</th>
                <th className="px-4 py-3">Dars</th>
                <th className="px-4 py-3">Ijtimoiy</th>
                <th className="px-4 py-3 text-right">Harakat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((s) => (
                <tr key={s.id} className="text-slate-800 dark:text-slate-200 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium tabular-nums text-slate-500">{s.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-50">{s.name}</td>
                  <td className="px-4 py-3">{s.className}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-semibold text-teal-800">
                      {s.source}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <RiskDot risk={s.risk} />
                      <span className="text-slate-700 dark:text-slate-300">{riskLabel[s.risk]}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <ScoreCell score={s.score} risk={s.risk} />
                  </td>
                  <td className="px-4 py-3 tabular-nums">{s.sleep}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{s.mood}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{s.lesson}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{s.social}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      className="rounded-lg bg-teal-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
                    >
                      Ko'rish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-slate-500">Natija topilmadi.</p>
        ) : null}
      </div>
    </div>
  );
}
