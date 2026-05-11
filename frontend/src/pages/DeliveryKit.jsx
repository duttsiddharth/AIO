import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import jsPDF from "jspdf";
import {
  DELIVERY_PHASES,
  phaseStats,
  generateTemplateContent,
  generateGuideContent,
  generateSurveyContent,
} from "@/data/deliveryKit";
import {
  Rocket,
  Download,
  FileText,
  ClipboardList,
  BookOpen,
  CheckCircle2,
  Circle,
  Package,
  Target,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TONE_TO_CLASS = {
  info: "border-info/40 bg-info/[0.04]",
  primary: "border-primary/40 bg-primary/[0.04]",
  warning: "border-warning/40 bg-warning/[0.04]",
  success: "border-success/40 bg-success/[0.04]",
};

const downloadText = ({ name, mime, content }) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

const generatePhasePdf = (phase) => {
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();

  // Cover
  pdf.setFillColor(10, 10, 14);
  pdf.rect(0, 0, w, h, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(30);
  pdf.text("AIOps Transformation OS", 36, 90);
  pdf.setFontSize(22);
  pdf.text(phase.label, 36, 130);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(14);
  pdf.text(phase.window + "  ·  " + phase.days, 36, 156);
  pdf.setTextColor(180, 180, 190);
  const objLines = pdf.splitTextToSize(phase.objective, w - 72);
  pdf.text(objLines, 36, 200);
  pdf.setTextColor(160, 160, 170);
  pdf.text(`Generated · ${new Date().toLocaleString()}`, 36, h - 50);
  pdf.text("Confidential · Phase delivery briefing", 36, h - 34);

  // Page 2 — Outcomes & Milestones
  pdf.addPage();
  pdf.setTextColor(20, 20, 20);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("Key Outcomes", 36, 60);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  let y = 90;
  phase.keyOutcomes.forEach((o) => {
    const lines = pdf.splitTextToSize("• " + o, w - 72);
    lines.forEach((l) => {
      pdf.text(l, 36, y);
      y += 16;
    });
    y += 4;
  });
  y += 12;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("Milestones", 36, y);
  y += 22;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  phase.milestones.forEach((m) => {
    pdf.text(m, 36, y);
    y += 16;
  });

  // Page 3 — Deliverables & Artifacts
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("Deliverables & Artifact Kit", 36, 60);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  y = 90;
  pdf.setFont("helvetica", "bold");
  pdf.text("Deliverables", 36, y);
  y += 18;
  pdf.setFont("helvetica", "normal");
  phase.deliverables.forEach((d) => {
    pdf.text("• " + d, 36, y);
    y += 16;
  });
  y += 12;
  pdf.setFont("helvetica", "bold");
  pdf.text("Templates", 36, y);
  y += 18;
  pdf.setFont("helvetica", "normal");
  phase.templates.forEach((t) => {
    pdf.text("• " + t.name + "  (" + t.filename + ")", 36, y);
    y += 16;
  });
  y += 8;
  pdf.setFont("helvetica", "bold");
  pdf.text("Guides", 36, y);
  y += 18;
  pdf.setFont("helvetica", "normal");
  phase.guides.forEach((g) => {
    pdf.text("• " + g.name, 36, y);
    y += 16;
  });
  y += 8;
  pdf.setFont("helvetica", "bold");
  pdf.text("Surveys", 36, y);
  y += 18;
  pdf.setFont("helvetica", "normal");
  phase.surveys.forEach((s) => {
    pdf.text("• " + s.name, 36, y);
    y += 16;
  });

  // Page 4 — RACI
  pdf.addPage();
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text("RACI Matrix", 36, 60);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  y = 90;
  phase.raci.forEach((r) => {
    pdf.text(r.role, 36, y);
    pdf.text(r.r === "R" ? "Responsible" : r.r === "A" ? "Accountable" : r.r === "C" ? "Consulted" : "Informed", 280, y);
    y += 16;
  });

  pdf.save(`${phase.id}-phase-briefing.pdf`);
};

const downloadAllPhase = (phase) => {
  phase.templates.forEach((t) => downloadText(generateTemplateContent(phase, t)));
  phase.guides.forEach((g) => downloadText(generateGuideContent(phase, g)));
  phase.surveys.forEach((s) => downloadText(generateSurveyContent(phase, s)));
  toast.success(`${phase.label} kit downloaded`, {
    description: `${phase.templates.length} templates · ${phase.guides.length} guides · ${phase.surveys.length} surveys`,
  });
};

const downloadFullKit = () => {
  DELIVERY_PHASES.forEach((p) => downloadAllPhase(p));
  toast.success("Complete 180-day delivery kit downloaded", {
    description: `${DELIVERY_PHASES.length} phases · all templates/guides/surveys`,
  });
};

export default function DeliveryKit() {
  const [activePhase, setActivePhase] = useState(DELIVERY_PHASES[0].id);
  const [completedMilestones, setCompletedMilestones] = useState(new Set());

  const totals = useMemo(() => {
    return DELIVERY_PHASES.reduce(
      (a, p) => {
        const s = phaseStats(p);
        a.templates += s.templates;
        a.guides += s.guides;
        a.surveys += s.surveys;
        a.milestones += s.milestones;
        return a;
      },
      { templates: 0, guides: 0, surveys: 0, milestones: 0 }
    );
  }, []);

  const toggleMilestone = (m) => {
    const next = new Set(completedMilestones);
    if (next.has(m)) next.delete(m);
    else next.add(m);
    setCompletedMilestones(next);
  };

  return (
    <div id="export-delivery-kit" data-testid="page-delivery-kit">
      <PageHeader
        overline="Implementation · Delivery Kit"
        title="The 180-day end-to-end delivery kit."
        subtitle="A phased, opinionated playbook with the templates, guides, surveys, RACI and milestones that turn the transformation strategy into operating reality."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={downloadFullKit} data-testid="download-full-kit">
              <Package className="h-4 w-4 mr-1.5" /> Download full kit
            </Button>
          </>
        }
      />

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-phases" label="Phases" value={DELIVERY_PHASES.length} segment="Day 0 → Day 180" trend="180d" direction="up" emphasized />
        <KPICard testId="kpi-templates" label="Templates" value={totals.templates} segment="Ready to download" trend="downloadable" direction="up" />
        <KPICard testId="kpi-guides" label="Guides" value={totals.guides} segment="Workshop · playbook · runbook" trend="practitioner" direction="up" />
        <KPICard testId="kpi-surveys" label="Surveys" value={totals.surveys} segment="Stakeholder + practitioner" trend="evidence" direction="up" />
      </div>

      {/* Phase timeline strip */}
      <SectionCard
        title="Phase Roadmap"
        description="Click a phase to dive in"
        testId="card-phase-roadmap"
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {DELIVERY_PHASES.map((phase, idx) => {
            const isActive = activePhase === phase.id;
            const stats = phaseStats(phase);
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActivePhase(phase.id)}
                data-testid={`phase-card-${phase.id}`}
                className={cn(
                  "text-left rounded-md border p-4 transition-all relative overflow-hidden",
                  isActive ? "border-primary bg-primary/[0.04] ring-1 ring-primary" : "border-border hover:border-primary/40"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="overline text-primary">{phase.window}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{phase.days}</span>
                </div>
                <p className="font-heading text-base font-medium leading-tight">{phase.label}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                  {phase.objective.split(".")[0]}.
                </p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                  <span>{stats.deliverables} deliv</span>
                  <span>·</span>
                  <span>{stats.templates} tmpl</span>
                  <span>·</span>
                  <span>{stats.surveys} surveys</span>
                </div>
                <span
                  className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    phase.color === "info" && "bg-info",
                    phase.color === "primary" && "bg-primary",
                    phase.color === "warning" && "bg-warning",
                    phase.color === "success" && "bg-success"
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Timeline ruler */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="relative h-12">
            <div className="absolute inset-x-0 top-6 h-px bg-border" />
            {DELIVERY_PHASES.map((phase, idx) => {
              // approximate position based on window end days
              const endDay = parseInt(phase.window.split("–").pop().trim().replace("Day ", "")) || (idx + 1) * 45;
              const pct = Math.min(100, (endDay / 180) * 100);
              return (
                <div key={phase.id} className="absolute" style={{ left: `calc(${pct}% - 1px)` }}>
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full -translate-x-1/2 mt-[18px]",
                      phase.color === "info" && "bg-info",
                      phase.color === "primary" && "bg-primary",
                      phase.color === "warning" && "bg-warning",
                      phase.color === "success" && "bg-success"
                    )}
                  />
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground -translate-x-1/2 mt-2 whitespace-nowrap">
                    D{endDay}
                  </p>
                </div>
              );
            })}
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground absolute left-0 -translate-y-2">D0</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground absolute right-0 -translate-y-2">D180</p>
          </div>
        </div>
      </SectionCard>

      {/* Phase deep-dive */}
      <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
        <TabsList className="hidden">
          {DELIVERY_PHASES.map((p) => (
            <TabsTrigger key={p.id} value={p.id}>{p.label}</TabsTrigger>
          ))}
        </TabsList>

        {DELIVERY_PHASES.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Phase header summary */}
              <div className={cn("rounded-lg border p-5 mb-4", TONE_TO_CLASS[phase.color])} data-testid={`phase-summary-${phase.id}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="overline text-primary mb-1">{phase.window} · {phase.days}</p>
                    <h2 className="font-heading text-2xl tracking-tight">{phase.label}</h2>
                    <p className="text-sm text-muted-foreground mt-2 max-w-3xl">{phase.objective}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generatePhasePdf(phase)}
                      data-testid={`phase-pdf-${phase.id}`}
                    >
                      <FileText className="h-3.5 w-3.5 mr-1.5" /> Phase briefing PDF
                    </Button>
                    <Button size="sm" onClick={() => downloadAllPhase(phase)} data-testid={`phase-download-all-${phase.id}`}>
                      <Download className="h-3.5 w-3.5 mr-1.5" /> Download phase kit
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Key outcomes + RACI */}
                <SectionCard
                  title="Key Outcomes"
                  description="What 'done' means"
                  action={<Target className="h-4 w-4 text-primary" />}
                  testId={`card-outcomes-${phase.id}`}
                >
                  <ul className="space-y-2.5">
                    {phase.keyOutcomes.map((o, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm" data-testid={`outcome-${phase.id}-${idx}`}>
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span className="leading-snug">{o}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-border">
                    <p className="overline text-muted-foreground mb-3 flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> RACI
                    </p>
                    <ul className="space-y-1.5">
                      {phase.raci.map((r, idx) => (
                        <li key={idx} className="flex items-center justify-between text-xs">
                          <span>{r.role}</span>
                          <StatusBadge
                            tone={r.r === "A" ? "info" : r.r === "R" ? "ok" : r.r === "C" ? "warn" : "low"}
                          >
                            {r.r === "A" ? "Accountable" : r.r === "R" ? "Responsible" : r.r === "C" ? "Consulted" : "Informed"}
                          </StatusBadge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </SectionCard>

                {/* Milestones (interactive checklist) */}
                <SectionCard
                  title="Milestones"
                  description="Tick off as the phase progresses"
                  action={<Rocket className="h-4 w-4 text-primary" />}
                  testId={`card-milestones-${phase.id}`}
                >
                  <ul className="space-y-2">
                    {phase.milestones.map((m, idx) => {
                      const key = `${phase.id}-${idx}`;
                      const isDone = completedMilestones.has(key);
                      return (
                        <li key={idx}>
                          <button
                            type="button"
                            onClick={() => toggleMilestone(key)}
                            data-testid={`milestone-${phase.id}-${idx}`}
                            className="flex items-start gap-2 text-sm w-full text-left rounded-md px-2 py-1.5 hover:bg-accent/50"
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                            )}
                            <span className={cn("leading-snug", isDone && "line-through text-muted-foreground")}>{m}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mt-4 pt-3 border-t border-border">
                    <p className="overline text-muted-foreground mb-2">Deliverables</p>
                    <ul className="space-y-1 text-xs text-foreground/80">
                      {phase.deliverables.map((d, idx) => (
                        <li key={idx} className="font-mono">· {d}</li>
                      ))}
                    </ul>
                  </div>
                </SectionCard>

                {/* Artifacts column */}
                <SectionCard
                  title="Artifact Kit"
                  description="Templates · guides · surveys"
                  action={<Package className="h-4 w-4 text-primary" />}
                  testId={`card-artifacts-${phase.id}`}
                >
                  <ArtifactList
                    icon={ClipboardList}
                    label="Templates"
                    items={phase.templates}
                    onDownload={(t) => downloadText(generateTemplateContent(phase, t))}
                    phaseId={phase.id}
                    kind="template"
                  />
                  <ArtifactList
                    icon={BookOpen}
                    label="Guides"
                    items={phase.guides}
                    onDownload={(g) => downloadText(generateGuideContent(phase, g))}
                    phaseId={phase.id}
                    kind="guide"
                  />
                  <ArtifactList
                    icon={FileText}
                    label="Surveys"
                    items={phase.surveys}
                    onDownload={(s) => downloadText(generateSurveyContent(phase, s))}
                    phaseId={phase.id}
                    kind="survey"
                  />
                </SectionCard>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Footer story */}
      <div className="rounded-lg border border-primary/30 bg-primary/[0.04] p-6 mt-6">
        <p className="overline text-primary mb-2">Why this kit works</p>
        <p className="text-sm leading-relaxed max-w-3xl">
          Most transformation programs fail in execution, not strategy. This kit converts the AIOps OS strategy into
          phase-gated artifacts — every survey, every template, every guide — so the work is reproducible across business units.
          Pair each phase with the relevant module: <span className="font-mono text-foreground">Maturity</span> drives Phase 1,
          <span className="font-mono text-foreground"> Observability</span> &
          <span className="font-mono text-foreground"> Automation</span> drive Phase 2,
          <span className="font-mono text-foreground"> SRE</span>, <span className="font-mono text-foreground">Cloud</span>,
          and <span className="font-mono text-foreground">Governance</span> anchor Phase 3.
        </p>
      </div>
    </div>
  );
}

function ArtifactList({ icon: Icon, label, items, onDownload, phaseId, kind }) {
  if (!items?.length) return null;
  return (
    <div className="mb-4 last:mb-0">
      <p className="overline text-muted-foreground mb-2 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" /> {label} · {items.length}
      </p>
      <ul className="space-y-1.5">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-center justify-between rounded-md border border-border bg-background/40 px-2.5 py-1.5"
            data-testid={`${kind}-${it.id}`}
          >
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{it.name}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground truncate">{it.filename}</p>
            </div>
            <button
              type="button"
              onClick={() => onDownload(it)}
              data-testid={`download-${kind}-${it.id}`}
              className="ml-2 shrink-0 text-xs text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
