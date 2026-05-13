import { DashboardHeader, formatHeaderTime } from "@/components/dashboard/dashboard-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ogohlantirishlar",
};

export default function OgohlantirishlarPage() {
  return (
    <>
      <DashboardHeader
        title="Ogohlantirishlar"
        description={`So'nggi yangilanish - ${formatHeaderTime({ withSeconds: true })}`}
      />
      <div className="rounded-xl border border-slate-200/80 bg-white p-8 text-center text-slate-600 shadow-sm">
        Bu yerda ogohlantirishlar ro‘yxati ko‘rsatiladi — tez orada.
      </div>
    </>
  );
}
