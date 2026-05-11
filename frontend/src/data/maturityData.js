// AIOps Maturity Assessment Engine data model

export const MATURITY_TIERS = [
  { id: "reactive", label: "Reactive", min: 0, max: 30, color: "destructive", description: "Manual operations, alert fatigue, ticket-driven culture." },
  { id: "managed", label: "Managed", min: 30, max: 50, color: "warning", description: "Defined processes, basic monitoring, siloed tooling." },
  { id: "integrated", label: "Integrated", min: 50, max: 70, color: "info", description: "Unified observability, partial automation, KPI-driven ops." },
  { id: "predictive", label: "Predictive", min: 70, max: 85, color: "primary", description: "AIOps signals, anomaly detection, proactive remediation." },
  { id: "autonomous", label: "Autonomous Ops", min: 85, max: 100, color: "success", description: "Self-healing, intent-driven operations, closed-loop AI." },
];

export const MATURITY_DIMENSIONS = [
  {
    id: "monitoring",
    label: "Monitoring",
    description: "Coverage and signal quality of infrastructure & application monitoring.",
    weight: 1.0,
    benchmark: 64,
  },
  {
    id: "observability",
    label: "Observability",
    description: "Logs, metrics, traces, events with correlated business context.",
    weight: 1.3,
    benchmark: 58,
  },
  {
    id: "automation",
    label: "Automation",
    description: "Runbooks, remediation, and orchestration coverage.",
    weight: 1.2,
    benchmark: 49,
  },
  {
    id: "incident_mgmt",
    label: "Incident Mgmt",
    description: "Detection, triage, escalation, MTTR, post-incident learning.",
    weight: 1.1,
    benchmark: 67,
  },
  {
    id: "cloud_ops",
    label: "Cloud Operations",
    description: "Cloud-native ops, K8s, IaC, FinOps maturity.",
    weight: 1.0,
    benchmark: 55,
  },
  {
    id: "ai_readiness",
    label: "AI Readiness",
    description: "Data foundation, ML feedback loops, governance.",
    weight: 1.4,
    benchmark: 41,
  },
  {
    id: "governance",
    label: "Operational Governance",
    description: "Standards, audit, approvals, policy-as-code.",
    weight: 0.9,
    benchmark: 60,
  },
  {
    id: "change",
    label: "Change Management",
    description: "Velocity, risk, change failure rate, change advisory.",
    weight: 1.0,
    benchmark: 58,
  },
  {
    id: "cmdb",
    label: "CMDB & Topology",
    description: "Accuracy, freshness, service-to-asset mapping.",
    weight: 0.9,
    benchmark: 47,
  },
  {
    id: "sre",
    label: "SRE Practice",
    description: "SLO discipline, error budgets, resilience engineering.",
    weight: 1.2,
    benchmark: 51,
  },
];

// Each question maps to a dimension and contributes 0–100 to that dimension's score
export const MATURITY_QUESTIONS = [
  // Monitoring
  { id: "mon_1", dimension: "monitoring", text: "What percentage of business services have golden-signal coverage?", options: [
    { label: "< 25%", score: 20 }, { label: "25–50%", score: 45 }, { label: "50–75%", score: 65 }, { label: "75–95%", score: 82 }, { label: "> 95%", score: 95 },
  ]},
  { id: "mon_2", dimension: "monitoring", text: "How are alerts thresholded?", options: [
    { label: "Static thresholds, mostly", score: 25 }, { label: "Mixed static + dynamic", score: 55 }, { label: "Mostly anomaly-based", score: 78 }, { label: "Adaptive ML-driven", score: 92 },
  ]},
  // Observability
  { id: "obs_1", dimension: "observability", text: "Are logs, metrics and traces correlated by trace ID?", options: [
    { label: "Rarely", score: 20 }, { label: "Select services", score: 50 }, { label: "Most production services", score: 75 }, { label: "All tier-1 + tier-2 services", score: 92 },
  ]},
  { id: "obs_2", dimension: "observability", text: "Do you use OpenTelemetry across stacks?", options: [
    { label: "No", score: 15 }, { label: "Pilot", score: 45 }, { label: "Several teams", score: 65 }, { label: "Enterprise standard", score: 90 },
  ]},
  // Automation
  { id: "auto_1", dimension: "automation", text: "What share of repetitive incidents auto-remediate?", options: [
    { label: "< 5%", score: 15 }, { label: "5–20%", score: 40 }, { label: "20–50%", score: 65 }, { label: "> 50%", score: 88 },
  ]},
  { id: "auto_2", dimension: "automation", text: "Do you orchestrate cross-tool runbooks?", options: [
    { label: "No", score: 20 }, { label: "Manual scripts", score: 40 }, { label: "Yes, partial", score: 65 }, { label: "Yes, enterprise-wide", score: 92 },
  ]},
  // Incident Mgmt
  { id: "inc_1", dimension: "incident_mgmt", text: "Median MTTR for P1?", options: [
    { label: "> 4 hours", score: 20 }, { label: "1–4 hours", score: 45 }, { label: "30–60 min", score: 70 }, { label: "< 30 min", score: 92 },
  ]},
  { id: "inc_2", dimension: "incident_mgmt", text: "Are blameless postmortems standard?", options: [
    { label: "No", score: 20 }, { label: "Some teams", score: 50 }, { label: "Most teams", score: 75 }, { label: "All teams + action tracking", score: 92 },
  ]},
  // Cloud Ops
  { id: "cloud_1", dimension: "cloud_ops", text: "How mature is your IaC adoption?", options: [
    { label: "Partial", score: 30 }, { label: "Most infra", score: 60 }, { label: "All infra + drift detection", score: 85 }, { label: "Policy-as-code enforced", score: 95 },
  ]},
  { id: "cloud_2", dimension: "cloud_ops", text: "FinOps practice in place?", options: [
    { label: "Ad-hoc", score: 25 }, { label: "Reporting only", score: 50 }, { label: "Showback + optimization", score: 75 }, { label: "Chargeback + automated rightsizing", score: 92 },
  ]},
  // AI readiness
  { id: "ai_1", dimension: "ai_readiness", text: "AIOps signal usage in production?", options: [
    { label: "None", score: 10 }, { label: "Pilot", score: 35 }, { label: "Several detectors", score: 65 }, { label: "Closed-loop remediation", score: 92 },
  ]},
  { id: "ai_2", dimension: "ai_readiness", text: "AI governance & approvals?", options: [
    { label: "None", score: 15 }, { label: "Informal", score: 40 }, { label: "Formal review board", score: 70 }, { label: "Policy-as-code + audit trails", score: 92 },
  ]},
  // Governance
  { id: "gov_1", dimension: "governance", text: "Standards for operational toolchain?", options: [
    { label: "Per team", score: 25 }, { label: "Per BU", score: 50 }, { label: "Enterprise reference architecture", score: 78 }, { label: "Enforced via policy-as-code", score: 92 },
  ]},
  // Change
  { id: "chg_1", dimension: "change", text: "Change failure rate?", options: [
    { label: "> 20%", score: 25 }, { label: "10–20%", score: 50 }, { label: "5–10%", score: 75 }, { label: "< 5%", score: 92 },
  ]},
  // CMDB
  { id: "cmdb_1", dimension: "cmdb", text: "CMDB accuracy?", options: [
    { label: "< 60%", score: 20 }, { label: "60–80%", score: 50 }, { label: "80–95%", score: 75 }, { label: "> 95% & auto-discovered", score: 92 },
  ]},
  // SRE
  { id: "sre_1", dimension: "sre", text: "SLO discipline?", options: [
    { label: "No SLOs", score: 15 }, { label: "Some services", score: 45 }, { label: "All tier-1 services", score: 75 }, { label: "All services + error budgets enforced", score: 95 },
  ]},
];
