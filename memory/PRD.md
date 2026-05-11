# AIOps Transformation OS — PRD

## Problem Statement (original)
Build a complete enterprise AIOps & IT Operations Transformation Platform — "AIOps Transformation OS" — boardroom-ready, GitHub Pages deployable, fully frontend-only with mock JSON + localStorage. Inspired by ServiceNow, Dynatrace, Splunk ITSI, Datadog, Palantir, Gartner transformation dashboards. 15 modules.

## User Choices Confirmed (2026-02 build)
- Tech stack: React (CRA) + Tailwind + shadcn/ui + Zustand + Recharts + Framer Motion + jsPDF + html2canvas — 100% frontend, no backend
- Default landing persona: **Transformation Manager**
- Theme: Dual (Obsidian dark + Stark white light) with toggle
- All 15 modules in first pass
- Pure rule-based simulation (no LLM)

## Architecture
- Single-page app using `HashRouter` (GitHub Pages safe)
- Persisted state via Zustand + localStorage
- Mocked enterprise datasets in `src/data/*`
- Shared component library in `src/components`
- Responsive collapsible sidebar; sticky glass header with persona switcher and theme toggle

## Personas implemented (8)
CIO · SDM · EA · CISO · NOC Lead · SRE Lead · Cloud Ops Lead · Transformation Manager

## Modules Implemented (15)
1. Executive Command Center — KPIs, posture gauges, SLA trend, incident trend, predictive risks, journey map, incident heatmap, persona narrative
2. AIOps Maturity Assessment — 10 dimensions, 16 questions, radar chart, tiers (Reactive → Autonomous), benchmark positioning, recommendations
3. Observability Architecture Generator — vendor library (Splunk/Dynatrace/Datadog/OTel/ELK/Prom-Grafana), recommendation engine, telemetry pillars
4. Incident & MTTR Optimization — sliders, projections, distribution, escalation flow, SLA heatmap, ticket aging
5. Automation Discovery — 10 candidates, ROI calc with checkbox-driven selection, tooling mix
6. Predictive Incident Intelligence — live signals, anomaly forecast chart, recommended actions
7. ITIL Transformation — 6 practices with Before/After comparison + practices
8. Cloud Operations — multi-cloud scorecard, efficiency trend, regional footprint
9. NOC / Telecom — site overview, network KPIs, bandwidth chart, segment health, outage correlation
10. SRE Reliability — SLO table, resilience scores, error budget trend, dependency risk
11. Build · Buy · Partner — quadrant matrix, capability portfolio with rationale
12. ROI Calculator — sliders, cost waterfall, 3-year projection, narrative summary
13. Governance & Compliance — maturity, frameworks (SOC2/ISO/GDPR/PCI/DORA/NIS2), policies
14. Executive Report Export — multi-page PDF generation via jsPDF + html2canvas, history
15. Personas — overview & switcher with per-persona KPIs

## Design Tokens
- Fonts: Cabinet Grotesk (headings) · Satoshi (body) · JetBrains Mono (numbers/mono)
- Light: stark white #FBFBFC bg with #0055FF primary
- Dark: obsidian #0A0A0E bg with #3377FF primary
- Chart palette: azure/amber/emerald/crimson (no purple/teal slop)

## State Persistence
- Theme, persona, sidebar collapsed
- Maturity answers, observability generator inputs, ROI inputs
- Generated reports (last 25)

## Deployment Target
GitHub Pages (HashRouter compatible). README includes both gh-pages CLI and GitHub Actions instructions.

## What's Implemented (2026-02-11)
- All 15 modules + sidebar, header, theme toggle, persona switcher
- PDF export with cover, summary, KPIs, recommendations pages
- Responsive layout (mobile sheet menu)
- LocalStorage persistence

## What's Implemented (2026-02-12 — iteration 3)
- **Global Roadmap module** at `/roadmap` — Kanban board with 4 columns (Backlog · Planned · In Progress · Done), KPIs (Total, In Progress, Done, Critical, Modules covered), module + priority filters, module coverage summary.
- **Per-module embedded `<ModuleRoadmap />`** at the bottom of all 16 module pages — list of initiatives for that module with completion bar, status-pill click cycles status, hover reveals edit pencil.
- **Full CRUD dialog** (`RoadmapItemDialog`) — title, description, owner, due date, module, status, priority, effort (S/M/L/XL), impact (L/M/H), tags; persisted via Zustand+localStorage (store version bumped to 2).
- **Seeded with 32 initiatives** (2 per module across 16 modules) — realistic enhancements like "Save maturity snapshots over time", "Auto-rollback on SLO burn", "FinOps chargeback model", etc.
- **Reset to seed** + **New initiative** controls; move-card chips on hover.
- Sidebar gains a 'Roadmap' entry with **NEW** badge under the Command group.
- **Interactive SVG topology diagram** in Observability Architecture (`/observability`):
  14 nodes across Collect → Process → Store → Analyze lanes, animated telemetry pulses on edges,
  filter chips (all/metrics/logs/traces/events), hover/click highlighting, side detail panel with
  connected-to navigation. Component: `src/components/TopologyDiagram.jsx`, data: `src/data/topology.js`.
- **Delivery Kit module** at `/delivery-kit` — 4 phases over 180 days (Mobilize · Discover & Diagnose ·
  Foundation · Scale & Embed). Each phase produces 4–5 deliverables, 3–4 templates (markdown + CSV),
  2–4 guides (playbooks/runbooks/facilitator guides), 2–5 surveys, RACI matrix, milestones (interactive checkboxes).
  Counts: 4 phases · 15 templates · 13 guides · 15 surveys.
  Three download surfaces: per-artifact download, per-phase kit (.md+.csv batch + 4-page briefing PDF),
  full 180-day kit. Page: `src/pages/DeliveryKit.jsx`, data: `src/data/deliveryKit.js`.

## Prioritized Backlog
### P1 (next iteration if user requests)
- Interactive observability architecture diagram (SVG topology with drag/zoom)
- Command palette (cmd+K) wired to navigation
- Animated KPI value counters with milestone markers
- Per-persona route gating to relevant module home

### P2
- Historical maturity comparison (save snapshots over time)
- "Compare two personas" overlay view
- Import/export full localStorage as a project file

### P3
- Optional LLM integration (with backend proxy) for AI-generated transformation narratives
- A11y audit pass + keyboard nav refinements

## Next Action Items
- Validate with testing agent (frontend-only)
- Ship first finish; gather feedback for the next iteration
