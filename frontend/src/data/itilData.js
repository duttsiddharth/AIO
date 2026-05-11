// ITIL Transformation data

export const ITIL_MODULES = [
  {
    id: "incident",
    label: "Incident Management",
    before: { mttr: 78, automation: 18, repeat: 34, csat: 71 },
    after: { mttr: 28, automation: 62, repeat: 12, csat: 88 },
    practices: [
      "AI-correlated alerts (reduce noise 78%)",
      "Auto-triage to swarm channel",
      "Closed-loop remediation for known patterns",
    ],
  },
  {
    id: "problem",
    label: "Problem Management",
    before: { rcaDays: 9.4, knownErrors: 142, recurrence: 41 },
    after: { rcaDays: 2.8, knownErrors: 318, recurrence: 14 },
    practices: [
      "Topology-aware RCA",
      "Auto-generated postmortem drafts",
      "Known-error library tied to runbooks",
    ],
  },
  {
    id: "change",
    label: "Change Enablement",
    before: { lead: 11, failureRate: 18, emergencyPct: 24 },
    after: { lead: 4, failureRate: 6, emergencyPct: 9 },
    practices: [
      "Risk-scored CAB automation",
      "Pre-change anomaly checks",
      "Auto-rollback on signal regression",
    ],
  },
  {
    id: "event",
    label: "Event Management",
    before: { alertsPerDay: 14200, actionable: 6 },
    after: { alertsPerDay: 3400, actionable: 38 },
    practices: [
      "Event correlation engine",
      "Suppression library",
      "Service-aware enrichment",
    ],
  },
  {
    id: "cmdb",
    label: "CMDB Health",
    before: { accuracy: 62, freshness: 41 },
    after: { accuracy: 93, freshness: 88 },
    practices: [
      "Continuous discovery",
      "Topology reconciliation",
      "Service mapping with AI hints",
    ],
  },
  {
    id: "knowledge",
    label: "Knowledge Management",
    before: { articles: 412, deflection: 12 },
    after: { articles: 1180, deflection: 41 },
    practices: [
      "Auto-drafted knowledge from incidents",
      "Persona-tailored portals",
      "Search relevance loop",
    ],
  },
];
