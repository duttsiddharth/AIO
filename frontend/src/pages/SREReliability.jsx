import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import {
  SLO_SERVICES,
  RESILIENCE_SCORES,
  ERROR_BUDGET_TREND,
  DEPENDENCY_RISKS,
} from "@/data/sreData";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ShieldCheck, GitBranch, AlertTriangle } from "lucide-react";

const statusTone = (s) => (s === "ok" ? "ok" : s === "warn" ? "warn" : "danger");

export default function SREReliability() {
  const breaches = SLO_SERVICES.filter((s) => s.attainment < s.slo).length;
  const avgResilience = Math.round(RESILIENCE_SCORES.reduce((a, r) => a + r.resilience, 0) / RESILIENCE_SCORES.length);
  return (
    <div id="export-sre" data-testid="page-sre">
      <PageHeader
        overline="SRE · Reliability Engineering"
        title="Engineer reliability into every release."
        subtitle="SLO attainment, error budgets, resilience scoring and dependency risk — codified into operational reality."
        actions={<ExportButton targetId="export-sre" title="SRE Reliability" subtitle="Reliability snapshot" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-services-tracked" label="Services tracked" value={SLO_SERVICES.length} segment="SLOs defined" trend="+3" direction="up" />
        <KPICard testId="kpi-breaches" label="SLO Breaches" value={breaches} segment="Last 30 days" trend="-2" direction="up" emphasized />
        <KPICard testId="kpi-resilience" label="Resilience Index" value={avgResilience} suffix="/100" trend="+8" direction="up" segment="Avg across services" />
        <KPICard testId="kpi-onfire" label="Burning Budgets" value="2" segment="Error budget &gt; 80%" trend="-1" direction="up" />
      </div>

      <SectionCard title="SLO Attainment" description="Service-level objectives · trailing 30 days" testId="card-slo" className="mb-6">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2.5 pr-4 overline text-muted-foreground">Service</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground text-right">SLO</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground text-right">Attainment</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Error Budget Used</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {SLO_SERVICES.map((s) => (
                <tr key={s.service} className="border-b border-border/60" data-testid={`slo-${s.service.replace(/\s+/g, "-")}`}>
                  <td className="py-3 pr-4 font-medium">{s.service}</td>
                  <td className="py-3 pr-4 text-right font-mono tabular-nums">{s.slo.toFixed(2)}%</td>
                  <td className={`py-3 pr-4 text-right font-mono tabular-nums ${s.attainment >= s.slo ? "text-success" : "text-destructive"}`}>
                    {s.attainment.toFixed(2)}%
                  </td>
                  <td className="py-3 pr-4 w-64">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${s.errorBudgetUsed >= 80 ? "bg-destructive" : s.errorBudgetUsed >= 60 ? "bg-warning" : "bg-success"}`}
                          style={{ width: `${s.errorBudgetUsed}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs tabular-nums w-10 text-right">{s.errorBudgetUsed}%</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <StatusBadge tone={statusTone(s.status)}>{s.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Resilience Score" description="Dependency risk · failure isolation · chaos coverage" className="lg:col-span-2" action={<ShieldCheck className="h-4 w-4 text-primary" />} testId="card-resilience">
          <ul className="space-y-3">
            {RESILIENCE_SCORES.map((r) => (
              <li key={r.service} className="flex items-center gap-3" data-testid={`resilience-${r.service.replace(/\s+/g, "-")}`}>
                <span className="text-sm w-44 truncate">{r.service}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${r.resilience >= 80 ? "bg-success" : r.resilience >= 65 ? "bg-primary" : "bg-warning"}`} style={{ width: `${r.resilience}%` }} />
                </div>
                <span className="font-mono text-xs tabular-nums w-12 text-right">{r.resilience}/100</span>
                <span className="text-xs text-muted-foreground w-24 text-right">{r.deps} deps · {r.criticalDeps} critical</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Error Budget Trend" description="12-week burn rate" action={<GitBranch className="h-4 w-4 text-primary" />} testId="card-error-budget">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <LineChart data={ERROR_BUDGET_TREND} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="payments" stroke="hsl(var(--chart-1))" strokeWidth={1.8} dot={false} name="Payments" />
                <Line type="monotone" dataKey="order" stroke="hsl(var(--chart-2))" strokeWidth={1.8} dot={false} name="Order Capture" />
                <Line type="monotone" dataKey="portal" stroke="hsl(var(--chart-4))" strokeWidth={1.8} dot={false} name="Portal" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Dependency Risk Register" description="Single points of failure · vendor stability · cross-region risk" action={<AlertTriangle className="h-4 w-4 text-warning" />} testId="card-deprisk">
        <ul className="space-y-3">
          {DEPENDENCY_RISKS.map((d, idx) => (
            <li key={idx} className="rounded-md border border-border p-3 flex items-start gap-3" data-testid={`deprisk-${idx}`}>
              <StatusBadge tone={d.risk === "high" ? "danger" : "warn"}>{d.risk}</StatusBadge>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  <span className="text-foreground">{d.source}</span>
                  <span className="text-muted-foreground"> → </span>
                  <span className="font-mono">{d.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.reason}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </div>
  );
}
