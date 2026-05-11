import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import MaturityRadar from "@/components/MaturityRadar";
import RadialGauge from "@/components/RadialGauge";
import ExportButton from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import {
  MATURITY_DIMENSIONS,
  MATURITY_QUESTIONS,
  MATURITY_TIERS,
} from "@/data/maturityData";
import { RotateCcw, Target, Lightbulb, TrendingUp } from "lucide-react";

const computeScores = (answers) => {
  const byDim = {};
  MATURITY_DIMENSIONS.forEach((d) => (byDim[d.id] = { sum: 0, count: 0 }));
  MATURITY_QUESTIONS.forEach((q) => {
    const ans = answers[q.id];
    if (ans !== undefined) {
      const score = q.options[ans]?.score ?? 0;
      byDim[q.dimension].sum += score;
      byDim[q.dimension].count += 1;
    }
  });
  const dimScores = MATURITY_DIMENSIONS.map((d) => {
    const data = byDim[d.id];
    const score = data.count > 0 ? Math.round(data.sum / data.count) : 0;
    return { ...d, score };
  });
  const totalWeight = MATURITY_DIMENSIONS.reduce((a, d) => a + d.weight, 0);
  const weighted = dimScores.reduce((a, d) => a + d.score * d.weight, 0) / totalWeight;
  const overall = Math.round(weighted);
  const tier = MATURITY_TIERS.find((t) => overall >= t.min && overall < t.max) || MATURITY_TIERS[MATURITY_TIERS.length - 1];
  const recommendations = dimScores
    .filter((d) => d.score < d.benchmark + 10)
    .sort((a, b) => a.score - b.score)
    .slice(0, 4)
    .map((d) => ({
      dimension: d.label,
      gap: Math.max(0, d.benchmark - d.score),
      action: recommendationFor(d.id),
    }));
  return { dimScores, overall, tier, recommendations };
};

const recommendationFor = (id) => {
  const map = {
    monitoring: "Deploy golden-signal coverage to all tier-1/2 services; replace 80% static thresholds with anomaly detection.",
    observability: "Standardize on OpenTelemetry; correlate logs, metrics, traces via trace-id; build service-aware enrichment.",
    automation: "Inventory top 10 repetitive incidents; close-loop remediate via Ansible/Rundeck; add shadow-mode gate.",
    incident_mgmt: "Swarm-based triage, blameless postmortems with action tracking, AI-drafted RCAs.",
    cloud_ops: "Enforce IaC + drift detection; mature FinOps to chargeback; expand K8s multi-tenant guardrails.",
    ai_readiness: "Stand up AI governance board; data lineage; productionize anomaly detectors with model risk scoring.",
    governance: "Codify policies as code; integrate with CI/CD; enterprise reference architecture for ops toolchain.",
    change: "Risk-scored CAB automation; pre-change anomaly checks; auto-rollback on regression.",
    cmdb: "Continuous discovery; topology reconciliation; service mapping; data quality SLOs on CMDB.",
    sre: "Define SLOs for all tier-1 services; enforce error budgets; resilience reviews.",
  };
  return map[id] || "Prioritize remediation gaps surfaced by the assessment.";
};

export default function MaturityAssessment() {
  const answers = useStore((s) => s.maturityAnswers);
  const setAnswer = useStore((s) => s.setMaturityAnswer);
  const reset = useStore((s) => s.resetMaturity);

  const { dimScores, overall, tier, recommendations } = useMemo(() => computeScores(answers), [answers]);
  const radarData = dimScores.map((d) => ({ label: d.label, score: d.score, benchmark: d.benchmark }));
  const answered = Object.keys(answers).length;
  const total = MATURITY_QUESTIONS.length;

  return (
    <div id="export-maturity" data-testid="page-maturity">
      <PageHeader
        overline="Assessment Engine"
        title="AIOps Maturity Assessment"
        subtitle="Score 10 dimensions of operational maturity against industry benchmarks. Drives the transformation roadmap and the ROI case."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={reset} data-testid="maturity-reset">
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
            </Button>
            <ExportButton targetId="export-maturity" title="AIOps Maturity Assessment" subtitle={`${tier.label} · ${overall}/100`} />
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Overall Maturity" description="Weighted composite across 10 dimensions" testId="card-overall-maturity">
          <div className="flex flex-col items-center">
            <RadialGauge value={overall} max={100} suffix="/100" tone={tier.color} size={220} testId="gauge-maturity-overall" />
            <StatusBadge tone={tier.color === "primary" ? "info" : tier.color} className="mt-2">
              TIER · {tier.label}
            </StatusBadge>
            <p className="text-xs text-muted-foreground text-center mt-3 max-w-xs">{tier.description}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-3">
              {answered} of {total} questions answered
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Dimension Radar" description="Your org vs industry benchmark" className="lg:col-span-2" testId="card-radar">
          <MaturityRadar data={radarData} height={340} />
        </SectionCard>
      </div>

      <SectionCard title="Maturity Tiers" testId="card-tiers" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {MATURITY_TIERS.map((t) => {
            const active = tier.id === t.id;
            return (
              <div
                key={t.id}
                data-testid={`tier-${t.id}`}
                className={`rounded-md border p-3 ${active ? "border-primary bg-primary/[0.05]" : "border-border"}`}
              >
                <p className="overline text-muted-foreground mb-1">{t.min}–{t.max}</p>
                <p className="font-heading text-sm font-medium">{t.label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">{t.description}</p>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Self-Assessment" description="Answer to update scores in real time." testId="card-assessment" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {MATURITY_QUESTIONS.map((q) => {
            const dim = MATURITY_DIMENSIONS.find((d) => d.id === q.dimension);
            const value = answers[q.id]?.toString() ?? "";
            return (
              <div key={q.id} data-testid={`question-${q.id}`}>
                <p className="overline text-primary mb-1">{dim?.label}</p>
                <p className="text-sm font-medium mb-2">{q.text}</p>
                <RadioGroup
                  value={value}
                  onValueChange={(v) => setAnswer(q.id, Number(v))}
                  className="grid gap-2"
                >
                  {q.options.map((opt, idx) => (
                    <Label
                      key={idx}
                      htmlFor={`${q.id}-${idx}`}
                      className="flex items-center gap-2 cursor-pointer rounded-md border border-border bg-background/40 px-3 py-2 text-sm hover:border-primary/50"
                    >
                      <RadioGroupItem value={String(idx)} id={`${q.id}-${idx}`} />
                      <span>{opt.label}</span>
                      <span className="ml-auto font-mono text-xs text-muted-foreground">{opt.score}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard
          title="Top Recommendations"
          description="Largest benchmark gaps across the 10 dimensions"
          action={<Lightbulb className="h-4 w-4 text-warning" />}
          testId="card-recommendations"
        >
          {recommendations.length === 0 ? (
            <p className="text-sm text-muted-foreground">Answer at least one question per dimension to receive tailored guidance.</p>
          ) : (
            <ul className="space-y-4">
              {recommendations.map((r, idx) => (
                <li key={idx} className="border-l-2 border-primary/40 pl-3" data-testid={`recommendation-${idx}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-heading text-sm font-medium">{r.dimension}</p>
                    <StatusBadge tone="warn">Gap · {r.gap} pts</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-snug">{r.action}</p>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title="Benchmark Positioning"
          description="Where you stand vs the industry median"
          action={<TrendingUp className="h-4 w-4 text-primary" />}
          testId="card-benchmark"
        >
          <ul className="space-y-3">
            {dimScores.map((d) => {
              const delta = d.score - d.benchmark;
              return (
                <li key={d.id} className="flex items-center gap-3" data-testid={`dim-${d.id}`}>
                  <span className="text-sm w-40 truncate">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      style={{ width: `${d.score}%` }}
                    />
                    <div className="absolute inset-y-0 w-px bg-muted-foreground/60" style={{ left: `${d.benchmark}%` }} />
                  </div>
                  <span className="font-mono text-xs w-16 text-right tabular-nums">{d.score}/100</span>
                  <span className={`font-mono text-[10px] w-10 text-right ${delta >= 0 ? "text-success" : "text-destructive"}`}>
                    {delta >= 0 ? "+" : ""}{delta}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="h-2 w-2 bg-primary rounded-sm" /> Your score</span>
            <span className="flex items-center gap-1"><span className="h-2 w-px bg-muted-foreground" /> Benchmark median</span>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
