"use client";

import { DownloadIcon } from "@/components/dashboard/icons";

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function ShablonCard() {
  const handleDownload = () => {
    const headers = ["ism_familiya", "sinf", "telefon", "izoh"];
    const csv = "\ufeff" + headers.join(";") + "\n";
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    triggerDownload(blob, "maktab-import-shablon.csv");
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h2 className="text-lg font-semibold text-slate-900">Excel Shablon</h2>
        <p className="mt-1 text-sm text-slate-500">
          Import uchun talab qilinadigan ustunlar bilan tayyor shablon. Excel yoki boshqa dasturda
          to‘ldirib, keyingi bosqichda yuklang.
        </p>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600"
      >
        <DownloadIcon className="h-4 w-4" />
        Shablon yuklab olish
      </button>
    </section>
  );
}
