import { DashboardHeader, formatHeaderTime } from "@/components/dashboard/dashboard-header";
import { ReportsView } from "@/components/hisobotlar/reports-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hisobotlar",
};

export default function HisobotlarPage() {
  const stamp = formatHeaderTime({ withSeconds: true });
  return (
    <>
      <DashboardHeader
        title="Hisobotlar"
        description={`Hisobot generatsiyasi - ${stamp}`}
      />
      <ReportsView />
    </>
  );
}
