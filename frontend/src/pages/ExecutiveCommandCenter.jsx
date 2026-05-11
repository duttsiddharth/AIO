import { motion } from "framer-motion";
import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import KPICard from "@/components/KPICard";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import RadialGauge from "@/components/RadialGauge";
import { useStore } from "@/store/useStore";
import { getPersona } from "@/data/personas";
import {
  COMMAND_KPIS,
  SLA_TREND,
  INCIDENT_TREND,
  RISK_INDICATORS,
  JOURNEY_PHASES,
  HEATMAP_DATA,
} from "@/data/dashboardData";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  ReferenceLine,
} from "recharts";
import { ArrowUpRight, ShieldAlert, Target, Activity, Rocket } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export default function ExecutiveCommandCenter() {
  const persona = useStore((s) => s.persona);
  const p = getPersona(persona);
  const visibleKpis = useMemo(() => COMMAND_KPIS, []);

  return (
    <div id="export-command-center" data-testid="page-command-center">
      <PageHeader
        overline={`Command · ${p.title}`}
        title="Run operations like a portfolio."
        subtitle={`${p.tagline} A live snapshot of operational health, transformation momentum, and predictive risk across the enterprise.`}
        actions={
          <>
            <StatusBadge tone="ok">LIVE · 12 SEC AGO</StatusBadge>
            <ExportButton targetId="export-command-center" title="Executive Command Snapshot" subtitle={p.title} />
          </>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {visibleKpis.map((k, idx) => (
          <KPICard
            key={k.id}
            testId={`kpi-${k.id}`}
            label={k.label}
            value={k.value}
            suffix={k.suffix}
            trend={k.trend}
            direction={k.direction}
            segment={k.segment}
            emphasized={idx === 0}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Maturity gauges */}
        <SectionCard
          title="Transformation Posture"
          description="Composite indices · trailing 90 days"
          className="lg:col-span-1"
          testId="card-posture"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <RadialGauge value={72} label="Transformation" suffix="/100" tone="primary" testId="gauge-transformation" />
              <p className="overline text-primary mt-1">PREDICTIVE TIER</p>
            </div>
            <div className="flex flex-col items-center">
              <RadialGauge value={91} label="Operational" suffix="%" tone="success" testId="gauge-operational" />
              <p className="overline text-success mt-1">HEALTHY</p>
            </div>
            <div className="flex flex-col items-center">
              <RadialGauge value={68} label="Observability" suffix="/100" tone="info" testId="gauge-observability" />
              <p className="overline text-info mt-1">INTEGRATED</p>
            </div>
            <div className="flex flex-col items-center">
              <RadialGauge value={46} label="Automation" suffix="%" tone="warning" testId="gauge-automation" />
              <p className="overline text-warning mt-1">SCALING</p>
            </div>
          </div>
        </SectionCard>

        {/* SLA trend */}
        <SectionCard
          title="SLA Compliance · 12 months"
          description="Composite of all tier-1 services vs 99.9% target"
          className="lg:col-span-2"
          testId="card-sla-trend"
        >
          <div className="h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={SLA_TREND} margin={{ top: 16, right: 12, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  domain={[98.5, 100]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v.toFixed(2)}%`}
                  width={68}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    fontSize: 12,
                    borderRadius: 8,
                  }}
                />
                <ReferenceLine y={99.9} stroke="hsl(var(--warning))" strokeDasharray="4 4" label={{ value: "Target 99.9%", fontSize: 10, fill: "hsl(var(--warning))" }} />
                <Area type="monotone" dataKey="sla" stroke="hsl(var(--primary))" strokeWidth={2.2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Incident trend */}
        <SectionCard
          title="Incident Trend · By Priority"
          description="Monthly counts · P1 / P2 / P3"
          className="lg:col-span-2"
          testId="card-incident-trend"
        >
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={INCIDENT_TREND} margin={{ top: 10, right: 12, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="p3" stackId="a" fill="hsl(var(--chart-1))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="p2" stackId="a" fill="hsl(var(--chart-2))" radius={[0, 0, 0, 0]} />
                <Bar dataKey="p1" stackId="a" fill="hsl(var(--chart-4))" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Predictive risks */}
        <SectionCard
          title="Predictive Risk · Top Signals"
          description="Live AIOps forecasts"
          action={<ShieldAlert className="h-4 w-4 text-warning" />}
          testId="card-predictive-risk"
        >
          <ul className="space-y-3" data-testid="risk-list">
            {RISK_INDICATORS.map((r) => (
              <li key={r.id} className="flex items-start gap-3" data-testid={`risk-item-${r.id}`}>
                <StatusBadge tone={r.severity} className="mt-0.5">
                  {r.severity}
                </StatusBadge>
                <div className="flex-1">
                  <p className="text-sm leading-tight">{r.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground mt-0.5 uppercase tracking-[0.18em]">
                    ETA · {r.eta}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      {/* Journey & heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard
          title="Transformation Journey"
          description="Reactive → Autonomous"
          className="lg:col-span-2"
          action={<Rocket className="h-4 w-4 text-primary" />}
          testId="card-journey"
        >
          <ol className="relative space-y-5 pl-8">
            <span className="absolute left-3 top-1.5 bottom-1.5 w-px bg-border" />
            {JOURNEY_PHASES.map((phase) => (
              <li key={phase.id} className="relative" data-testid={`journey-${phase.id}`}>
                <span className={
                  "absolute -left-[26px] top-1 h-3.5 w-3.5 rounded-full ring-4 ring-background " +
                  (phase.status === "complete" ? "bg-success" :
                   phase.status === "in-progress" ? "bg-primary live-dot" : "bg-muted")
                } />
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-heading text-sm font-medium">{phase.label}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {phase.quarter}
                  </span>
                  <StatusBadge tone={phase.status === "complete" ? "ok" : phase.status === "in-progress" ? "info" : "low"}>
                    {phase.status}
                  </StatusBadge>
                </div>
                <p className="text-xs text-muted-foreground">{phase.description}</p>
              </li>
            ))}
          </ol>
        </SectionCard>

        <SectionCard
          title="Incident Heatmap"
          description="P1 incidents · last 7 days"
          testId="card-heatmap"
        >
          <div className="space-y-1.5">
            {HEATMAP_DATA.map(([svc, ...vals]) => (
              <div key={svc} className="flex items-center gap-2">
                <span className="text-xs w-20 truncate">{svc}</span>
                <div className="flex gap-1">
                  {vals.map((v, i) => {
                    const tone =
                      v === 0 ? "bg-success/15" :
                      v <= 1 ? "bg-success/35" :
                      v <= 2 ? "bg-warning/40" :
                      v <= 3 ? "bg-warning/60" :
                      "bg-destructive/60";
                    return (
                      <div
                        key={i}
                        className={`h-5 w-5 rounded-sm ${tone} border border-border flex items-center justify-center`}
                      >
                        <span className="font-mono text-[9px] text-foreground/70">{v}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
              <span className="overline text-muted-foreground">Less</span>
              <div className="flex gap-1">
                {["bg-success/15", "bg-success/35", "bg-warning/40", "bg-warning/60", "bg-destructive/60"].map((c) => (
                  <span key={c} className={`h-3 w-3 rounded-sm ${c}`} />
                ))}
              </div>
              <span className="overline text-muted-foreground">More</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Persona narrative */}
      <motion.div {...fadeUp} className="rounded-lg border border-primary/25 bg-primary/[0.04] p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="overline text-primary mb-2">Operational Narrative for {p.title}</p>
            <h3 className="font-heading text-2xl tracking-tight leading-tight mb-2">
              You are <span className="text-primary">2 quarters away</span> from breaking into the Autonomous tier.
            </h3>
            <p className="text-sm text-muted-foreground max-w-3xl">
              Maturity uplift is being driven by AIOps signal correlation (+18 pts) and runbook orchestration coverage (+22%).
              The single largest unlocking lever is closing the loop on remediation for the top 6 incident patterns —
              representing <span className="font-mono text-foreground">68%</span> of operational toil.
            </p>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <a href="#/maturity" className="inline-flex items-center gap-1 text-sm text-primary hover:underline" data-testid="link-run-maturity">
                Run maturity deep-dive <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="text-muted-foreground">·</span>
              <a href="#/automation" className="inline-flex items-center gap-1 text-sm text-primary hover:underline" data-testid="link-explore-automation">
                Explore automation candidates <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <span className="text-muted-foreground">·</span>
              <a href="#/roi" className="inline-flex items-center gap-1 text-sm text-primary hover:underline" data-testid="link-financial-case">
                Build financial case <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <Target className="hidden md:block h-10 w-10 text-primary opacity-30" />
        </div>
      </motion.div>
    </div>
  );
}
