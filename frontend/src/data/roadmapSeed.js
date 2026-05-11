// Roadmap seed data — pre-seeded enhancement items for every module.
// Each item is editable / removable by the user post-seed via the UI.

// Lightweight UUID generator that works without an external lib
const id = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "rm_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
};

const today = new Date();
const inDays = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

export const ROADMAP_MODULES = [
  { id: "command-center", label: "Executive Command" },
  { id: "maturity", label: "Maturity Assessment" },
  { id: "observability", label: "Observability Architecture" },
  { id: "incidents", label: "Incidents & MTTR" },
  { id: "automation", label: "Automation Discovery" },
  { id: "predictive", label: "Predictive Intelligence" },
  { id: "itil", label: "ITIL Transformation" },
  { id: "cloud", label: "Cloud Operations" },
  { id: "noc", label: "NOC / Telecom" },
  { id: "sre", label: "SRE Reliability" },
  { id: "build-buy-partner", label: "Build · Buy · Partner" },
  { id: "roi", label: "ROI Calculator" },
  { id: "governance", label: "Governance & Compliance" },
  { id: "reports", label: "Executive Reports" },
  { id: "personas", label: "Personas" },
  { id: "delivery-kit", label: "Delivery Kit" },
];

export const ROADMAP_STATUSES = [
  { id: "backlog", label: "Backlog", tone: "low" },
  { id: "planned", label: "Planned", tone: "info" },
  { id: "in_progress", label: "In Progress", tone: "warn" },
  { id: "done", label: "Done", tone: "ok" },
];

export const PRIORITY_LEVELS = [
  { id: "low", label: "Low", tone: "low" },
  { id: "medium", label: "Medium", tone: "info" },
  { id: "high", label: "High", tone: "warn" },
  { id: "critical", label: "Critical", tone: "danger" },
];

export const EFFORT_LEVELS = ["S", "M", "L", "XL"];
export const IMPACT_LEVELS = ["L", "M", "H"];

// Seed 2 items per module — mix of statuses & priorities
export const ROADMAP_SEED = [
  // command-center
  { moduleId: "command-center", title: "Wire ⌘K palette to nav + actions", description: "Power-user navigation across the OS — drives engagement and time-on-platform.", owner: "Platform Engineering", dueDate: inDays(21), status: "planned", priority: "medium", effort: "M", impact: "M", tags: ["UX", "quick-win"] },
  { moduleId: "command-center", title: "Add real-time KPI counter animations", description: "Animate KPI values on update with milestone markers (e.g., crossing 50%).", owner: "Frontend Guild", dueDate: inDays(35), status: "backlog", priority: "low", effort: "S", impact: "L", tags: ["polish"] },

  // maturity
  { moduleId: "maturity", title: "Save maturity snapshots over time", description: "Allow saving a maturity score with a date so quarterly comparison is possible.", owner: "Transformation Manager", dueDate: inDays(28), status: "in_progress", priority: "high", effort: "M", impact: "H", tags: ["evidence", "longitudinal"] },
  { moduleId: "maturity", title: "Per-BU maturity comparison view", description: "Compare maturity radar across multiple business units side-by-side.", owner: "Enterprise Architect", dueDate: inDays(70), status: "planned", priority: "medium", effort: "L", impact: "H", tags: ["analytics"] },

  // observability
  { moduleId: "observability", title: "Add drill-down on topology nodes", description: "Click a node → open service detail with telemetry stats and SLO state.", owner: "Observability Lead", dueDate: inDays(45), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["depth"] },
  { moduleId: "observability", title: "OTel collector cost calculator", description: "Estimate ingest cost based on cardinality, retention, and sampling.", owner: "FinOps Partner", dueDate: inDays(56), status: "backlog", priority: "medium", effort: "M", impact: "M", tags: ["finops"] },

  // incidents
  { moduleId: "incidents", title: "Roll up MTTR by service tier", description: "Tier-1 vs Tier-2 vs Tier-3 breakdown of MTTR trends.", owner: "Service Delivery Manager", dueDate: inDays(14), status: "in_progress", priority: "high", effort: "S", impact: "M", tags: ["analytics"] },
  { moduleId: "incidents", title: "P1 swarm-mode integration", description: "One-click swarm spin-up with paging, comms channel and runbook attach.", owner: "SRE Lead", dueDate: inDays(60), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["integration"] },

  // automation
  { moduleId: "automation", title: "Shadow → production promotion gate", description: "Codify the 5-step promotion checklist; lock until all gates pass.", owner: "AIOps Council", dueDate: inDays(40), status: "in_progress", priority: "critical", effort: "M", impact: "H", tags: ["governance"] },
  { moduleId: "automation", title: "Automation drift detection", description: "Flag automations whose decision-quality drifts >8% from baseline.", owner: "ML Risk", dueDate: inDays(80), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["safety"] },

  // predictive
  { moduleId: "predictive", title: "Confidence calibration dashboard", description: "Compare predicted probability against realized outcomes per detector.", owner: "AIOps Engineering", dueDate: inDays(50), status: "planned", priority: "high", effort: "M", impact: "H", tags: ["quality"] },
  { moduleId: "predictive", title: "Predict change failure risk pre-deploy", description: "Score deploys before rollout based on change content + signal context.", owner: "SRE Lead", dueDate: inDays(110), status: "backlog", priority: "medium", effort: "XL", impact: "H", tags: ["preventive"] },

  // itil
  { moduleId: "itil", title: "CMDB freshness SLO", description: "Define and enforce a freshness SLO on CMDB records (e.g., <24h drift).", owner: "Service Owner", dueDate: inDays(32), status: "planned", priority: "high", effort: "M", impact: "H", tags: ["data-quality"] },
  { moduleId: "itil", title: "Auto-drafted postmortems", description: "Generate first-draft postmortems from incident timeline + telemetry.", owner: "SRE Lead", dueDate: inDays(75), status: "backlog", priority: "medium", effort: "L", impact: "M", tags: ["productivity"] },

  // cloud
  { moduleId: "cloud", title: "FinOps chargeback model", description: "Move from showback to chargeback with monthly business-unit invoices.", owner: "FinOps Partner", dueDate: inDays(90), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["finops"] },
  { moduleId: "cloud", title: "K8s multi-tenant policy pack", description: "Pre-baked OPA/Kyverno policies for multi-tenant isolation and cost guardrails.", owner: "Cloud Ops Lead", dueDate: inDays(55), status: "in_progress", priority: "high", effort: "M", impact: "H", tags: ["governance"] },

  // noc
  { moduleId: "noc", title: "Satellite link health prediction", description: "Use jitter trend to predict link degradation 30+ min ahead.", owner: "NOC Lead", dueDate: inDays(48), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["predictive"] },
  { moduleId: "noc", title: "Field-tech dispatch optimization", description: "Optimize dispatch by distance, skill, parts-on-truck — reduce MTR by 35%.", owner: "Field Operations", dueDate: inDays(120), status: "backlog", priority: "medium", effort: "XL", impact: "H", tags: ["ops-excellence"] },

  // sre
  { moduleId: "sre", title: "Auto-rollback on SLO burn", description: "Trigger rollback when error budget burn rate exceeds 5x in a 10m window.", owner: "SRE Lead", dueDate: inDays(38), status: "in_progress", priority: "critical", effort: "M", impact: "H", tags: ["reliability"] },
  { moduleId: "sre", title: "Chaos game-day cadence", description: "Quarterly chaos engineering for tier-1 services with measured resilience deltas.", owner: "SRE Lead", dueDate: inDays(85), status: "planned", priority: "medium", effort: "L", impact: "M", tags: ["resilience"] },

  // build-buy-partner
  { moduleId: "build-buy-partner", title: "Vendor evaluation scorecard template", description: "Standard vendor scorecard for AIOps tooling RFx exercises.", owner: "Enterprise Architect", dueDate: inDays(22), status: "planned", priority: "medium", effort: "S", impact: "M", tags: ["procurement"] },
  { moduleId: "build-buy-partner", title: "Partner SoW library", description: "Pre-approved SoW patterns for SI partners across the 6 capability tracks.", owner: "Procurement", dueDate: inDays(95), status: "backlog", priority: "low", effort: "M", impact: "M", tags: ["accelerator"] },

  // roi
  { moduleId: "roi", title: "Per-BU ROI breakdown", description: "Split annual savings model by business unit and product line.", owner: "Finance Partner", dueDate: inDays(45), status: "planned", priority: "high", effort: "M", impact: "H", tags: ["finance"] },
  { moduleId: "roi", title: "Sensitivity analysis sliders", description: "Tornado-style sensitivity view to identify highest-leverage inputs.", owner: "Transformation Manager", dueDate: inDays(67), status: "backlog", priority: "medium", effort: "M", impact: "M", tags: ["analytics"] },

  // governance
  { moduleId: "governance", title: "Policy-as-code CI gate", description: "Block PRs that violate AI governance policies via OPA in CI.", owner: "CISO", dueDate: inDays(42), status: "in_progress", priority: "critical", effort: "L", impact: "H", tags: ["compliance"] },
  { moduleId: "governance", title: "Quarterly automation red-team", description: "Standing red-team exercise against the automation library.", owner: "CISO", dueDate: inDays(100), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["safety"] },

  // reports
  { moduleId: "reports", title: "Branded PDF templates per audience", description: "Audience-specific branding for board / CIO / audit reports.", owner: "Comms Lead", dueDate: inDays(25), status: "planned", priority: "medium", effort: "S", impact: "M", tags: ["branding"] },
  { moduleId: "reports", title: "Scheduled monthly auto-export", description: "Auto-generate and email the CIO snapshot on the 1st of every month.", owner: "Platform Engineering", dueDate: inDays(72), status: "backlog", priority: "low", effort: "M", impact: "M", tags: ["automation"] },

  // personas
  { moduleId: "personas", title: "Custom persona builder", description: "Allow orgs to define new personas with custom KPI bundles & landing pages.", owner: "Product Owner", dueDate: inDays(88), status: "backlog", priority: "medium", effort: "L", impact: "M", tags: ["customization"] },
  { moduleId: "personas", title: "Persona-locked routing", description: "Optionally restrict navigation to persona-relevant modules only.", owner: "Frontend Guild", dueDate: inDays(50), status: "planned", priority: "low", effort: "S", impact: "L", tags: ["UX"] },

  // delivery-kit
  { moduleId: "delivery-kit", title: "Zip-and-download full kit", description: "Bundle the 43 artifacts into a single ZIP using client-side jszip.", owner: "Platform Engineering", dueDate: inDays(18), status: "in_progress", priority: "high", effort: "S", impact: "M", tags: ["productivity"] },
  { moduleId: "delivery-kit", title: "Program Office live status page", description: "Live dashboard of milestone completion %, downloads, executive briefing.", owner: "Transformation Manager", dueDate: inDays(60), status: "planned", priority: "high", effort: "L", impact: "H", tags: ["execution"] },
];

// Materialize seed with stable ids on first hydration
export const materializeSeed = () => ROADMAP_SEED.map((item) => ({
  id: id(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...item,
}));
