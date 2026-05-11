// NOC / Telecom Operations data

export const NOC_OVERVIEW = {
  totalSites: 4128,
  activeSites: 4082,
  degradedSites: 32,
  downSites: 14,
  totalSubscribers: 28_400_000,
  carrierGradeAvailability: 99.987,
};

export const NETWORK_KPIS = [
  { id: "availability", label: "Network Availability", value: 99.987, unit: "%", trend: "+0.012%", status: "ok" },
  { id: "packet_loss", label: "Avg Packet Loss", value: 0.06, unit: "%", trend: "-0.01%", status: "ok" },
  { id: "latency_p95", label: "Latency p95", value: 38, unit: "ms", trend: "-4ms", status: "ok" },
  { id: "jitter", label: "Jitter p95", value: 4.2, unit: "ms", trend: "+0.3ms", status: "warn" },
  { id: "throughput", label: "Throughput", value: 84, unit: "Gbps", trend: "+12 Gbps", status: "ok" },
  { id: "outages", label: "Active Outages", value: 3, unit: "", trend: "-2", status: "warn" },
];

export const BANDWIDTH_TREND = Array.from({ length: 24 }).map((_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  utilization: 42 + Math.sin(i / 4) * 14 + (i > 17 ? 18 : 0) + (i % 3),
  capacity: 100,
}));

export const OUTAGE_CORRELATION = [
  { id: 1, site: "NYC-CORE-04", root: "Fiber cut · 3rd party", duration: 24, impact: "city" },
  { id: 2, site: "LON-EDGE-12", root: "PSU failure · redundancy held", duration: 8, impact: "site" },
  { id: 3, site: "BLR-RAN-118", root: "Power grid instability", duration: 52, impact: "metro" },
  { id: 4, site: "DXB-CORE-02", root: "Software upgrade rollback", duration: 14, impact: "regional" },
];

export const NETWORK_SEGMENTS = [
  { id: "core", label: "Core", health: 96 },
  { id: "edge", label: "Edge", health: 91 },
  { id: "ran", label: "RAN", health: 88 },
  { id: "transport", label: "Transport", health: 94 },
  { id: "subsea", label: "Subsea", health: 99 },
  { id: "satellite", label: "Satellite", health: 84 },
];
