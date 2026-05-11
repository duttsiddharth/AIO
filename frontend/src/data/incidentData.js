// Incident & MTTR data

export const INCIDENT_BUCKETS = [
  { category: "Authentication & Identity", count: 312, mttr: 24, automatable: 78 },
  { category: "Database Latency", count: 421, mttr: 38, automatable: 64 },
  { category: "Disk / Capacity", count: 168, mttr: 18, automatable: 92 },
  { category: "Network / DNS", count: 254, mttr: 32, automatable: 71 },
  { category: "Application Errors", count: 612, mttr: 42, automatable: 48 },
  { category: "Certificate Expiry", count: 88, mttr: 22, automatable: 96 },
  { category: "Kubernetes Pods", count: 197, mttr: 16, automatable: 85 },
  { category: "Queue Backpressure", count: 142, mttr: 28, automatable: 80 },
];

export const ESCALATION_FLOW = [
  { layer: "L1 NOC", incoming: 100, resolved: 32, escalated: 68 },
  { layer: "L2 Service Desk", incoming: 68, resolved: 38, escalated: 30 },
  { layer: "L3 Engineering", incoming: 30, resolved: 24, escalated: 6 },
  { layer: "Vendor / Partner", incoming: 6, resolved: 6, escalated: 0 },
];

export const SLA_HEATMAP = [
  { service: "Order Capture", week1: 99.96, week2: 99.92, week3: 99.99, week4: 99.94 },
  { service: "Payments Gateway", week1: 99.88, week2: 99.91, week3: 99.5, week4: 99.95 },
  { service: "Customer Portal", week1: 99.4, week2: 99.6, week3: 98.9, week4: 99.7 },
  { service: "Telco Activation", week1: 98.6, week2: 99.1, week3: 98.2, week4: 99.4 },
  { service: "Billing Engine", week1: 99.6, week2: 99.7, week3: 99.4, week4: 99.8 },
  { service: "Mobile App API", week1: 99.2, week2: 99.4, week3: 99.3, week4: 99.5 },
  { service: "Inventory Sync", week1: 99.7, week2: 99.6, week3: 99.5, week4: 99.8 },
];

export const TICKET_AGING = [
  { bucket: "< 1h", count: 412 },
  { bucket: "1–4h", count: 268 },
  { bucket: "4–24h", count: 154 },
  { bucket: "1–3d", count: 82 },
  { bucket: "> 3d", count: 36 },
];

export const computeMTTRProjection = ({
  incidents = 950,
  manualMinutes = 78,
  automationPct = 18,
  targetAutomationPct = 62,
  hourlyCost = 92,
}) => {
  const remainingPct = 100 - automationPct;
  const targetRemainingPct = 100 - targetAutomationPct;
  const automatedMinutes = Math.max(8, manualMinutes * 0.25);

  const currentTotalMin = incidents * ((automationPct / 100) * automatedMinutes + (remainingPct / 100) * manualMinutes);
  const projectedTotalMin = incidents * ((targetAutomationPct / 100) * automatedMinutes + (targetRemainingPct / 100) * manualMinutes);

  const minutesSaved = Math.max(0, currentTotalMin - projectedTotalMin);
  const hoursSaved = minutesSaved / 60;
  const dollarSavings = hoursSaved * hourlyCost;

  const projectedMttr = Math.round(
    (targetAutomationPct / 100) * automatedMinutes + (targetRemainingPct / 100) * manualMinutes
  );

  return {
    currentMttr: Math.round((automationPct / 100) * automatedMinutes + (remainingPct / 100) * manualMinutes),
    projectedMttr,
    mttrReductionPct: Math.round(((manualMinutes - projectedMttr) / manualMinutes) * 100),
    monthlyHoursSaved: Math.round(hoursSaved),
    annualDollarSavings: Math.round(dollarSavings * 12),
  };
};
