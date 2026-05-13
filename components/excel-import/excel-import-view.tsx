import { ExcelUploadZone } from "./excel-upload-zone";
import { ShablonCard } from "./shablon-card";

function ProcessSteps() {
  const steps = [
    {
      n: 1,
      title: "Shablon yuklab oling",
      body: "To'g'ri formatdagi Excel shabloni",
    },
    {
      n: 2,
      title: "Ma'lumot to'ldiring",
      body: "O'quvchilar ma'lumotini kiriting",
    },
    {
      n: 3,
      title: "Yuklang va tahlil qiling",
      body: "AI xavf darajalarini hisoblaydi",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {steps.map((s) => (
        <article
          key={s.n}
          className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/20 p-5 shadow-sm"
        >
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500 text-sm font-bold text-white shadow-sm">
            {s.n}
          </div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{s.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{s.body}</p>
        </article>
      ))}
    </div>
  );
}

export function ExcelImportView() {
  return (
    <div className="space-y-8">
      <ProcessSteps />
      <ShablonCard />
      <ExcelUploadZone />
    </div>
  );
}
