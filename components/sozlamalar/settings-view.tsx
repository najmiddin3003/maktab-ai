"use client";

import { useState } from "react";

function Toggle({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  id: string;
}) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
        checked ? "bg-teal-500" : "bg-slate-200"
      }`}
    >
      <span
        className={`h-6 w-6 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function SettingsView() {
  const [smsOn, setSmsOn] = useState(true);
  const [riskCap, setRiskCap] = useState(61);
  const [schoolName, setSchoolName] = useState("14-maktab");

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
      <div className="divide-y divide-slate-100">
        <div className="flex flex-col gap-4 py-6 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900">SMS ogohlantirishlari</h2>
            <p className="mt-1 text-sm text-slate-500">Yuqori xavf aniqlanganda ota-onaga</p>
          </div>
          <Toggle id="sms-toggle" checked={smsOn} onChange={setSmsOn} />
        </div>

        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-slate-900">Xavf chegarasi (Yuqori)</h2>
            <p className="mt-1 text-sm text-slate-500">Hozirgi chegara: {riskCap} ball</p>
          </div>
          <div className="w-full max-w-xs shrink-0 sm:max-w-sm">
            <input
              type="range"
              min={0}
              max={100}
              value={riskCap}
              onChange={(e) => setRiskCap(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-teal-500"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={riskCap}
              aria-label="Yuqori xavf chegarasi"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900">Maktab nomi</h2>
          </div>
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full max-w-xs rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 shadow-sm outline-none ring-teal-500/20 focus:border-teal-500 focus:ring-2 sm:max-w-sm"
            autoComplete="organization"
          />
        </div>
      </div>
    </section>
  );
}
