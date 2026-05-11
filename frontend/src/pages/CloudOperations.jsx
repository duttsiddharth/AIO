import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { CLOUD_SCORECARD, CLOUD_EFFICIENCY_TREND, REGION_FOOTPRINT } from "@/data/cloudData";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Cloud, Globe2 } from "lucide-react";

export default function CloudOperations() {
  const avg = Math.round(CLOUD_SCORECARD.reduce((a, c) => a + c.maturity, 0) / CLOUD_SCORECARD.length);
  return (
    <div id="export-cloud" data-testid="page-cloud">
      <PageHeader
        overline="Cloud Operations Transformation"
        title="Operate the cloud like a public utility."
        subtitle="Multi-cloud maturity scorecards, regional footprint, FinOps posture, and efficiency trends."
        actions={<ExportButton targetId="export-cloud" title="Cloud Operations Transformation" subtitle="Multi-cloud scorecard" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-cloud-maturity" label="Composite Maturity" value={avg} suffix="/100" trend="+6 pts" direction="up" segment="Avg across pillars" emphasized />
        <KPICard testId="kpi-regions" label="Active Regions" value={REGION_FOOTPRINT.length} segment="Across 3 hyperscalers" trend="+1" direction="up" />
        <KPICard testId="kpi-spend" label="Annualized Spend" value="$22.4M" segment="OPEX run-rate" trend="-4.8%" direction="up" />
        <KPICard testId="kpi-eff" label="Efficiency Score" value="84" suffix="/100" trend="+9 pts" direction="up" segment="FinOps + IaC" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Maturity Scorecard" description="Per cloud / capability" className="lg:col-span-2" testId="card-cloud-scorecard">
          <ul className="space-y-3">
            {CLOUD_SCORECARD.map((row) => (
              <li key={row.id} className="flex items-center gap-3" data-testid={`cloud-${row.id}`}>
                <Cloud className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm w-48">{row.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${row.maturity}%` }} />
                </div>
                <span className="font-mono text-xs tabular-nums w-12 text-right">{row.maturity}/100</span>
                <span className="font-mono text-[10px] text-success w-10 text-right">{row.trend}</span>
                <span className="text-xs text-muted-foreground w-64 truncate hidden md:block">{row.topGap}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Efficiency Trend" description="FinOps optimization YoY" testId="card-efficiency">
          <div className="h-[260px]">
            <ResponsiveContainer>
              <AreaChart data={CLOUD_EFFICIENCY_TREND} margin={{ top: 8, right: 12, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="effG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="efficiency" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#effG)" name="Efficiency %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Regional Footprint"
        description="Services · availability · spend"
        action={<Globe2 className="h-4 w-4 text-primary" />}
        testId="card-regions"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {REGION_FOOTPRINT.map((r) => {
            const availTone = r.availability >= 99.95 ? "ok" : r.availability >= 99.9 ? "info" : "warn";
            return (
              <div key={r.region} className="rounded-md border border-border p-3" data-testid={`region-${r.region}`}>
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm">{r.region}</p>
                  <StatusBadge tone={availTone}>{r.availability.toFixed(2)}%</StatusBadge>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div>
                    <p className="overline text-muted-foreground">Services</p>
                    <p className="font-mono text-xl tabular-nums">{r.services}</p>
                  </div>
                  <div className="text-right">
                    <p className="overline text-muted-foreground">Spend</p>
                    <p className="font-mono text-xl tabular-nums">${r.spend}M</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <ModuleRoadmap moduleId="cloud" />
    </div>
  );
}
