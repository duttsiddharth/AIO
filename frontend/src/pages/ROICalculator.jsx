import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import { fmtCurrency, fmtNumber, fmtMinutes } from "@/lib/format";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { TrendingUp, Calculator, Wallet, Clock } from "lucide-react";

const computeFinancials = (inputs) => {
  const yearlyTickets = inputs.ticketsPerMonth * 12;
  const currentHandleHours = (yearlyTickets * inputs.avgHandleMinutes) / 60;
  const currentLaborCost = currentHandleHours * inputs.engineerHourlyCost;

  const automationDelta = Math.max(0, inputs.targetAutomationPct - inputs.currentAutomationPct) / 100;
  const automatedHandleMins = Math.max(6, inputs.avgHandleMinutes * 0.22);

  const mttrReductionFactor = Math.max(0, inputs.mttrCurrentMinutes - inputs.mttrTargetMinutes) / Math.max(1, inputs.mttrCurrentMinutes);

  const ticketsAutomated = yearlyTickets * automationDelta;
  const minutesSavedPerAutoTicket = inputs.avgHandleMinutes - automatedHandleMins;
  const mttrSavedTickets = (yearlyTickets - ticketsAutomated) * mttrReductionFactor * (inputs.avgHandleMinutes - automatedHandleMins) * 0.4;

  const minutesSaved = (ticketsAutomated * minutesSavedPerAutoTicket) + mttrSavedTickets;
  const hoursSaved = minutesSaved / 60;
  const laborSavings = hoursSaved * inputs.engineerHourlyCost;

  const toolingOptimization = inputs.toolingSpendAnnual * 0.18;
  const cloudOptimization = inputs.cloudSpendAnnual * 0.12;
  const totalAnnualSavings = laborSavings + toolingOptimization + cloudOptimization;

  const investment = 2_400_000; // assumed program investment
  const paybackMonths = totalAnnualSavings > 0 ? (investment / totalAnnualSavings) * 12 : 0;
  const roiPct = totalAnnualSavings > 0 ? ((totalAnnualSavings - investment / 3) / (investment / 3)) * 100 : 0;

  // 3-year projection
  const projection = [0, 1, 2].map((y) => ({
    year: `Yr ${y + 1}`,
    cumulative: Math.round(totalAnnualSavings * (1 + y * 0.25)) * (y + 1),
    annual: Math.round(totalAnnualSavings * (1 + y * 0.25)),
  }));

  return {
    yearlyTickets,
    currentLaborCost,
    laborSavings,
    toolingOptimization,
    cloudOptimization,
    totalAnnualSavings,
    investment,
    paybackMonths,
    roiPct,
    hoursSaved,
    projection,
  };
};

export default function ROICalculator() {
  const inputs = useStore((s) => s.roiInputs);
  const setInput = useStore((s) => s.setROIInput);
  const fin = useMemo(() => computeFinancials(inputs), [inputs]);

  const waterfall = [
    { name: "Labor", value: Math.round(fin.laborSavings), color: "hsl(var(--chart-1))" },
    { name: "Tooling", value: Math.round(fin.toolingOptimization), color: "hsl(var(--chart-2))" },
    { name: "Cloud", value: Math.round(fin.cloudOptimization), color: "hsl(var(--chart-3))" },
    { name: "Total", value: Math.round(fin.totalAnnualSavings), color: "hsl(var(--primary))" },
  ];

  return (
    <div id="export-roi" data-testid="page-roi">
      <PageHeader
        overline="Financial Value"
        title="AI ROI & financial value calculator"
        subtitle="Quantify the dollar impact of operational AI investment with labor, tooling, and cloud optimization levers."
        actions={<ExportButton targetId="export-roi" title="AI ROI Financial Case" subtitle="Annualized projection" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <KPICard testId="kpi-annual-savings" label="Annual Savings" value={fmtCurrency(fin.totalAnnualSavings)} segment="Year 1 run-rate" emphasized trend="+22%" direction="up" />
        <KPICard testId="kpi-roi" label="ROI (Year 1)" value={`${Math.round(fin.roiPct)}%`} segment="Net of investment" trend="+18 pts" direction="up" />
        <KPICard testId="kpi-payback" label="Payback Period" value={fin.paybackMonths > 0 ? `${fin.paybackMonths.toFixed(1)} mo` : "—"} segment="Months to recover" trend="-6 mo" direction="up" />
        <KPICard testId="kpi-hours" label="Engineering Hours Saved" value={fmtNumber(Math.round(fin.hoursSaved))} segment="Per year" trend="+34%" direction="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Levers" description="Adjust to see live impact" testId="card-roi-levers">
          <div className="space-y-4">
            <Field label="Tickets / month" value={inputs.ticketsPerMonth} onChange={(v) => setInput("ticketsPerMonth", v)} />
            <Field label="Avg handle time (min)" value={inputs.avgHandleMinutes} onChange={(v) => setInput("avgHandleMinutes", v)} />
            <Field label="Engineer hourly cost ($)" value={inputs.engineerHourlyCost} onChange={(v) => setInput("engineerHourlyCost", v)} />
            <SliderField label="Current automation %" value={inputs.currentAutomationPct} max={80} onChange={(v) => setInput("currentAutomationPct", v)} suffix="%" />
            <SliderField label="Target automation %" value={inputs.targetAutomationPct} max={95} min={20} onChange={(v) => setInput("targetAutomationPct", v)} suffix="%" />
            <Field label="Annual tooling spend ($)" value={inputs.toolingSpendAnnual} onChange={(v) => setInput("toolingSpendAnnual", v)} />
            <Field label="Annual cloud spend ($)" value={inputs.cloudSpendAnnual} onChange={(v) => setInput("cloudSpendAnnual", v)} />
            <SliderField label="Current MTTR (min)" value={inputs.mttrCurrentMinutes} max={240} min={10} onChange={(v) => setInput("mttrCurrentMinutes", v)} suffix="m" />
            <SliderField label="Target MTTR (min)" value={inputs.mttrTargetMinutes} max={120} min={5} onChange={(v) => setInput("mttrTargetMinutes", v)} suffix="m" />
          </div>
        </SectionCard>

        <SectionCard title="Cost Waterfall" description="Annual savings · stacked contribution" className="lg:col-span-2" testId="card-waterfall">
          <div className="h-[300px]">
            <ResponsiveContainer>
              <BarChart data={waterfall} margin={{ top: 16, right: 16, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }}
                  formatter={(v) => fmtCurrency(v)}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {waterfall.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                  <LabelList dataKey="value" position="top" formatter={(v) => fmtCurrency(v)} style={{ fontSize: 10, fill: "hsl(var(--foreground))" }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Labor savings via automation + tooling optimization (~18%) + cloud right-sizing (~12%).
          </p>
        </SectionCard>
      </div>

      <SectionCard title="3-Year Projection" description="Cumulative savings · annual run-rate" testId="card-projection" className="mb-6">
        <div className="h-[280px]">
          <ResponsiveContainer>
            <LineChart data={fin.projection} margin={{ top: 16, right: 16, bottom: 0, left: -10 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", fontSize: 12, borderRadius: 8 }} formatter={(v) => fmtCurrency(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="annual" stroke="hsl(var(--chart-2))" strokeWidth={2.2} dot={{ r: 4 }} name="Annual savings" />
              <Line type="monotone" dataKey="cumulative" stroke="hsl(var(--primary))" strokeWidth={2.2} dot={{ r: 4 }} name="Cumulative" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SectionCard title="Narrative Summary" testId="card-narrative">
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Wallet className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">
                <span className="font-medium">{fmtCurrency(fin.totalAnnualSavings)}</span> in annualized run-rate savings.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">
                Payback in <span className="font-medium">{fin.paybackMonths.toFixed(1)} months</span> on a ${fin.investment / 1_000_000}M transformation investment.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Calculator className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">
                MTTR reduction from <span className="font-mono">{fmtMinutes(inputs.mttrCurrentMinutes)}</span> to <span className="font-mono">{fmtMinutes(inputs.mttrTargetMinutes)}</span> · {fmtNumber(Math.round(fin.hoursSaved))} hours redeployed annually.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
              <span className="text-sm">
                Year-1 ROI <span className="font-medium">{Math.round(fin.roiPct)}%</span> with conservative tooling/cloud levers.
              </span>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Assumptions" testId="card-assumptions">
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Yearly tickets</span>
              <span className="font-mono">{fmtNumber(fin.yearlyTickets)}</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Automated handle time</span>
              <span className="font-mono">~22% of manual</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Tooling rationalization</span>
              <span className="font-mono">18% spend reduction</span>
            </li>
            <li className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Cloud right-sizing</span>
              <span className="font-mono">12% spend reduction</span>
            </li>
            <li className="flex justify-between">
              <span className="text-muted-foreground">Transformation investment</span>
              <span className="font-mono">${fin.investment / 1_000_000}M</span>
            </li>
          </ul>
          <StatusBadge tone="info" className="mt-4">
            Conservative assumptions
          </StatusBadge>
        </SectionCard>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <Label className="overline text-muted-foreground">{label}</Label>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 font-mono"
        data-testid={`roi-input-${label.replace(/\s+/g, "-").toLowerCase()}`}
      />
    </div>
  );
}

function SliderField({ label, value, min = 0, max = 100, suffix, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <Label>{label}</Label>
        <span className="font-mono tabular-nums">{value}{suffix}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(v) => onChange(v[0])}
        className="mt-2"
        data-testid={`slider-${label.replace(/\s+/g, "-").toLowerCase()}`}
      />
    </div>
  );
}
