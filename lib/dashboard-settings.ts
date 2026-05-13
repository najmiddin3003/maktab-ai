export const DASHBOARD_SETTINGS_KEY = "maktab_dashboard_settings";

export type DashboardSettings = {
  schoolName: string;
  /** Yuqori xavf chegarasi (0–100) */
  riskCap: number;
  /** SMS ogohlantirishlari yoqilganmi */
  smsOn: boolean;
};

export const DASHBOARD_SETTINGS_DEFAULT: DashboardSettings = {
  schoolName: "14-maktab",
  riskCap: 61,
  smsOn: true,
};

function clampRisk(n: number): number {
  if (!Number.isFinite(n)) return DASHBOARD_SETTINGS_DEFAULT.riskCap;
  return Math.min(100, Math.max(0, Math.round(n)));
}

function normalize(parsed: unknown): DashboardSettings {
  if (!parsed || typeof parsed !== "object") return DASHBOARD_SETTINGS_DEFAULT;
  const p = parsed as Record<string, unknown>;
  const school =
    typeof p.schoolName === "string" && p.schoolName.trim().length > 0
      ? p.schoolName.trim().slice(0, 120)
      : DASHBOARD_SETTINGS_DEFAULT.schoolName;
  return {
    schoolName: school,
    riskCap: clampRisk(typeof p.riskCap === "number" ? p.riskCap : Number(p.riskCap)),
    smsOn: typeof p.smsOn === "boolean" ? p.smsOn : DASHBOARD_SETTINGS_DEFAULT.smsOn,
  };
}

const listeners = new Set<() => void>();

export function subscribeDashboardSettings(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (typeof window === "undefined") {
    return () => listeners.delete(onStoreChange);
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === DASHBOARD_SETTINGS_KEY || e.key === null) onStoreChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function notify() {
  for (const cb of listeners) cb();
}

/** SSR: doim default */
export function loadDashboardSettings(): DashboardSettings {
  if (typeof window === "undefined") return DASHBOARD_SETTINGS_DEFAULT;
  try {
    const raw = window.localStorage.getItem(DASHBOARD_SETTINGS_KEY);
    if (!raw) return DASHBOARD_SETTINGS_DEFAULT;
    return normalize(JSON.parse(raw) as unknown);
  } catch {
    return DASHBOARD_SETTINGS_DEFAULT;
  }
}

export function saveDashboardSettings(next: DashboardSettings) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DASHBOARD_SETTINGS_KEY, JSON.stringify(next));
    notify();
  } catch {
    // disk to‘liq / private mode va hokazo
  }
}
