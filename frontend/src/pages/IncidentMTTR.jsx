import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import ExportButton from "@/components/ExportButton";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import {
  INCIDENT_BUCKETS,
  ESCALATION_FLOW,
  SLA_HEATMAP,
  TICKET_AGING,
  computeMTTRProjection,
} from "@/data/incidentData";
import { fmtCurrency, fmtNumber, fmtMinutes } from "@/lib/format";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const slaColor = (val) => {
  if (val >= 99.9) return "bg-success/40";
  if (val >= 99.5) return "bg-warning/40";
  if (val >= 99) return "bg-warning/60";
  return "bg-destructive/60";
};

export default function IncidentMTTR() {
  const roi = useStore((s) => s.roiInputs);
  const setRoi = useStore((s) => s.setROIInput);

  const projection = useMemo(
    () => computeMTTRProjection({
      incidents: 950,
      manualMinutes: roi.mttrCurrentMinutes,
      automationPct: roi.currentAutomationPct,
      targetAutomationPct: roi.targetAutomationPct,
      hourlyCost: roi.engineerHourlyCost,
    }),
    [roi]
  );

  const pieData = ESCALATION_FLOW.map((e) => ({ name: e.layer, value: e.resolved }));
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

  return (
    <div id="export-incidents" data-testid="page-incidents">
      <PageHeader
        overline="Operational Analytics"
        title="Incident & MTTR optimization"
        subtitle="Quantify the lift from automation, escalation tuning, and noise reduction. Surface where every minute is spent."
        actions={<ExportButton targetId="export-incidents" title="MTTR Optimization Report" subtitle="Operational analytics" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-mttr-current" label="Current MTTR" value={fmtMinutes(projection.currentMttr)} trend="-12%" direction="down" segment="Last 30 days" />
        <KPICard testId="kpi-mttr-projected" label="Projected MTTR" value={fmtMinutes(projection.projectedMttr)} trend={`-${projection.mttrReductionPct}%`} direction="up" segment="Target state" />
        <KPICard testId="kpi-hours-saved" label="Hours Saved / month" value={fmtNumber(projection.monthlyHoursSaved)} trend="+18%" direction="up" segment="Engineering time" />
        <KPICard testId="kpi-savings" label="Annual Savings" value={fmtCurrency(projection.annualDollarSavings)} trend="+22%" direction="up" segment="Engineer hourly cost" emphasized />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="What-if levers" description="Drag the sliders — projection updates live" testId="card-levers">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm">
                <Label>Current MTTR (minutes)</Label>
                <span className="font-mono">{roi.mttrCurrentMinutes}</span>
              </div>
              <Slider
                value={[roi.mttrCurrentMinutes]}
                min={20}
                max={180}
                step={1}
                onValueChange={(v) => setRoi("mttrCurrentMinutes", v[0])}
                className="mt-2"
                data-testid="slider-mttr-current"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <Label>Current automation %</Label>
                <span className="font-mono">{roi.currentAutomationPct}%</span>
              </div>
              <Slider
                value={[roi.currentAutomationPct]}
                min={0}
                max={80}
                step={1}
                onValueChange={(v) => setRoi("currentAutomationPct", v[0])}
                className="mt-2"
                data-testid="slider-automation-current"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <Label>Target automation %</Label>
                <span className="font-mono">{roi.targetAutomationPct}%</span>
              </div>
              <Slider
                value={[roi.targetAutomationPct]}
                min={20}
                max={95}
                step={1}
                onValueChange={(v) => setRoi("targetAutomationPct", v[0])}
                className="mt-2"
                data-testid="slider-automation-target"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <Label>Engineer hourly cost</Label>
                <span className="font-mono">${roi.engineerHourlyCost}</span>
              </div>
              <Slider
                value={[roi.engineerHourlyCost]}
                min={40}
                max={250}
                step={5}
                onValueChange={(v) => setRoi("engineerHourlyCost", v[0])}
                className="mt-2"
                data-testid="slider-hourly-cost"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Incident Distribution" description="Volume + automatability per pattern" className="lg:col-span-2" testId="card-incident-dist">
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={INCIDENT_BUCKETS} layout="vertical" margin={{ top: 4, right: 16, bottom: 0, left: 8 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="category" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={180} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[0, 3, 3, 0]}>
                  <LabelList dataKey="automatable" position="right" formatter={(v) => `${v}% auto`} style={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Escalation Flow" description="Funnel · L1 → L3 → Vendor" testId="card-escalation">
          <div className="space-y-3 mb-4">
            {ESCALATION_FLOW.map((e, idx) => (
              <div key={e.layer}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{e.layer}</span>
                  <span className="font-mono text-muted-foreground tabular-nums">in {e.incoming} · res {e.resolved}</span>
                </div>
                <div className="h-2.5 rounded-full bg-muted relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary/80 rounded-full"
                    style={{ width: `${(e.resolved / 100) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 bg-warning/80 rounded-r-full"
                    style={{ left: `${e.resolved}%`, width: `${(e.escalated / 100) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="h-[180px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={2}>
                  {pieData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} stroke="hsl(var(--card))" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="SLA Heatmap" description="Weekly availability · tier-1 services" className="lg:col-span-2" testId="card-sla-heatmap">
          <div className="overflow-x-auto scrollbar-thin">
            <table className="text-xs w-full">
              <thead>
                <tr>
                  <th className="text-left pr-3 pb-2 overline text-muted-foreground">Service</th>
                  {["W-4", "W-3", "W-2", "W-1"].map((w) => (
                    <th key={w} className="pb-2 overline text-muted-foreground text-center">{w}</th>
                  ))}
                  <th className="text-right pl-3 pb-2 overline text-muted-foreground">Trend</th>
                </tr>
              </thead>
              <tbody>
                {SLA_HEATMAP.map((row) => {
                  const last = row.week4;
                  const first = row.week1;
                  const delta = last - first;
                  return (
                    <tr key={row.service}>
                      <td className="py-1.5 pr-3 text-sm">{row.service}</td>
                      {[row.week1, row.week2, row.week3, row.week4].map((v, i) => (
                        <td key={i} className="py-1 px-1">
                          <div
                            className={`h-8 rounded-sm flex items-center justify-center font-mono text-[10px] border border-border ${slaColor(v)}`}
                            title={`${row.service} W${i+1}: ${v}%`}
                          >
                            {v.toFixed(2)}
                          </div>
                        </td>
                      ))}
                      <td className="py-1.5 pl-3 text-right font-mono text-[11px]">
                        <span className={delta >= 0 ? "text-success" : "text-destructive"}>
                          {delta >= 0 ? "+" : ""}{delta.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Ticket Aging" description="Open ticket distribution" testId="card-aging">
        <div className="h-[200px]">
          <ResponsiveContainer>
            <BarChart data={TICKET_AGING} margin={{ top: 8, right: 12, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="bucket" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="count" fill="hsl(var(--chart-3))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <ModuleRoadmap moduleId="incidents" />
    </div>
  );
}
