import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { GOVERNANCE_DIMENSIONS, COMPLIANCE_FRAMEWORKS, AI_AUTOMATION_POLICIES } from "@/data/governanceData";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import { Lock, ShieldCheck, FileText } from "lucide-react";

export default function Governance() {
  return (
    <div id="export-governance" data-testid="page-governance">
      <PageHeader
        overline="Governance & Compliance Center"
        title="Govern autonomy. Defend trust."
        subtitle="Codify guardrails, model risk scoring, audit readiness, and compliance posture for operational AI."
        actions={<ExportButton targetId="export-governance" title="Governance & Compliance" subtitle="Operational AI guardrails" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <SectionCard title="Governance Maturity" description="Per dimension vs target" testId="card-gov-maturity">
          <ul className="space-y-3">
            {GOVERNANCE_DIMENSIONS.map((d) => (
              <li key={d.id} className="flex items-center gap-3" data-testid={`gov-${d.id}`}>
                <span className="text-sm w-44">{d.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${d.score}%` }} />
                  <div className="absolute inset-y-0 w-px bg-success" style={{ left: `${d.target}%` }} />
                </div>
                <span className="font-mono text-xs tabular-nums w-12 text-right">{d.score}/100</span>
                <span className="font-mono text-[10px] text-success w-10 text-right">{d.trend}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 bg-primary rounded-sm" /> Current</span>
            <span className="flex items-center gap-1"><span className="h-2 w-px bg-success" /> Target</span>
          </div>
        </SectionCard>

        <SectionCard title="Compliance Frameworks" description="Coverage + last audit" action={<ShieldCheck className="h-4 w-4 text-primary" />} testId="card-compliance">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COMPLIANCE_FRAMEWORKS.map((f) => (
              <li key={f.id} className="rounded-md border border-border p-3" data-testid={`compliance-${f.id}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-heading text-sm">{f.label}</p>
                  <StatusBadge tone={f.status === "ok" ? "ok" : f.status === "warn" ? "warn" : f.status === "na" ? "low" : "info"}>
                    {f.status === "na" ? "N/A" : f.status}
                  </StatusBadge>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="overline text-muted-foreground">Coverage</p>
                    <p className="font-mono text-xl tabular-nums">{f.coverage}%</p>
                  </div>
                  <div className="text-right">
                    <p className="overline text-muted-foreground">Last audit</p>
                    <p className="font-mono text-xs">{f.lastAudit}</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden mt-3">
                  <div className={`h-full ${f.coverage >= 90 ? "bg-success" : f.coverage >= 70 ? "bg-primary" : "bg-warning"}`} style={{ width: `${f.coverage}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="AI & Automation Policies" description="Operational guardrails enforced by policy-as-code" action={<Lock className="h-4 w-4 text-primary" />} testId="card-policies">
        <ul className="space-y-3">
          {AI_AUTOMATION_POLICIES.map((p) => (
            <li key={p.id} className="rounded-md border border-border p-3 flex items-start gap-3" data-testid={`policy-${p.id}`}>
              <FileText className="h-4 w-4 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-sm">{p.policy}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Owner · {p.owner}</p>
              </div>
              <StatusBadge tone={p.status === "enforced" ? "ok" : "warn"}>{p.status}</StatusBadge>
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {[
          { label: "Open audit findings", value: 8, tone: "warn", desc: "All scheduled for resolution this quarter" },
          { label: "Critical risk items", value: 2, tone: "danger", desc: "Mitigation in flight" },
          { label: "Approved automations", value: 142, tone: "ok", desc: "Cleared by CAB & policy engine" },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="overline text-muted-foreground">{s.label}</p>
              <StatusBadge tone={s.tone}>tracked</StatusBadge>
            </div>
            <p className="font-mono text-3xl mt-2 tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <ModuleRoadmap moduleId="governance" />
    </div>
  );
}
