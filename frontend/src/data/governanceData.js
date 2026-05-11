// Governance & Compliance Center

export const GOVERNANCE_DIMENSIONS = [
  { id: "ai_guardrails", label: "AI Guardrails", score: 71, target: 90, trend: "+8" },
  { id: "approvals", label: "Automation Approvals", score: 78, target: 95, trend: "+12" },
  { id: "compliance", label: "Compliance Readiness", score: 84, target: 92, trend: "+4" },
  { id: "audit", label: "Audit Readiness", score: 82, target: 95, trend: "+6" },
  { id: "model_risk", label: "Model Risk Scoring", score: 64, target: 85, trend: "+9" },
  { id: "data_lineage", label: "Data Lineage", score: 58, target: 80, trend: "+5" },
];

export const COMPLIANCE_FRAMEWORKS = [
  { id: "soc2", label: "SOC 2", coverage: 92, lastAudit: "2025-09-12", status: "ok" },
  { id: "iso27001", label: "ISO 27001", coverage: 88, lastAudit: "2025-07-04", status: "ok" },
  { id: "gdpr", label: "GDPR", coverage: 84, lastAudit: "2025-11-18", status: "ok" },
  { id: "hipaa", label: "HIPAA", coverage: 0, lastAudit: "—", status: "na" },
  { id: "pci", label: "PCI-DSS", coverage: 95, lastAudit: "2025-08-22", status: "ok" },
  { id: "dora", label: "EU DORA", coverage: 71, lastAudit: "2025-12-01", status: "warn" },
  { id: "nis2", label: "NIS2", coverage: 68, lastAudit: "2025-12-04", status: "warn" },
];

export const AI_AUTOMATION_POLICIES = [
  { id: "p1", policy: "All P1 auto-remediations require shadow-mode for 14 days", status: "enforced", owner: "AIOps Council" },
  { id: "p2", policy: "Customer-facing changes require human-in-the-loop approval", status: "enforced", owner: "Change Board" },
  { id: "p3", policy: "Model drift > 8% triggers automatic suspension", status: "enforced", owner: "ML Risk" },
  { id: "p4", policy: "All AI decisions logged with explainability metadata", status: "in-progress", owner: "Data Governance" },
  { id: "p5", policy: "Quarterly red-team of automation library", status: "in-progress", owner: "CISO" },
];
