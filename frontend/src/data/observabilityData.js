// Observability Architecture Generator data

export const VENDOR_LIBRARY = [
  {
    id: "splunk",
    name: "Splunk ITSI",
    category: "Premium Enterprise",
    strengths: ["IT service intelligence", "Enterprise security", "Mature ecosystem"],
    caveats: ["License cost at scale", "Ingest pricing model"],
    bestFor: ["Regulated industries", "ITSI maturity", "Hybrid environments"],
    coverage: { logs: 95, metrics: 80, traces: 65, events: 90 },
  },
  {
    id: "dynatrace",
    name: "Dynatrace",
    category: "AIOps Native",
    strengths: ["Smartscape topology", "Davis AI causation", "Full-stack APM"],
    caveats: ["Closed agent (OneAgent)", "Premium pricing"],
    bestFor: ["AIOps-led ops", "Causation-grade RCA", "Modern enterprise"],
    coverage: { logs: 80, metrics: 95, traces: 95, events: 90 },
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Cloud Native",
    strengths: ["Broad integration catalog", "Unified UI", "Fast time-to-value"],
    caveats: ["Custom metric cost", "Multi-org governance"],
    bestFor: ["Cloud-first", "Microservices", "Developer-centric ops"],
    coverage: { logs: 88, metrics: 93, traces: 90, events: 80 },
  },
  {
    id: "otel",
    name: "OpenTelemetry",
    category: "Open Standard",
    strengths: ["Vendor neutral", "Standardized telemetry", "Future-proof"],
    caveats: ["Self-managed pipeline", "Engineering investment"],
    bestFor: ["Tool rationalization", "Vendor independence", "Polyglot stacks"],
    coverage: { logs: 75, metrics: 90, traces: 95, events: 70 },
  },
  {
    id: "elk",
    name: "ELK / OpenSearch",
    category: "Open Source",
    strengths: ["Flexible log analytics", "Cost control", "Custom dashboards"],
    caveats: ["Operational overhead", "Trace support weaker"],
    bestFor: ["Log-heavy workloads", "Sovereignty", "Search at scale"],
    coverage: { logs: 95, metrics: 75, traces: 55, events: 75 },
  },
  {
    id: "prom_grafana",
    name: "Prometheus + Grafana",
    category: "Open Source",
    strengths: ["Kubernetes native", "Pull-based metrics", "PromQL"],
    caveats: ["Long-term storage tooling", "Logs/traces require companions"],
    bestFor: ["K8s-heavy", "Cloud-native", "Cost-optimized ops"],
    coverage: { logs: 50, metrics: 95, traces: 70, events: 65 },
  },
];

export const TELEMETRY_PILLARS = [
  { id: "logs", label: "Logs", description: "Structured event streams", color: "chart-1" },
  { id: "metrics", label: "Metrics", description: "Time-series signals", color: "chart-2" },
  { id: "traces", label: "Traces", description: "Distributed request paths", color: "chart-3" },
  { id: "events", label: "Events", description: "Business + infra events", color: "chart-4" },
  { id: "topology", label: "Topology", description: "Service & dependency maps", color: "chart-5" },
];

// Decision matrix: rules for recommending vendors based on inputs
export const recommendVendors = (inputs) => {
  const recs = [];
  const score = (id, base, reason) => recs.push({ id, base, reason });

  if (inputs.compliance === "high" || inputs.industry === "banking" || inputs.industry === "telecom") {
    score("splunk", 90, "Compliance & regulated workloads favor Splunk ITSI maturity.");
    score("dynatrace", 82, "Causation-grade RCA reduces regulator exposure.");
  }
  if (inputs.cloudModel === "cloud_native" || inputs.cloudModel === "hybrid") {
    score("datadog", 88, "Cloud-first telemetry breadth for hybrid + multi-cloud.");
    score("otel", 80, "Vendor-neutral standard for tool rationalization.");
  }
  if (inputs.k8s) {
    score("prom_grafana", 87, "Kubernetes-native metrics standard.");
    score("otel", inputs.compliance === "high" ? 84 : 86, "Polyglot K8s tracing.");
  }
  if (inputs.scale === "enterprise") {
    score("splunk", 78, "Proven at petabyte-scale operations.");
    score("dynatrace", 84, "Single-pane causation at enterprise scale.");
  }
  if (inputs.compliance === "medium" || inputs.compliance === "low") {
    score("elk", 70, "Cost-efficient log analytics for non-regulated workloads.");
  }
  // De-duplicate & average scores per vendor
  const map = new Map();
  recs.forEach((r) => {
    const cur = map.get(r.id) || { id: r.id, total: 0, count: 0, reasons: [] };
    cur.total += r.base;
    cur.count += 1;
    cur.reasons.push(r.reason);
    map.set(r.id, cur);
  });
  return Array.from(map.values())
    .map((v) => {
      const vendor = VENDOR_LIBRARY.find((x) => x.id === v.id);
      return { ...vendor, score: Math.round(v.total / v.count), reasons: Array.from(new Set(v.reasons)) };
    })
    .sort((a, b) => b.score - a.score);
};
