// Build vs Buy vs Partner decision data

export const CAPABILITIES = [
  {
    id: "aiops_platform",
    label: "AIOps Correlation Platform",
    summary: "Anomaly detection, correlation, AI causation",
    differentiation: 1,
    maturity: 5,
    speed: 5,
    risk: 2,
    decision: "Buy",
    rationale: "Mature market, low strategic differentiation, fastest time-to-value via Dynatrace/Datadog.",
  },
  {
    id: "observability_pipeline",
    label: "Observability Pipeline (OTel)",
    summary: "Vendor-neutral telemetry collection",
    differentiation: 3,
    maturity: 4,
    speed: 3,
    risk: 2,
    decision: "Build",
    rationale: "Strategic to avoid lock-in; OSS components mature; medium engineering investment.",
  },
  {
    id: "runbook_orchestrator",
    label: "Runbook Orchestrator",
    summary: "Cross-tool remediation workflows",
    differentiation: 2,
    maturity: 4,
    speed: 4,
    risk: 2,
    decision: "Hybrid",
    rationale: "Buy ServiceNow/Rundeck core; build org-specific workflow library.",
  },
  {
    id: "service_topology",
    label: "Service Topology / CMDB",
    summary: "Continuous discovery & dependency mapping",
    differentiation: 4,
    maturity: 3,
    speed: 3,
    risk: 3,
    decision: "Partner",
    rationale: "Org-specific data; SI partner to accelerate discovery & enrichment.",
  },
  {
    id: "predictive_intelligence",
    label: "Predictive Intelligence Models",
    summary: "Forecast SLA breach, capacity, dependency risk",
    differentiation: 5,
    maturity: 2,
    speed: 2,
    risk: 4,
    decision: "Build",
    rationale: "Source of competitive advantage; train on proprietary signals.",
  },
  {
    id: "chat_ai_assistant",
    label: "Operational AI Assistant",
    summary: "LLM copilot for ops & customer agents",
    differentiation: 3,
    maturity: 3,
    speed: 4,
    risk: 4,
    decision: "Hybrid",
    rationale: "Buy LLM platform; build prompt + grounding layer with org data.",
  },
];

export const decisionColor = (d) =>
  d === "Build" ? "primary" :
  d === "Buy" ? "warning" :
  d === "Partner" ? "info" :
  "success";
