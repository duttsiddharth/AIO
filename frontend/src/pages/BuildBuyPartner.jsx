import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import { CAPABILITIES, decisionColor } from "@/data/buildBuyData";
import ModuleRoadmap from "@/components/ModuleRoadmap";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  ReferenceLine,
} from "recharts";
import { Scale, Hammer, ShoppingCart, Handshake, Layers } from "lucide-react";

const decisionIcon = {
  Build: Hammer,
  Buy: ShoppingCart,
  Partner: Handshake,
  Hybrid: Layers,
};

export default function BuildBuyPartner() {
  const quadrants = [
    { x: 0, y: 0, w: 50, h: 50, label: "Buy / Partner", hint: "Low differentiation, mature market" },
    { x: 50, y: 0, w: 50, h: 50, label: "Build (Selectively)", hint: "Strategic but immature" },
    { x: 0, y: 50, w: 50, h: 50, label: "Buy", hint: "Mature & commoditized" },
    { x: 50, y: 50, w: 50, h: 50, label: "Build", hint: "Differentiating & mature" },
  ];

  return (
    <div id="export-bbp" data-testid="page-build-buy-partner">
      <PageHeader
        overline="Strategic Decision Intelligence"
        title="Build · Buy · Partner"
        subtitle="Allocate transformation investment intelligently across the operating capability portfolio."
        actions={<ExportButton targetId="export-bbp" title="Build vs Buy vs Partner" subtitle="Strategic decision matrix" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <SectionCard title="Decision Matrix" description="Differentiation vs Market Maturity" className="lg:col-span-3" testId="card-matrix">
          <div className="h-[420px] relative">
            <ResponsiveContainer>
              <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="maturity"
                  name="Market Maturity"
                  domain={[0, 6]}
                  ticks={[0, 1, 2, 3, 4, 5, 6]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }}
                  label={{ value: "Market Maturity →", position: "insideBottom", offset: -2, fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  type="number"
                  dataKey="differentiation"
                  name="Strategic Differentiation"
                  domain={[0, 6]}
                  ticks={[0, 1, 2, 3, 4, 5, 6]}
                  stroke="hsl(var(--muted-foreground))"
                  tick={{ fontSize: 11, fontFamily: "JetBrains Mono" }}
                  label={{ value: "↑ Strategic Differentiation", angle: -90, position: "insideLeft", offset: 14, fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <ZAxis type="number" dataKey="speed" range={[80, 220]} />
                <ReferenceLine x={3} stroke="hsl(var(--border))" />
                <ReferenceLine y={3} stroke="hsl(var(--border))" />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="rounded-md border border-border bg-popover p-3 text-xs">
                        <p className="font-heading font-medium">{d.label}</p>
                        <p className="text-muted-foreground mt-0.5">{d.summary}</p>
                        <p className="mt-1.5 font-mono">Decision: <span className="text-primary">{d.decision}</span></p>
                      </div>
                    );
                  }}
                />
                <Scatter data={CAPABILITIES} fill="hsl(var(--primary))">
                  {CAPABILITIES.map((c, i) => null)}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
            {/* Quadrant labels */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-2 right-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Build</div>
              <div className="absolute top-2 left-12 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Build selectively</div>
              <div className="absolute bottom-10 right-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Buy</div>
              <div className="absolute bottom-10 left-12 text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">Partner</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Legend" className="lg:col-span-2" testId="card-legend">
          <ul className="space-y-3">
            {[
              { d: "Build", tone: "primary", desc: "Strategic differentiator. Invest in deep engineering." },
              { d: "Buy", tone: "warning", desc: "Mature market. Optimize for speed-to-value." },
              { d: "Partner", tone: "info", desc: "Specialized expertise. Co-build with system integrator." },
              { d: "Hybrid", tone: "success", desc: "Best-of-both. Buy platform, build differentiating layer." },
            ].map((row) => {
              const Icon = decisionIcon[row.d];
              return (
                <li key={row.d} className="flex items-start gap-3 rounded-md border border-border p-3">
                  <Icon className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <p className="font-heading text-sm">{row.d}</p>
                    <p className="text-xs text-muted-foreground">{row.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>

      <SectionCard title="Capability Portfolio" description="Per-capability decision with rationale" testId="card-capabilities">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="py-2.5 pr-4 overline text-muted-foreground">Capability</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Decision</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Differentiation</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Maturity</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Speed</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Risk</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Rationale</th>
              </tr>
            </thead>
            <tbody>
              {CAPABILITIES.map((c) => {
                const Icon = decisionIcon[c.decision] || Scale;
                return (
                  <tr key={c.id} className="border-b border-border/60" data-testid={`capability-${c.id}`}>
                    <td className="py-3 pr-4">
                      <p className="font-medium leading-tight">{c.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.summary}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded-sm border border-border bg-accent/40">
                        <Icon className="h-3 w-3" /> {c.decision}
                      </span>
                    </td>
                    {["differentiation", "maturity", "speed", "risk"].map((k) => (
                      <td key={k} className="py-3 pr-4">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <span
                              key={n}
                              className={`h-1.5 w-3 rounded-sm ${n <= c[k] ? (k === "risk" ? "bg-warning" : "bg-primary") : "bg-muted"}`}
                            />
                          ))}
                        </div>
                      </td>
                    ))}
                    <td className="py-3 pr-4 text-xs text-muted-foreground max-w-md leading-snug">{c.rationale}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <ModuleRoadmap moduleId="build-buy-partner" />
    </div>
  );
}
