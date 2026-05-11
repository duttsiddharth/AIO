// Phased 90–180 day AIOps Transformation Delivery Kit
// Each phase produces concrete artifacts that are downloadable from the UI.

export const DELIVERY_PHASES = [
  {
    id: "phase-0",
    label: "Phase 0 · Mobilize",
    window: "Day 0–14",
    days: "14 days",
    color: "info",
    objective:
      "Stand up the transformation program, align stakeholders, baseline the current operating model, and gain alignment on success criteria.",
    keyOutcomes: [
      "Program charter signed by CIO sponsor + steering committee",
      "Baseline operating model assessment (people · process · tooling)",
      "Initial executive narrative & 12-month vision",
      "Stakeholder map + persona-level expectations registry",
    ],
    raci: [
      { role: "Program Sponsor (CIO)", r: "A" },
      { role: "Transformation Manager", r: "R" },
      { role: "Enterprise Architect", r: "C" },
      { role: "Service Delivery Manager", r: "C" },
      { role: "Operations Leads (NOC/SRE/Cloud)", r: "I" },
    ],
    deliverables: [
      "Program charter & governance model",
      "Stakeholder map + RACI",
      "Baseline operating model report",
      "Persona expectation register",
    ],
    templates: [
      { id: "tmpl-charter", name: "Program Charter Template (DOCX-style)", kind: "template", filename: "01-program-charter.md" },
      { id: "tmpl-stakeholder", name: "Stakeholder Map Worksheet", kind: "template", filename: "01-stakeholder-map.csv" },
      { id: "tmpl-raci", name: "Phase 0 RACI Matrix", kind: "template", filename: "01-raci.csv" },
    ],
    guides: [
      { id: "guide-kickoff", name: "Kickoff Workshop Facilitator Guide", filename: "guide-kickoff.md" },
      { id: "guide-stakeholder", name: "Stakeholder Interview Playbook", filename: "guide-stakeholder.md" },
    ],
    surveys: [
      { id: "sv-operating-model", name: "Operating Model Baseline Survey", filename: "survey-operating-model.md" },
      { id: "sv-leadership-vision", name: "Leadership Vision Survey", filename: "survey-leadership-vision.md" },
    ],
    milestones: [
      "M0 · Charter signed",
      "M1 · Steering committee chartered",
      "M2 · Baseline assessment complete",
    ],
  },
  {
    id: "phase-1",
    label: "Phase 1 · Discover & Diagnose",
    window: "Day 15–45",
    days: "30 days",
    color: "primary",
    objective:
      "Run the formal AIOps maturity assessment, instrument observability gaps, and inventory automation candidates. Produce a quantified diagnosis and business case.",
    keyOutcomes: [
      "10-dimension AIOps maturity score with industry benchmarks",
      "Observability gap analysis + vendor recommendation",
      "Top-20 automation candidate inventory with ROI scoring",
      "Approved business case with ROI/payback model",
    ],
    raci: [
      { role: "Transformation Manager", r: "A" },
      { role: "AIOps Workstream Lead", r: "R" },
      { role: "Observability Lead", r: "R" },
      { role: "Finance Partner", r: "C" },
      { role: "Service Owners", r: "C" },
    ],
    deliverables: [
      "Maturity assessment report (radar + benchmarks)",
      "Observability blueprint recommendation",
      "Top-20 automation candidate dossier",
      "AI ROI financial model (3-year)",
    ],
    templates: [
      { id: "tmpl-maturity-report", name: "Maturity Report Template", kind: "template", filename: "02-maturity-report.md" },
      { id: "tmpl-obs-blueprint", name: "Observability Blueprint Template", kind: "template", filename: "02-observability-blueprint.md" },
      { id: "tmpl-automation-inventory", name: "Automation Candidate Inventory", kind: "template", filename: "02-automation-inventory.csv" },
      { id: "tmpl-roi-model", name: "ROI Financial Model Workbook", kind: "template", filename: "02-roi-model.csv" },
    ],
    guides: [
      { id: "guide-maturity", name: "Maturity Assessment Facilitation Guide", filename: "guide-maturity.md" },
      { id: "guide-toolinginv", name: "Tooling Inventory Playbook", filename: "guide-tooling-inventory.md" },
      { id: "guide-businesscase", name: "Business Case Storytelling Guide", filename: "guide-business-case.md" },
    ],
    surveys: [
      { id: "sv-maturity", name: "AIOps Maturity Self-Assessment (16 questions)", filename: "survey-maturity.md" },
      { id: "sv-tooling", name: "Tooling & Telemetry Inventory Survey", filename: "survey-tooling.md" },
      { id: "sv-incident-toil", name: "Incident Toil & Pain Survey", filename: "survey-incident-toil.md" },
    ],
    milestones: [
      "M3 · Maturity assessment completed",
      "M4 · Observability gaps prioritized",
      "M5 · Business case approved",
    ],
  },
  {
    id: "phase-2",
    label: "Phase 2 · Foundation",
    window: "Day 46–90",
    days: "45 days",
    color: "warning",
    objective:
      "Build the technical & governance foundation: deploy OTel pipeline, baseline SLOs for tier-1 services, stand up AI governance council, and pilot first 3 automations in shadow mode.",
    keyOutcomes: [
      "OpenTelemetry collector + telemetry pipeline live in production",
      "Tier-1 services have defined SLOs + error budgets",
      "AI governance council operational with policy-as-code starter pack",
      "3 automations running in shadow mode for 14 days",
    ],
    raci: [
      { role: "Observability Lead", r: "R" },
      { role: "SRE Lead", r: "R" },
      { role: "AI Governance Council", r: "A" },
      { role: "CISO", r: "C" },
      { role: "Cloud Ops Lead", r: "C" },
      { role: "Engineering Managers", r: "I" },
    ],
    deliverables: [
      "OTel pipeline architecture diagram + deployment runbook",
      "SLO catalog for tier-1 services",
      "AI governance charter + initial policies",
      "Shadow-mode automation report",
    ],
    templates: [
      { id: "tmpl-slo-catalog", name: "SLO Catalog Template", kind: "template", filename: "03-slo-catalog.csv" },
      { id: "tmpl-otel-runbook", name: "OTel Deployment Runbook", kind: "template", filename: "03-otel-runbook.md" },
      { id: "tmpl-policy-pack", name: "AI Governance Policy Pack (starter)", kind: "template", filename: "03-policy-pack.md" },
      { id: "tmpl-shadow-report", name: "Shadow-Mode Automation Report Template", kind: "template", filename: "03-shadow-report.md" },
    ],
    guides: [
      { id: "guide-otel", name: "OpenTelemetry Rollout Playbook", filename: "guide-otel-rollout.md" },
      { id: "guide-slo", name: "SLO Design Workshop Guide", filename: "guide-slo-workshop.md" },
      { id: "guide-aigov", name: "AI Governance Council Setup Guide", filename: "guide-ai-governance.md" },
      { id: "guide-shadow", name: "Shadow-Mode Automation Operating Manual", filename: "guide-shadow-mode.md" },
    ],
    surveys: [
      { id: "sv-slo-readiness", name: "Service SLO Readiness Survey", filename: "survey-slo-readiness.md" },
      { id: "sv-change-readiness", name: "Change & Risk Readiness Survey", filename: "survey-change-readiness.md" },
    ],
    milestones: [
      "M6 · OTel pipeline live",
      "M7 · Tier-1 SLOs defined",
      "M8 · Governance council operational",
      "M9 · 3 shadow automations approved for production",
    ],
  },
  {
    id: "phase-3",
    label: "Phase 3 · Scale & Embed",
    window: "Day 91–180",
    days: "90 days",
    color: "success",
    objective:
      "Move from foundation to operating reality. Promote automations to production, scale observability to tier-2 services, embed AIOps signals into the operating console, and instrument the value realization loop.",
    keyOutcomes: [
      "≥ 10 production automations live with closed-loop remediation",
      "Tier-2 services onboarded to observability platform",
      "Predictive intelligence integrated into operator console",
      "Quarterly transformation review cadence established",
    ],
    raci: [
      { role: "Transformation Manager", r: "A" },
      { role: "SRE Lead", r: "R" },
      { role: "Service Delivery Manager", r: "R" },
      { role: "AIOps Engineering Lead", r: "R" },
      { role: "Finance Partner", r: "C" },
      { role: "Business Service Owners", r: "C" },
    ],
    deliverables: [
      "Automation library catalog (production)",
      "Tier-2 service onboarding report",
      "Predictive intelligence integration spec",
      "Quarterly transformation review pack",
      "Value realization scorecard",
    ],
    templates: [
      { id: "tmpl-auto-catalog", name: "Production Automation Catalog", kind: "template", filename: "04-automation-catalog.csv" },
      { id: "tmpl-onboarding", name: "Service Onboarding Checklist", kind: "template", filename: "04-service-onboarding.md" },
      { id: "tmpl-value-scorecard", name: "Value Realization Scorecard", kind: "template", filename: "04-value-scorecard.csv" },
      { id: "tmpl-qtr-review", name: "Quarterly Transformation Review Pack", kind: "template", filename: "04-qtr-review.md" },
    ],
    guides: [
      { id: "guide-promotion", name: "Automation Promotion Playbook (shadow → prod)", filename: "guide-automation-promotion.md" },
      { id: "guide-scale", name: "Scale & Onboard Tier-2 Services Guide", filename: "guide-scale-tier2.md" },
      { id: "guide-value", name: "Value Realization Operating Guide", filename: "guide-value-realization.md" },
      { id: "guide-handoff", name: "Run-State Handoff to BAU Operations", filename: "guide-bau-handoff.md" },
    ],
    surveys: [
      { id: "sv-engineer-sentiment", name: "Engineer Sentiment Survey (toil reduction)", filename: "survey-engineer-sentiment.md" },
      { id: "sv-customer-impact", name: "Customer Impact Survey", filename: "survey-customer-impact.md" },
      { id: "sv-csat", name: "Internal CSAT Survey", filename: "survey-csat.md" },
    ],
    milestones: [
      "M10 · 10 production automations live",
      "M11 · Tier-2 onboarding complete",
      "M12 · Predictive intel in console",
      "M13 · QTR cadence live · BAU handoff",
    ],
  },
];

// Quick lookup of artifact counts per phase
export const phaseStats = (phase) => ({
  templates: phase.templates.length,
  guides: phase.guides.length,
  surveys: phase.surveys.length,
  milestones: phase.milestones.length,
  deliverables: phase.deliverables.length,
});

// Generators for downloadable artifacts. Each returns { name, mime, content }
export const generateTemplateContent = (phase, tmpl) => {
  const header = `# ${tmpl.name}\nPhase: ${phase.label} (${phase.window})\nObjective: ${phase.objective}\n\n`;
  if (tmpl.filename.endsWith(".csv")) {
    if (tmpl.id === "tmpl-raci") {
      const rows = [
        ["Activity", ...phase.raci.map((r) => r.role)],
        ...phase.deliverables.map((d) => [d, ...phase.raci.map((r) => r.r)]),
      ];
      return { name: tmpl.filename, mime: "text/csv", content: rows.map((r) => r.join(",")).join("\n") };
    }
    if (tmpl.id === "tmpl-stakeholder") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "Stakeholder,Role,Persona,Influence (1-5),Interest (1-5),Engagement Strategy\n" +
          "Jane Doe,CIO,CIO,5,5,Weekly executive briefing\n" +
          "John Smith,SDM,SDM,4,5,Bi-weekly working session\n" +
          "Priya Patel,SRE Lead,SRE,3,4,Tech council membership\n",
      };
    }
    if (tmpl.id === "tmpl-automation-inventory") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "Candidate,Trigger Pattern,Occurrences/mo,Avg Manual Min,Confidence%,Tool,Persona,Impact,Risk,Phase\n" +
          "Auto-recycle stuck K8s pods,CrashLoopBackOff > 3,142,18,96,Ansible+ArgoCD,SRE,High,Low,Phase 2\n" +
          "Renew expiring TLS certs,Cert < 14d,88,32,99,Terraform+Vault,Cloud Ops,Medium,Low,Phase 2\n" +
          "Expand disk volumes,FS > 85% 30m,168,24,92,Rundeck+Terraform,Cloud Ops,High,Low,Phase 3\n",
      };
    }
    if (tmpl.id === "tmpl-slo-catalog") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "Service,Tier,SLI Type,SLI Definition,SLO Target,Error Budget Policy,Owner\n" +
          "Payments API,1,Availability,Success rate over 5min,99.95%,Burn 2%/30d freezes deploy,Payments Squad\n" +
          "Order Capture,1,Latency,p95 < 250ms,99.9%,Burn 5%/7d triggers review,Order Squad\n" +
          "Customer Portal,1,Availability,Success rate,99.5%,Burn 10%/7d alerts,Web Squad\n",
      };
    }
    if (tmpl.id === "tmpl-roi-model") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "Lever,Year 1,Year 2,Year 3,Notes\n" +
          "Labor savings (automation),$4400000,$5500000,$6200000,Conservative 22% handle-time on automated incidents\n" +
          "Tooling rationalization,$760000,$910000,$1050000,18% of annual tooling spend\n" +
          "Cloud right-sizing,$2200000,$2640000,$3000000,12% of annual cloud spend\n" +
          "Investment,-$2400000,-$1200000,-$800000,Program + capability build\n" +
          "Net savings,$4960000,$7850000,$9450000,Cumulative ROI 822%\n",
      };
    }
    if (tmpl.id === "tmpl-auto-catalog") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "Automation,Status,Owner,Tool,Confidence%,Last Run,Risk Tier\n" +
          "Auto-recycle stuck K8s pods,Production,SRE,Ansible,96,2026-02-10,Low\n" +
          "Auto-renew TLS,Production,Cloud Ops,Terraform,99,2026-02-09,Low\n" +
          "Auto-expand FS,Production,Cloud Ops,Rundeck,92,2026-02-08,Low\n",
      };
    }
    if (tmpl.id === "tmpl-value-scorecard") {
      return {
        name: tmpl.filename,
        mime: "text/csv",
        content:
          "KPI,Baseline,Target,Current,Status,Trend\n" +
          "MTTR (P1+P2),78 min,28 min,42 min,On track,Improving\n" +
          "Automation Coverage %,18%,62%,46%,On track,Improving\n" +
          "Tier-1 SLA Compliance %,99.62%,99.9%,99.84%,On track,Improving\n" +
          "Toil Hours / engineer / week,12,4,7,On track,Improving\n",
      };
    }
    return { name: tmpl.filename, mime: "text/csv", content: header };
  }

  // Markdown templates
  const base = `${header}---\n\n## Section 1 · Context\nDescribe the current state and trigger for this artifact.\n\n## Section 2 · Objectives\nList the 3–5 outcomes this artifact drives.\n\n## Section 3 · Approach\nStep-by-step methodology.\n\n## Section 4 · Outputs\nThe concrete deliverables produced.\n\n## Section 5 · Approvals\nApprover · Date · Signature\n`;

  const specific = {
    "tmpl-charter": `${header}---\n## 1. Vision\nAchieve Autonomous Operations tier within 18 months and unlock $7.4M in annualized savings.\n\n## 2. Scope\nIn-scope: AIOps, observability, automation, SRE, cloud ops, governance.\nOut-of-scope: end-user device management, identity transformation.\n\n## 3. Sponsor\nCIO (Accountable). Steering committee: CISO, Head of Engineering, Head of Operations, CFO partner.\n\n## 4. Workstreams\n- AIOps & Observability\n- Automation & SRE\n- Cloud Operations\n- Governance & Compliance\n- Value Realization\n\n## 5. Investment\n$2.4M Year 1 · $1.2M Year 2 · $0.8M Year 3\n\n## 6. Success Criteria\n- Maturity score ≥ 85/100 by Day 180\n- ≥ $4.5M Year 1 savings realized\n- Tier-1 SLA ≥ 99.9% sustained 90 days\n\n## 7. Risks\n- Tool sprawl resistance · Talent gap · Governance backlog\n\n## 8. Cadence\nWeekly working group · Bi-weekly steering · Quarterly board update.\n`,
    "tmpl-maturity-report": `${header}---\n## Executive Summary\nCurrent maturity: __/100 (Tier: ____). Gap to target: __ points.\n\n## Dimension Scores\n| Dimension | Score | Benchmark | Gap |\n|---|---|---|---|\n| Monitoring | __ | 64 | __ |\n| Observability | __ | 58 | __ |\n| Automation | __ | 49 | __ |\n| Incident Mgmt | __ | 67 | __ |\n| Cloud Ops | __ | 55 | __ |\n| AI Readiness | __ | 41 | __ |\n| Governance | __ | 60 | __ |\n| Change Mgmt | __ | 58 | __ |\n| CMDB | __ | 47 | __ |\n| SRE | __ | 51 | __ |\n\n## Top 5 Recommendations\n1. _________\n2. _________\n3. _________\n4. _________\n5. _________\n\n## Roadmap (90-180 days)\nReference: Delivery Kit phases.\n`,
    "tmpl-obs-blueprint": `${header}---\n## 1. Operating Profile\n- Cloud model: ____\n- Industry: ____\n- Compliance: ____\n- Scale: ____\n\n## 2. Reference Architecture\nCollect → Process → Store → Analyze (see Topology Diagram).\n\n## 3. Vendor Recommendation\nPrimary: _____\nSecondary: _____\nOpen-standard: OpenTelemetry\n\n## 4. Telemetry Pipeline Design\n- Collectors: OTel DaemonSet, Fluent Bit\n- Processors: enrich → sample → route → store\n- Sinks: Metrics TSDB, Log Lake, Trace Store, Event Bus\n\n## 5. Cost Model\n- Daily ingest: __ TB · Retention tiers: hot/warm/cold\n\n## 6. Migration Plan\nWave 1: Tier-1 services · Wave 2: Tier-2 services · Wave 3: Long-tail\n`,
    "tmpl-otel-runbook": `${header}---\n## 1. Pre-requisites\n- K8s cluster admin · Helm 3 · Vault token\n\n## 2. Install Collector\n\`\`\`bash\nhelm upgrade --install otel-collector open-telemetry/opentelemetry-collector \\\n  -f values.yaml -n observability --create-namespace\n\`\`\`\n\n## 3. Validate\n- \`kubectl get pods -n observability\`\n- Confirm metrics flowing to TSDB endpoint\n\n## 4. Rollback\n- \`helm rollback otel-collector\`\n\n## 5. Acceptance Criteria\n- 95% pod metric coverage · < 5 min lag · No data loss in 1-hour soak\n`,
    "tmpl-policy-pack": `${header}---\n## Policy 1 · Shadow-Mode Mandate\nAll P1 auto-remediations must run in shadow mode for 14 days. Approval: AIOps Council.\n\n## Policy 2 · Human-in-the-Loop\nCustomer-facing automations require human approval. Approver: Change Board.\n\n## Policy 3 · Model Drift\nDrift > 8% triggers automatic suspension. Owner: ML Risk.\n\n## Policy 4 · Explainability\nAll AI decisions logged with explainability metadata. Owner: Data Governance.\n\n## Policy 5 · Red-Team\nQuarterly red-team of automation library. Owner: CISO.\n`,
    "tmpl-shadow-report": `${header}---\n## 1. Automation\nName: ____ · Trigger: ____ · Owner: ____\n\n## 2. Shadow Period\nStart: ____ · End: ____ · Decisions captured: ____\n\n## 3. Decision Quality\n- True positives: __% · False positives: __% · Misses: __%\n\n## 4. Go/No-Go Recommendation\n☐ Promote to production · ☐ Extend shadow · ☐ Decommission\n`,
    "tmpl-qtr-review": `${header}---\n## 1. Maturity Position\nQ-start: __ → Q-end: __ · Tier shift: ____\n\n## 2. Value Realized\n- Savings: $__\n- MTTR: __ min → __ min\n- Automation coverage: __% → __%\n\n## 3. Top Wins\n1. _____ 2. _____ 3. _____\n\n## 4. Lessons & Risks\n- _____\n\n## 5. Next Quarter Bets\n- _____\n`,
    "tmpl-onboarding": `${header}---\n## Tier-2 Service Onboarding Checklist\n- [ ] Service catalog entry confirmed\n- [ ] Golden signals defined (latency · errors · saturation · traffic)\n- [ ] Dashboards built\n- [ ] SLO drafted (if applicable)\n- [ ] On-call rotation registered\n- [ ] Runbooks linked\n- [ ] Auto-remediation candidates reviewed\n- [ ] Owner sign-off\n`,
  };
  return { name: tmpl.filename, mime: "text/markdown", content: specific[tmpl.id] || base };
};

export const generateGuideContent = (phase, guide) => {
  const header = `# ${guide.name}\nPhase: ${phase.label} (${phase.window})\n\n`;
  const playbook = `${header}---\n## Purpose\nWhy this guide exists in this phase.\n\n## Audience\n- Transformation Manager\n- Workstream Leads\n- Practitioners\n\n## Pre-work\n1. Read the phase objective and key outcomes\n2. Collect inputs listed below\n3. Schedule the relevant workshop\n\n## Inputs\n- _____\n- _____\n\n## Step-by-Step\n1. _____\n2. _____\n3. _____\n4. _____\n5. _____\n\n## Outputs\n- _____\n\n## Common Pitfalls\n- _____\n\n## RACI\nReference phase RACI.\n`;
  const specific = {
    "guide-kickoff": `${header}---\n## Kickoff Workshop · 2-hour agenda\n0:00 · Welcome & context (CIO sponsor) — 10m\n0:10 · Why now? Operating reality today — 15m\n0:25 · The 180-day journey · phases & milestones — 20m\n0:45 · Persona alignment exercise — 25m\n1:10 · Risk + readiness conversation — 20m\n1:30 · Working agreement · cadences · channels — 20m\n1:50 · Q&A and commitments — 10m\n\n## Materials Needed\n- Charter draft, persona cards, milestone wall\n\n## Output\n- Steering committee chartered\n- Working agreements signed\n`,
    "guide-maturity": `${header}---\n## Facilitation Notes\n- 60-minute working session per persona\n- 16 questions, score 0-100\n- Capture nuances in qualitative notes\n\n## Roles\n- Facilitator: Transformation Manager\n- Scribe: Workstream Lead\n- Participants: 4-6 per persona\n\n## Output\n- Per-dimension scores\n- Top 3 qualitative gaps per dimension\n- Recommendations list\n`,
    "guide-otel": `${header}---\n## OTel Rollout · Three-Wave Plan\n### Wave 1 (Day 46-60)\n- Tier-1 services · 6 services\n- Validation: 95% trace coverage\n\n### Wave 2 (Day 60-75)\n- Tier-2 services\n\n### Wave 3 (Day 75-90)\n- Long-tail\n\n## Acceptance Criteria\n- < 5 min lag · 99.5% delivery · cost within budget\n`,
    "guide-shadow": `${header}---\n## Shadow Mode Operating Manual\n- Automations run alongside humans, decisions logged but not enacted\n- 14-day window minimum\n- Decision quality scorecard reviewed daily by SRE Lead\n- Go/No-Go decision by AIOps Council with 4 of 5 majority\n`,
    "guide-promotion": `${header}---\n## Shadow → Production Promotion Gate\n1. ≥ 14 days shadow with ≥ 95% decision agreement\n2. Risk Tier review by Change Board\n3. Rollback plan documented and tested\n4. On-call playbook updated\n5. Customer-impact policy reviewed (if applicable)\n6. Final approval: AIOps Council\n`,
  };
  return { name: guide.filename, mime: "text/markdown", content: specific[guide.id] || playbook };
};

export const generateSurveyContent = (phase, survey) => {
  const header = `# ${survey.name}\nPhase: ${phase.label} (${phase.window})\nDistribute via: organizational survey platform · 5-7 minute completion\n\n`;
  const sets = {
    "sv-operating-model": [
      ["1. Rate the clarity of operational roles & responsibilities", "1 (low) — 5 (clear)"],
      ["2. How frequently are operating model decisions revisited?", "Monthly / Quarterly / Annually / Never"],
      ["3. What % of incidents involve more than 3 escalation handoffs?", "<10% / 10-25% / 25-50% / >50%"],
      ["4. Rate the maturity of cross-functional ownership for tier-1 services", "1 (siloed) — 5 (federated)"],
      ["5. Open: What is the single biggest operational friction today?", "Free text"],
    ],
    "sv-leadership-vision": [
      ["1. What is your 12-month vision for IT operations?", "Free text"],
      ["2. Which transformation lever do you believe creates the most value?", "Automation / Observability / SRE / Governance / Other"],
      ["3. What risks worry you most about adopting AIOps?", "Talent / Trust / Cost / Security / Compliance / Other"],
      ["4. What does success look like to the board?", "Free text"],
      ["5. Rate your willingness to fund a 3-year transformation program", "1-5"],
    ],
    "sv-maturity": [
      ["1. % of business services with golden-signal coverage", "<25% / 25-50% / 50-75% / 75-95% / >95%"],
      ["2. How are alert thresholds set?", "Static / Mixed / Anomaly-based / ML-driven"],
      ["3. Are logs, metrics, traces correlated by trace ID?", "Rarely / Select / Most / All tier-1+tier-2"],
      ["4. Is OpenTelemetry used across stacks?", "No / Pilot / Several teams / Enterprise standard"],
      ["5. % of repetitive incidents that auto-remediate", "<5% / 5-20% / 20-50% / >50%"],
      ["6. Are cross-tool runbooks orchestrated?", "No / Manual / Partial / Enterprise-wide"],
      ["7. Median MTTR for P1", ">4h / 1-4h / 30-60m / <30m"],
      ["8. Are blameless postmortems standard?", "No / Some / Most / All teams + action tracking"],
      ["9. IaC adoption maturity", "Partial / Most / Drift detection / Policy-as-code"],
      ["10. FinOps practice in place", "Ad-hoc / Reporting / Showback / Chargeback + auto"],
      ["11. AIOps signal usage in production", "None / Pilot / Several detectors / Closed-loop"],
      ["12. AI governance & approvals", "None / Informal / Review board / Policy-as-code"],
      ["13. Operational toolchain standards", "Per team / Per BU / Reference arch / Policy-as-code"],
      ["14. Change failure rate", ">20% / 10-20% / 5-10% / <5%"],
      ["15. CMDB accuracy", "<60% / 60-80% / 80-95% / >95% auto-discovered"],
      ["16. SLO discipline", "No SLOs / Some / Tier-1 / All + budgets enforced"],
    ],
    "sv-tooling": [
      ["1. List all monitoring/observability tools in use", "Free text"],
      ["2. Estimated annual spend on observability tooling ($)", "Numeric"],
      ["3. % of services with end-to-end tracing", "0-100%"],
      ["4. % of services with centralized logging", "0-100%"],
      ["5. Are there overlapping tools doing the same job?", "Yes / No / Unsure — list"],
    ],
    "sv-incident-toil": [
      ["1. How many hours/week do you spend on repetitive incident triage?", "Numeric"],
      ["2. What incident pattern recurs most?", "Free text"],
      ["3. Rate the noise level of your alert volume", "1 (quiet) — 5 (overwhelming)"],
      ["4. Are runbooks accurate and up-to-date?", "Yes / Partial / No / None exist"],
      ["5. What is the #1 toil-removal opportunity you'd prioritize?", "Free text"],
    ],
    "sv-slo-readiness": [
      ["1. Does your service have defined SLIs?", "Yes / No / In progress"],
      ["2. Is there a documented SLO target?", "Yes / No"],
      ["3. Is there an error-budget policy?", "Yes / No"],
      ["4. Is on-call accountable to the error budget?", "Yes / Partial / No"],
      ["5. Who owns the SLO?", "Free text"],
    ],
    "sv-change-readiness": [
      ["1. How are changes risk-scored?", "Manual / Tooling / Automated risk model"],
      ["2. % of changes that require emergency approval", "0-100%"],
      ["3. Are pre-change anomaly checks in place?", "Yes / No"],
      ["4. Is auto-rollback wired for regressions?", "Yes / No / Partial"],
      ["5. Rate your CAB friction level", "1 (smooth) — 5 (painful)"],
    ],
    "sv-engineer-sentiment": [
      ["1. Compared to 6 months ago, my toil has", "Decreased significantly / Decreased / Same / Increased"],
      ["2. I trust the AIOps recommendations I receive", "1-5"],
      ["3. I have time for improvement work (vs reactive)", "1-5"],
      ["4. The automations I use save me significant time", "1-5"],
      ["5. What would you automate next?", "Free text"],
    ],
    "sv-customer-impact": [
      ["1. Compared to last quarter, my service experience has", "Improved / Same / Worsened"],
      ["2. How disruptive were incidents to your work this quarter?", "1-5"],
      ["3. How responsive is operations when issues arise?", "1-5"],
      ["4. Free comment", "Free text"],
    ],
    "sv-csat": [
      ["1. Overall satisfaction with IT operations", "1-5"],
      ["2. Time-to-resolve satisfaction", "1-5"],
      ["3. Communication during incidents", "1-5"],
      ["4. Proactive notifications", "1-5"],
      ["5. Net Promoter Score (likely to recommend)", "0-10"],
    ],
  };
  const items = sets[survey.id] || [
    ["1. Custom question", "Free text"],
    ["2. Custom question", "1-5"],
  ];
  const body = items.map(([q, a], i) => `### Q${i + 1}. ${q}\nAnswer scale · ${a}\n`).join("\n");
  return { name: survey.filename, mime: "text/markdown", content: header + body };
};
