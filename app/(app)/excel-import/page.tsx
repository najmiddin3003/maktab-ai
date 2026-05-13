import { DashboardHeader, formatHeaderTime } from "@/components/dashboard/dashboard-header";
import { ExcelImportView } from "@/components/excel-import/excel-import-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excel Import",
};

export default function ExcelImportPage() {
  const stamp = formatHeaderTime({ withSeconds: true });
  return (
    <>
      <DashboardHeader
        title="Excel Import"
        description={`Ma'lumot yuklash - ${stamp}`}
        variant="minimal"
      />
      <ExcelImportView />
    </>
  );
}
