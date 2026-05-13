import { DashboardHeader, formatHeaderTime } from "@/components/dashboard/dashboard-header";
import { SettingsView } from "@/components/sozlamalar/settings-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sozlamalar",
};

export default function SozlamalarPage() {
  const stamp = formatHeaderTime({ withSeconds: true });
  return (
    <>
      <DashboardHeader title="Sozlamalar" description={`Tizim konfiguratsiyasi - ${stamp}`} />
      <SettingsView />
    </>
  );
}
