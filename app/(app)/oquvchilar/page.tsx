import { DashboardHeader, formatHeaderTime } from "@/components/dashboard/dashboard-header";
import { StudentsView } from "@/components/students/students-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O'quvchilar",
};

export default function OquvchilarPage() {
  return (
    <>
      <DashboardHeader title="O'quvchilar" description={formatHeaderTime({ withSeconds: true })} />
      <StudentsView />
    </>
  );
}
