// SRE / Reliability Engineering data

export const SLO_SERVICES = [
  { service: "Payments API", slo: 99.95, attainment: 99.962, errorBudgetUsed: 31, status: "ok" },
  { service: "Order Capture", slo: 99.9, attainment: 99.84, errorBudgetUsed: 78, status: "warn" },
  { service: "Customer Portal", slo: 99.5, attainment: 99.42, errorBudgetUsed: 92, status: "danger" },
  { service: "Mobile App API", slo: 99.9, attainment: 99.91, errorBudgetUsed: 44, status: "ok" },
  { service: "Billing Engine", slo: 99.9, attainment: 99.95, errorBudgetUsed: 22, status: "ok" },
  { service: "Telco Activation", slo: 99.5, attainment: 99.46, errorBudgetUsed: 88, status: "warn" },
  { service: "Inventory Sync", slo: 99.9, attainment: 99.88, errorBudgetUsed: 54, status: "ok" },
];

export const RESILIENCE_SCORES = [
  { service: "Payments API", resilience: 88, deps: 12, criticalDeps: 3 },
  { service: "Order Capture", resilience: 74, deps: 18, criticalDeps: 5 },
  { service: "Customer Portal", resilience: 62, deps: 22, criticalDeps: 7 },
  { service: "Mobile App API", resilience: 81, deps: 14, criticalDeps: 4 },
  { service: "Billing Engine", resilience: 91, deps: 9, criticalDeps: 2 },
  { service: "Telco Activation", resilience: 67, deps: 16, criticalDeps: 6 },
];

export const ERROR_BUDGET_TREND = Array.from({ length: 12 }).map((_, i) => ({
  week: `W${i + 1}`,
  payments: 100 - (i * 2 + (i % 3 === 0 ? 4 : 0)),
  order: 100 - (i * 5 + (i % 2 === 0 ? 6 : 0)),
  portal: 100 - (i * 7 + (i % 2 === 0 ? 5 : 2)),
}));

export const DEPENDENCY_RISKS = [
  { source: "Customer Portal", target: "auth-svc", risk: "high", reason: "Single region, no fallback" },
  { source: "Order Capture", target: "OrderValidator v2.18.3", risk: "high", reason: "Memory leak observed" },
  { source: "Payments API", target: "fraud-engine", risk: "medium", reason: "Latency variance 95th" },
  { source: "Telco Activation", target: "external HSS", risk: "medium", reason: "Vendor stability score 0.62" },
];
