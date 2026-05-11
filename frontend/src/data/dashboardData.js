// Executive Command Center mock data

export const COMMAND_KPIS = [
  { id: "transformation_score", label: "Transformation Score", value: 72, suffix: "/100", trend: "+9", direction: "up", segment: "Predictive tier" },
  { id: "operational_health", label: "Operational Health", value: 91, suffix: "%", trend: "+2.1%", direction: "up", segment: "Tier-1 services" },
  { id: "obs_maturity", label: "Observability Maturity", value: 68, suffix: "/100", trend: "+12", direction: "up", segment: "Vs 58 industry" },
  { id: "automation_coverage", label: "Automation Coverage", value: 46, suffix: "%", trend: "+18%", direction: "up", segment: "Of repetitive incidents" },
  { id: "mttr_reduction", label: "MTTR Reduction (YoY)", value: 64, suffix: "%", trend: "+8 pts", direction: "up", segment: "P1 + P2" },
  { id: "sla_compliance", label: "SLA Compliance", value: 99.84, suffix: "%", trend: "+0.12%", direction: "up", segment: "Trailing 30d" },
  { id: "ai_adoption", label: "AI Adoption", value: 58, suffix: "%", trend: "+22%", direction: "up", segment: "Use cases in prod" },
  { id: "risk_index", label: "Predictive Risk Index", value: 27, suffix: "/100", trend: "-9", direction: "down", segment: "Lower is better" },
];

export const SLA_TREND = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  sla: 99.4 + Math.min(0.55, i * 0.05) + (i === 7 ? -0.6 : 0),
  target: 99.9,
}));

export const INCIDENT_TREND = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  p1: Math.max(2, Math.round(18 - i * 1.1 + (i % 3))),
  p2: Math.max(8, Math.round(54 - i * 2.1 + (i % 4) * 2)),
  p3: Math.max(40, Math.round(180 - i * 6 + (i % 5) * 6)),
}));

export const HEATMAP_DATA = [
  ["Order", 1, 2, 1, 0, 3, 2, 1],
  ["Payments", 0, 1, 0, 2, 1, 0, 1],
  ["Portal", 2, 3, 2, 1, 4, 3, 2],
  ["Telco", 3, 4, 2, 3, 2, 3, 4],
  ["Billing", 1, 0, 1, 2, 0, 1, 0],
  ["Mobile", 2, 1, 2, 3, 1, 2, 1],
];

export const RISK_INDICATORS = [
  { id: 1, label: "Connection pool saturation · payments-api", severity: "critical", eta: "38m" },
  { id: 2, label: "Capacity exhaustion · object-store-mum-1", severity: "high", eta: "5d" },
  { id: 3, label: "Memory leak · order-capture v2.18.3", severity: "high", eta: "2.4h" },
  { id: 4, label: "Peering instability · edge-dns EU-W", severity: "medium", eta: "rolling" },
  { id: 5, label: "Queue backpressure · billing-worker", severity: "medium", eta: "6h" },
];

export const JOURNEY_PHASES = [
  { id: "p1", label: "Reactive Baseline", status: "complete", quarter: "Q1 — Last Year", description: "Tooling inventory, MTTR baseline, alert audit" },
  { id: "p2", label: "Observability Foundation", status: "complete", quarter: "Q2 — Last Year", description: "OTel rollout, unified telemetry pipeline, golden signals" },
  { id: "p3", label: "AIOps Adoption", status: "in-progress", quarter: "Q3 — This Year", description: "Anomaly detection, correlation, swarm intelligence" },
  { id: "p4", label: "Predictive Operations", status: "in-progress", quarter: "Q4 — This Year", description: "Forecast SLA, capacity, dependency risk" },
  { id: "p5", label: "Autonomous Operations", status: "planned", quarter: "Q2 — Next Year", description: "Closed-loop remediation, self-healing services" },
];
