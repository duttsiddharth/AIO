import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import ExportButton from "@/components/ExportButton";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { AUTOMATION_CANDIDATES, computeAutomationROI } from "@/data/automationData";
import { fmtCurrency, fmtNumber } from "@/lib/format";
import { Workflow, Sparkles, Filter } from "lucide-react";

const personas = ["All", "SRE", "Cloud Ops", "SDM", "NOC"];

export default function AutomationDiscovery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(new Set(AUTOMATION_CANDIDATES.map((c) => c.id)));

  const filtered = useMemo(() => {
    return AUTOMATION_CANDIDATES.filter((c) => filter === "All" || c.persona === filter);
  }, [filter]);

  const selectedCandidates = AUTOMATION_CANDIDATES.filter((c) => selected.has(c.id));
  const roi = computeAutomationROI(selectedCandidates);

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div id="export-automation" data-testid="page-automation">
      <PageHeader
        overline="Discovery Engine"
        title="Automation discovery & ROI"
        subtitle="Identify recurring incident patterns and surface high-confidence automation candidates with ROI quantification."
        actions={<ExportButton targetId="export-automation" title="Automation Discovery" subtitle="Candidate library + ROI" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-candidates" label="Candidates" value={AUTOMATION_CANDIDATES.length} segment="Discovered" trend="+22%" direction="up" />
        <KPICard testId="kpi-hours-saved" label="Hours Saved / yr" value={fmtNumber(roi.annualHoursSaved)} segment="Selected candidates" trend="+34%" direction="up" />
        <KPICard testId="kpi-savings-yr" label="Annual Savings" value={fmtCurrency(roi.annualSavings)} segment="Engineer hourly" emphasized trend="+41%" direction="up" />
        <KPICard testId="kpi-fte" label="FTE Equivalent" value={roi.fteEquivalent} suffix=" FTE" segment="Re-deployable" trend="+0.6" direction="up" />
      </div>

      <SectionCard
        title="Automation Candidates"
        description="Discovered patterns ranked by confidence & impact"
        action={
          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {personas.map((p) => (
              <Button
                key={p}
                size="sm"
                variant={filter === p ? "default" : "outline"}
                className="h-7 px-2.5 text-[11px]"
                onClick={() => setFilter(p)}
                data-testid={`filter-${p.replace(/\s+/g, "")}`}
              >
                {p}
              </Button>
            ))}
          </div>
        }
        testId="card-candidates"
      >
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2.5 px-2 overline text-muted-foreground w-8"></th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Pattern</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Trigger</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground text-right">Occurrences</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground text-right">Manual min</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground text-right">Confidence</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Tool</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Impact / Risk</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border/60 hover:bg-accent/40" data-testid={`candidate-${c.id}`}>
                  <td className="py-3 px-2">
                    <Checkbox checked={selected.has(c.id)} onCheckedChange={() => toggle(c.id)} data-testid={`check-${c.id}`} />
                  </td>
                  <td className="py-3 pr-4">
                    <p className="font-medium leading-tight flex items-center gap-2">
                      <Workflow className="h-3.5 w-3.5 text-primary" /> {c.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{c.persona}</p>
                  </td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">
                    <span className="font-mono px-1.5 py-0.5 bg-accent/40 rounded-sm">{c.pattern}</span>
                  </td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums">{c.occurrences}</td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums">{c.avgManualMins}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="font-mono text-xs tabular-nums w-8 text-right">{c.confidence}%</span>
                      <div className="h-1.5 w-14 rounded-full bg-muted relative overflow-hidden">
                        <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${c.confidence}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-xs">{c.tool}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      <StatusBadge tone={c.impact === "high" ? "ok" : c.impact === "medium" ? "info" : "low"}>impact · {c.impact}</StatusBadge>
                      <StatusBadge tone={c.risk === "low" ? "low" : c.risk === "medium" ? "warn" : "danger"}>risk · {c.risk}</StatusBadge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <SectionCard
          title="Recommended Tooling Mix"
          description="Best-fit orchestration stack per persona"
          action={<Sparkles className="h-4 w-4 text-primary" />}
          testId="card-tooling"
        >
          <ul className="space-y-3">
            {[
              { persona: "SRE", stack: ["ArgoCD", "Ansible", "PagerDuty"], coverage: 78 },
              { persona: "Cloud Ops", stack: ["Terraform", "Rundeck", "Vault"], coverage: 84 },
              { persona: "SDM", stack: ["ServiceNow Flow", "PowerShell", "Power Automate"], coverage: 71 },
              { persona: "NOC", stack: ["AIOps engine", "Splunk SOAR", "Custom Python"], coverage: 88 },
            ].map((row) => (
              <li key={row.persona} className="border-l-2 border-primary/40 pl-3" data-testid={`tooling-${row.persona}`}>
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm">{row.persona}</p>
                  <span className="font-mono text-xs text-muted-foreground">coverage · {row.coverage}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {row.stack.map((s) => (
                    <span key={s} className="font-mono text-[10px] uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-sm bg-accent/60">
                      {s}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Selected ROI Summary" description="Quantification of the selected candidates" testId="card-roi-summary">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border p-4">
              <p className="overline text-muted-foreground">Hours saved · yr</p>
              <p className="font-mono text-3xl mt-1 tabular-nums">{fmtNumber(roi.annualHoursSaved)}</p>
            </div>
            <div className="rounded-md border border-border p-4">
              <p className="overline text-muted-foreground">Annual savings</p>
              <p className="font-mono text-3xl mt-1 tabular-nums">{fmtCurrency(roi.annualSavings)}</p>
            </div>
            <div className="rounded-md border border-border p-4">
              <p className="overline text-muted-foreground">FTE equivalent</p>
              <p className="font-mono text-3xl mt-1 tabular-nums">{roi.fteEquivalent}</p>
            </div>
            <div className="rounded-md border border-border p-4">
              <p className="overline text-muted-foreground">Candidates selected</p>
              <p className="font-mono text-3xl mt-1 tabular-nums">{selectedCandidates.length}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Click checkboxes above to add/remove candidates and watch ROI update in real time.
          </p>
        </SectionCard>
      </div>

      <ModuleRoadmap moduleId="automation" />
    </div>
  );
}
