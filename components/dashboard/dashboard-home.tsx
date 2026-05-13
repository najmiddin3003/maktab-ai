import { AttentionPanel } from "./attention-panel";
import { ClassesPanel } from "./classes-panel";
import { DashboardHeader } from "./dashboard-header";
import { EventsPanel } from "./events-panel";
import { RiskDonut } from "./risk-donut";
import { SummaryCards } from "./summary-cards";
import { WeeklyTrend } from "./weekly-trend";

export function DashboardHome() {
  return (
    <>
      <DashboardHeader title="Dashboard" />
      <SummaryCards />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <AttentionPanel />
        <RiskDonut />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ClassesPanel />
        <WeeklyTrend />
        <EventsPanel />
      </div>
    </>
  );
}
