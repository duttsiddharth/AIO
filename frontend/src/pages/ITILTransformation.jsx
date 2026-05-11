import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { ITIL_MODULES } from "@/data/itilData";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, CheckCircle2, AlertTriangle } from "lucide-react";

const formatLabel = (k) => {
  const map = {
    mttr: "MTTR (min)",
    automation: "Automation %",
    repeat: "Recurring %",
    csat: "CSAT",
    rcaDays: "RCA days",
    knownErrors: "Known-error articles",
    recurrence: "Recurrence %",
    lead: "Lead time (days)",
    failureRate: "Change failure %",
    emergencyPct: "Emergency change %",
    alertsPerDay: "Alerts / day",
    actionable: "Actionable %",
    accuracy: "Accuracy %",
    freshness: "Freshness %",
    articles: "Articles",
    deflection: "Deflection %",
  };
  return map[k] || k;
};

const goodDirection = {
  mttr: "down",
  repeat: "down",
  rcaDays: "down",
  recurrence: "down",
  lead: "down",
  failureRate: "down",
  emergencyPct: "down",
  alertsPerDay: "down",
};

export default function ITILTransformation() {
  return (
    <div id="export-itil" data-testid="page-itil">
      <PageHeader
        overline="ITIL Transformation"
        title="Before · After · AI-enhanced operations"
        subtitle="Modernize the six ITIL practices that bend the operational cost curve and amplify customer experience."
        actions={<ExportButton targetId="export-itil" title="ITIL Transformation" subtitle="Before vs After" />}
      />

      <Tabs defaultValue={ITIL_MODULES[0].id} className="w-full">
        <TabsList className="flex flex-wrap h-auto justify-start gap-1 mb-4 bg-transparent p-0" data-testid="itil-tabs">
          {ITIL_MODULES.map((m) => (
            <TabsTrigger
              key={m.id}
              value={m.id}
              data-testid={`itil-tab-${m.id}`}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border rounded-md"
            >
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {ITIL_MODULES.map((m) => (
          <TabsContent key={m.id} value={m.id} className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SectionCard title="Before · Traditional Ops" testId={`itil-before-${m.id}`}>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(m.before).map(([k, v]) => (
                    <div key={k} className="rounded-md border border-border p-3">
                      <p className="overline text-muted-foreground">{formatLabel(k)}</p>
                      <p className="font-mono text-2xl tabular-nums mt-1">{v}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title="After · AI-enhanced"
                action={<StatusBadge tone="ok">Target state</StatusBadge>}
                testId={`itil-after-${m.id}`}
              >
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(m.after).map(([k, v]) => {
                    const beforeVal = m.before[k];
                    const direction = goodDirection[k] || "up";
                    const better = direction === "down" ? v < beforeVal : v > beforeVal;
                    return (
                      <div key={k} className="rounded-md border border-primary/40 bg-primary/[0.04] p-3 relative">
                        <p className="overline text-primary">{formatLabel(k)}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <p className="font-mono text-2xl tabular-nums">{v}</p>
                          {better && (
                            <span className="font-mono text-[10px] text-success bg-success/15 px-1.5 py-0.5 rounded-sm">
                              {direction === "down" ? "−" : "+"}{Math.abs(v - beforeVal)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>

            <SectionCard title="Practices that get you there" testId={`itil-practices-${m.id}`} className="mt-4">
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {m.practices.map((p, idx) => (
                  <li key={idx} className="rounded-md border border-border p-3 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5 text-warning" />
                Adoption sequencing matters — pair AI-enhanced practices with governance guardrails (see Governance module).
                <ArrowRight className="h-3.5 w-3.5 ml-auto" />
              </div>
            </SectionCard>
          </TabsContent>
        ))}
      </Tabs>

      <ModuleRoadmap moduleId="itil" />
    </div>
  );
}
