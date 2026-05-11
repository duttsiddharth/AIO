// Service topology data for the interactive SVG diagram.
// Coordinates are normalized to a 1000 x 560 viewBox so the diagram scales cleanly.

export const TOPOLOGY_NODES = [
  // Collection / sources (left column)
  { id: "k8s", label: "Kubernetes", type: "source", layer: "Collect", x: 90, y: 90, telemetry: ["metrics", "events", "logs"], description: "Pod metrics, events, container logs via OTel collector DaemonSet." },
  { id: "vms", label: "VMs · Bare metal", type: "source", layer: "Collect", x: 90, y: 200, telemetry: ["metrics", "logs"], description: "Node exporter + Fluent Bit for system metrics and logs." },
  { id: "apps", label: "Apps · APIs", type: "source", layer: "Collect", x: 90, y: 310, telemetry: ["traces", "metrics", "logs"], description: "OpenTelemetry SDKs auto-instrument HTTP, gRPC, queues, DB calls." },
  { id: "net", label: "Network · CDN", type: "source", layer: "Collect", x: 90, y: 420, telemetry: ["metrics", "events"], description: "Flow exporters + CDN edge logs into the pipeline." },

  // Pipeline (middle column)
  { id: "otel", label: "OTel Collector", type: "pipeline", layer: "Process", x: 360, y: 150, telemetry: ["metrics", "logs", "traces", "events"], description: "Receives → enriches → batches → routes telemetry. Vendor-neutral seam." },
  { id: "pipeline", label: "Telemetry Pipeline", type: "pipeline", layer: "Process", x: 360, y: 290, telemetry: ["metrics", "logs", "traces", "events"], description: "Sampling, redaction, routing, cost-optimization filters." },
  { id: "topology", label: "Topology Builder", type: "pipeline", layer: "Process", x: 360, y: 430, telemetry: ["events"], description: "Continuous discovery → CMDB sync → service-map graph." },

  // Backends (right-middle column)
  { id: "tsdb", label: "Metrics TSDB", type: "store", layer: "Store", x: 620, y: 100, telemetry: ["metrics"], description: "Prometheus / Mimir / Datadog metrics backend." },
  { id: "logs", label: "Log Lake", type: "store", layer: "Store", x: 620, y: 220, telemetry: ["logs"], description: "Splunk / OpenSearch / Loki / Datadog logs backend." },
  { id: "traces", label: "Trace Store", type: "store", layer: "Store", x: 620, y: 340, telemetry: ["traces"], description: "Tempo / Dynatrace / Datadog APM / Jaeger." },
  { id: "events", label: "Event Bus", type: "store", layer: "Store", x: 620, y: 460, telemetry: ["events"], description: "Kafka / EventBridge — correlation + downstream consumers." },

  // Intelligence + UI (right column)
  { id: "aiops", label: "AIOps Engine", type: "intel", layer: "Analyze", x: 870, y: 170, telemetry: ["metrics", "logs", "traces", "events"], description: "Anomaly detection · correlation · causation · forecast." },
  { id: "itsi", label: "Service Intel", type: "intel", layer: "Analyze", x: 870, y: 310, telemetry: ["metrics", "events"], description: "Service-level KPIs, SLO burn-down, health scoring." },
  { id: "console", label: "Operator Console", type: "intel", layer: "Analyze", x: 870, y: 450, telemetry: ["metrics", "logs", "traces"], description: "Unified pane for NOC, SRE, Ops — search, dashboards, runbooks." },
];

export const TOPOLOGY_EDGES = [
  // Collect → OTel / Pipeline
  { from: "k8s", to: "otel", kind: "metrics" },
  { from: "k8s", to: "otel", kind: "logs" },
  { from: "vms", to: "otel", kind: "metrics" },
  { from: "vms", to: "pipeline", kind: "logs" },
  { from: "apps", to: "otel", kind: "traces" },
  { from: "apps", to: "pipeline", kind: "logs" },
  { from: "net", to: "pipeline", kind: "events" },

  // OTel/Pipeline → Topology
  { from: "otel", to: "topology", kind: "events" },
  { from: "pipeline", to: "topology", kind: "events" },

  // Pipelines → Stores
  { from: "otel", to: "tsdb", kind: "metrics" },
  { from: "pipeline", to: "logs", kind: "logs" },
  { from: "otel", to: "traces", kind: "traces" },
  { from: "pipeline", to: "events", kind: "events" },
  { from: "topology", to: "events", kind: "events" },

  // Stores → Intel
  { from: "tsdb", to: "aiops", kind: "metrics" },
  { from: "logs", to: "aiops", kind: "logs" },
  { from: "traces", to: "aiops", kind: "traces" },
  { from: "events", to: "aiops", kind: "events" },
  { from: "tsdb", to: "itsi", kind: "metrics" },
  { from: "events", to: "itsi", kind: "events" },
  { from: "aiops", to: "console", kind: "traces" },
  { from: "itsi", to: "console", kind: "metrics" },
  { from: "logs", to: "console", kind: "logs" },
];

export const TELEMETRY_KINDS = {
  metrics: { label: "Metrics", color: "hsl(var(--chart-2))" },
  logs: { label: "Logs", color: "hsl(var(--chart-1))" },
  traces: { label: "Traces", color: "hsl(var(--chart-3))" },
  events: { label: "Events", color: "hsl(var(--chart-4))" },
};
