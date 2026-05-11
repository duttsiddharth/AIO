import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import {
  NOC_OVERVIEW,
  NETWORK_KPIS,
  BANDWIDTH_TREND,
  OUTAGE_CORRELATION,
  NETWORK_SEGMENTS,
} from "@/data/nocData";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { Radio, Satellite, Activity, AlertOctagon } from "lucide-react";
import { fmtCompact } from "@/lib/format";

const statusMap = { ok: "ok", warn: "warn", danger: "danger" };

export default function NOCTelecom() {
  return (
    <div id="export-noc" data-testid="page-noc">
      <PageHeader
        overline="NOC · Telecom Operations"
        title="Eyes on every wire and every wave."
        subtitle="Carrier-grade visibility across core, edge, RAN, transport, subsea and satellite — with predictive outage correlation."
        actions={<ExportButton targetId="export-noc" title="NOC / Telecom Operations" subtitle="Carrier-grade snapshot" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-sites-active" label="Active Sites" value={fmtCompact(NOC_OVERVIEW.activeSites)} segment={`${NOC_OVERVIEW.totalSites} total`} trend="+12" direction="up" emphasized />
        <KPICard testId="kpi-sites-degraded" label="Degraded" value={NOC_OVERVIEW.degradedSites} segment="Auto-recovering" trend="-4" direction="up" />
        <KPICard testId="kpi-sites-down" label="Down" value={NOC_OVERVIEW.downSites} segment="Field tech dispatched" trend="-2" direction="up" />
        <KPICard testId="kpi-subscribers" label="Subscribers Served" value={fmtCompact(NOC_OVERVIEW.totalSubscribers)} segment="Active monthly" trend="+3.4%" direction="up" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {NETWORK_KPIS.map((k) => (
          <div key={k.id} className="rounded-md border border-border bg-card p-4" data-testid={`net-kpi-${k.id}`}>
            <p className="overline text-muted-foreground">{k.label}</p>
            <p className="font-mono text-2xl tabular-nums mt-1">{k.value}{k.unit && <span className="text-sm text-muted-foreground ml-0.5">{k.unit}</span>}</p>
            <div className="flex items-center justify-between mt-2">
              <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded-sm ${k.status === "ok" ? "text-success bg-success/10" : "text-warning bg-warning/10"}`}>
                {k.trend}
              </span>
              <StatusBadge tone={statusMap[k.status] || "ok"}>{k.status === "ok" ? "stable" : "watch"}</StatusBadge>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard
          title="Bandwidth Utilization"
          description="Real-time aggregate · 24h rolling"
          className="lg:col-span-2"
          action={<Radio className="h-4 w-4 text-primary" />}
          testId="card-bandwidth"
        >
          <div className="h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={BANDWIDTH_TREND} margin={{ top: 8, right: 12, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="bw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} domain={[0, 100]} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
                <ReferenceLine y={80} stroke="hsl(var(--warning))" strokeDasharray="4 4" label={{ value: "80% threshold", fontSize: 10, fill: "hsl(var(--warning))" }} />
                <Area type="monotone" dataKey="utilization" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#bw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Segment Health" description="Per network layer" action={<Satellite className="h-4 w-4 text-primary" />} testId="card-segments">
          <ul className="space-y-3">
            {NETWORK_SEGMENTS.map((s) => (
              <li key={s.id} className="flex items-center gap-3" data-testid={`segment-${s.id}`}>
                <Activity className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm w-24">{s.label}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.health >= 95 ? "bg-success" : s.health >= 90 ? "bg-primary" : "bg-warning"}`}
                    style={{ width: `${s.health}%` }}
                  />
                </div>
                <span className="font-mono text-xs tabular-nums w-10 text-right">{s.health}%</span>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-warning/30 bg-warning/[0.04] p-3 mt-4">
            <p className="overline text-warning flex items-center gap-1.5"><AlertOctagon className="h-3.5 w-3.5" /> Predicted</p>
            <p className="text-xs text-foreground/80 mt-1">
              Satellite link <span className="font-mono">SAT-EU-04</span> showing rising jitter — failover armed automatically.
            </p>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Outage Correlation" description="Active / recent · last 72h" testId="card-outage">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2.5 pr-4 overline text-muted-foreground">Site</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Root cause</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Duration</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Impact</th>
              </tr>
            </thead>
            <tbody>
              {OUTAGE_CORRELATION.map((o) => (
                <tr key={o.id} className="border-b border-border/60" data-testid={`outage-${o.id}`}>
                  <td className="py-3 pr-4 font-mono">{o.site}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{o.root}</td>
                  <td className="py-3 pr-4 font-mono tabular-nums">{o.duration} min</td>
                  <td className="py-3 pr-4">
                    <StatusBadge tone={o.impact === "metro" || o.impact === "regional" ? "danger" : o.impact === "city" ? "warn" : "info"}>
                      {o.impact}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <ModuleRoadmap moduleId="noc" />
    </div>
  );
}
