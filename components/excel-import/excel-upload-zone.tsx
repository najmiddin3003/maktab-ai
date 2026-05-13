"use client";

import { ExcelChartIllustration, UploadIcon } from "@/components/dashboard/icons";
import { useCallback, useId, useRef, useState } from "react";

const ACCEPT = ".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel";
const MAX_BYTES = 10 * 1024 * 1024;

function formatSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export function ExcelUploadZone() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const pickFiles = useCallback((list: FileList | null) => {
    setError(null);
    if (!list?.length) return;
    const f = list[0];
    const okExt = /\.xlsx?$/i.test(f.name) || f.type.includes("sheet") || f.type.includes("excel");
    if (!okExt) {
      setError("Faqat .xlsx yoki .xls fayllar qabul qilinadi.");
      return;
    }
    if (f.size > MAX_BYTES) {
      setError("Fayl hajmi 10 MB dan oshmasligi kerak.");
      return;
    }
    setFile(f);
  }, []);

  const openPicker = () => inputRef.current?.click();

  return (
    <section className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Excel yuklash</h2>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          pickFiles(e.dataTransfer.files);
        }}
        className={`mt-4 rounded-2xl border-2 border-dashed transition-colors ${
          isDragging
            ? "border-teal-500 bg-teal-50/60"
            : "border-slate-200 bg-slate-50/40 hover:border-teal-300 hover:bg-teal-50/30"
        }`}
      >
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={ACCEPT}
          onChange={(e) => pickFiles(e.target.files)}
        />
        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center px-6 pb-4 pt-10 text-center"
        >
          <ExcelChartIllustration className="mb-4 h-16 w-16" />
          <p className="text-base font-medium text-slate-800">Excel faylini bu yerga tashlang</p>
          <p className="mt-2 text-sm text-slate-500">.xlsx yoki .xls — 10 MB gacha</p>
          {file ? (
            <p className="mt-3 text-sm font-medium text-teal-700">
              Tanlandi: {file.name} ({formatSize(file.size)})
            </p>
          ) : null}
          {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
        </label>
        <div className="flex justify-center px-6 pb-8">
          <button
            type="button"
            onClick={openPicker}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
          >
            <UploadIcon className="h-4 w-4 text-teal-600" />
            Namuna yuklash
          </button>
        </div>
      </div>
    </section>
  );
}
