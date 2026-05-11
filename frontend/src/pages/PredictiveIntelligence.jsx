import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { Button } from "@/components/ui/button";
import { PREDICTIVE_SIGNALS, ANOMALY_FORECAST } from "@/data/predictiveData";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
} from "recharts";
import { Sparkles, Zap, GitMerge, ArrowRight } from "lucide-react";

export default function PredictiveIntelligence() {
  const [active, setActive] = useState(PREDICTIVE_SIGNALS[0]);

  return (
    <div id="export-predictive" data-testid="page-predictive">
      <PageHeader
        overline="AIOps · Predictive"
        title="Predictive incident intelligence"
        subtitle="Forecast SLA breaches, anomalies, capacity exhaustion, and recurring incident patterns — before they detonate."
        actions={<ExportButton targetId="export-predictive" title="Predictive Intelligence" subtitle="Forecast snapshot" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Live Signals" description="Ranked by probability × blast radius" testId="card-signals">
          <ul className="space-y-2">
            {PREDICTIVE_SIGNALS.map((s) => {
              const isActive = active.id === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(s)}
                    data-testid={`signal-${s.id}`}
                    className={
                      "w-full text-left rounded-md border p-3 transition-colors " +
                      (isActive ? "border-primary bg-primary/[0.04]" : "border-border hover:border-primary/40")
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <StatusBadge tone={s.severity}>{s.severity}</StatusBadge>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {Math.round(s.probability * 100)}% · {s.eta}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-tight">{s.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">{s.service}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </SectionCard>

        <SectionCard
          title={active.title}
          description={active.service}
          action={<StatusBadge tone={active.severity}>{active.severity}</StatusBadge>}
          className="lg:col-span-2"
          testId="card-signal-detail"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="rounded-md border border-border p-3">
              <p className="overline text-muted-foreground">Confidence</p>
              <p className="font-mono text-3xl tabular-nums mt-1">{Math.round(active.probability * 100)}%</p>
              <div className="h-1.5 mt-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${active.probability * 100}%` }} />
              </div>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="overline text-muted-foreground">Time to impact</p>
              <p className="font-mono text-2xl tabular-nums mt-1">{active.eta}</p>
              <p className="text-xs text-muted-foreground mt-1">vs SLA window</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <p className="overline text-muted-foreground">Affected services</p>
              <p className="font-mono text-2xl tabular-nums mt-1">{active.affected.length}</p>
              <p className="text-xs text-muted-foreground mt-1">{active.affected.slice(0, 2).join(" · ")}…</p>
            </div>
          </div>

          <div className="rounded-md border border-border p-4 mb-4">
            <p className="overline text-warning mb-1">Probable Root Cause</p>
            <p className="text-sm">{active.rootCause}</p>
          </div>

          <div className="rounded-md border border-primary/30 bg-primary/[0.04] p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="overline text-primary">Recommended Action</p>
            </div>
            <p className="text-sm leading-relaxed">{active.recommendation}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Button size="sm" data-testid="action-acknowledge">Acknowledge</Button>
              <Button size="sm" variant="outline" data-testid="action-runbook">
                <Zap className="h-3.5 w-3.5 mr-1.5" /> Open runbook
              </Button>
              <Button size="sm" variant="outline" data-testid="action-swarm">
                <GitMerge className="h-3.5 w-3.5 mr-1.5" /> Start swarm
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <p className="overline text-muted-foreground mb-2">Affected services</p>
            <div className="flex flex-wrap gap-1.5">
              {active.affected.map((s) => (
                <span key={s} className="font-mono text-[11px] px-2 py-1 rounded-sm bg-accent/60 border border-border">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Anomaly Forecast" description="Latency p95 · baseline vs observed vs forecast" testId="card-anomaly">
        <div className="h-[280px]">
          <ResponsiveContainer>
            <LineChart data={ANOMALY_FORECAST} margin={{ top: 8, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceArea x1="18:00" x2="23:00" fill="hsl(var(--warning))" fillOpacity={0.08} />
              <Line type="monotone" dataKey="baseline" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" dot={false} name="Baseline" />
              <Line type="monotone" dataKey="observed" stroke="hsl(var(--chart-1))" strokeWidth={2.2} dot={false} name="Observed" />
              <Line type="monotone" dataKey="forecast" stroke="hsl(var(--warning))" strokeWidth={2.2} strokeDasharray="6 4" dot={false} name="Forecast" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
          <ArrowRight className="h-3 w-3" />
          Shaded window indicates predicted SLA breach probability above 70%
        </div>
      </SectionCard>
    </div>
  );
}
