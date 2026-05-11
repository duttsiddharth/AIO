import { useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import ExportButton from "@/components/ExportButton";
import TopologyDiagram from "@/components/TopologyDiagram";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/useStore";
import {
  VENDOR_LIBRARY,
  TELEMETRY_PILLARS,
  recommendVendors,
} from "@/data/observabilityData";
import { Network, Database, Layers, GitBranch, Sigma } from "lucide-react";

export default function ObservabilityArchitecture() {
  const inputs = useStore((s) => s.observabilityInputs);
  const setInput = useStore((s) => s.setObservabilityInput);
  const recs = useMemo(() => recommendVendors(inputs), [inputs]);
  const topThree = recs.slice(0, 3);

  return (
    <div id="export-observability" data-testid="page-observability">
      <PageHeader
        overline="Architecture Generator"
        title="Observability blueprint generator"
        subtitle="Generate a vendor-ranked, telemetry-coherent observability architecture from your operating profile."
        actions={<ExportButton targetId="export-observability" title="Observability Architecture" subtitle="Recommendation report" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <SectionCard title="Operating Profile" description="Inputs to the recommendation engine" testId="card-obs-inputs">
          <div className="space-y-4">
            <div>
              <Label className="overline text-muted-foreground">Cloud Model</Label>
              <Select value={inputs.cloudModel} onValueChange={(v) => setInput("cloudModel", v)}>
                <SelectTrigger className="mt-1.5" data-testid="select-cloudModel"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="on_prem">On-prem</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="cloud_native">Cloud-native</SelectItem>
                  <SelectItem value="multi_cloud">Multi-cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Industry</Label>
              <Select value={inputs.industry} onValueChange={(v) => setInput("industry", v)}>
                <SelectTrigger className="mt-1.5" data-testid="select-industry"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="telecom">Telecom</SelectItem>
                  <SelectItem value="banking">Banking</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail / eCommerce</SelectItem>
                  <SelectItem value="public_sector">Public sector</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Environment</Label>
              <Select value={inputs.environment} onValueChange={(v) => setInput("environment", v)}>
                <SelectTrigger className="mt-1.5" data-testid="select-environment"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="non_prod">Non-prod only</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="regulated">Regulated production</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Compliance level</Label>
              <Select value={inputs.compliance} onValueChange={(v) => setInput("compliance", v)}>
                <SelectTrigger className="mt-1.5" data-testid="select-compliance"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High / regulated</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Scale</Label>
              <Select value={inputs.scale} onValueChange={(v) => setInput("scale", v)}>
                <SelectTrigger className="mt-1.5" data-testid="select-scale"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (&lt; 100 services)</SelectItem>
                  <SelectItem value="mid">Mid (100–500)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (500+)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-2 rounded-md">
              <div>
                <Label className="text-sm">Kubernetes-heavy</Label>
                <p className="text-xs text-muted-foreground">Favors Prometheus + OTel</p>
              </div>
              <Switch checked={inputs.k8s} onCheckedChange={(v) => setInput("k8s", v)} data-testid="switch-k8s" />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Recommended Stack"
          description="Ranked by fit to your operating profile"
          className="lg:col-span-2"
          testId="card-obs-recommended"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {topThree.map((vendor, idx) => (
              <div
                key={vendor.id}
                data-testid={`vendor-${vendor.id}`}
                className={`rounded-md border p-4 ${idx === 0 ? "border-primary bg-primary/[0.04]" : "border-border"}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="font-heading text-base">{vendor.name}</p>
                  <span className="font-mono text-xs text-muted-foreground">#{idx + 1}</span>
                </div>
                <p className="overline text-primary">FIT · {vendor.score}/100</p>
                <p className="text-xs text-muted-foreground mt-1">{vendor.category}</p>
                <ul className="mt-3 space-y-1">
                  {vendor.reasons.slice(0, 2).map((r, i) => (
                    <li key={i} className="text-xs leading-snug flex gap-1.5"><span className="text-primary">›</span>{r}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="overline text-muted-foreground mb-2">Telemetry Pillar Flow</p>
          <div className="rounded-md border border-border p-4 bg-background/30">
            <div className="flex flex-wrap items-center gap-2">
              {TELEMETRY_PILLARS.map((p, i) => (
                <div key={p.id} className="flex items-center gap-2">
                  <div className="rounded-md border border-border bg-card px-3 py-1.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{p.label}</p>
                    <p className="text-xs">{p.description}</p>
                  </div>
                  {i < TELEMETRY_PILLARS.length - 1 && <span className="text-muted-foreground">→</span>}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-md border border-dashed border-border p-3">
                <p className="overline text-primary mb-1">Collect</p>
                <p className="text-xs">OpenTelemetry Collector · Fluent Bit · Prom Exporters</p>
              </div>
              <div className="rounded-md border border-dashed border-border p-3">
                <p className="overline text-warning mb-1">Process</p>
                <p className="text-xs">Pipeline: enrich → sample → route → store</p>
              </div>
              <div className="rounded-md border border-dashed border-border p-3">
                <p className="overline text-success mb-1">Analyze</p>
                <p className="text-xs">{topThree[0]?.name || "—"} · Grafana · ServiceNow ITSI</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        title="Reference Topology"
        description="Interactive blueprint · Collect → Process → Store → Analyze"
        action={<StatusBadge tone="info">interactive</StatusBadge>}
        testId="card-topology"
        className="mb-6"
      >
        <TopologyDiagram />
      </SectionCard>

      <SectionCard title="Full Vendor Comparison" description="Coverage scores across telemetry pillars" testId="card-vendor-compare">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead className="text-left">
              <tr className="border-b border-border">
                <th className="py-2.5 pr-4 overline text-muted-foreground">Vendor</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Category</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Logs</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Metrics</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Traces</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Events</th>
                <th className="py-2.5 pr-4 overline text-muted-foreground">Best for</th>
              </tr>
            </thead>
            <tbody>
              {VENDOR_LIBRARY.map((v) => (
                <tr key={v.id} className="border-b border-border/60 hover:bg-accent/40">
                  <td className="py-3 pr-4">
                    <p className="font-medium">{v.name}</p>
                    <p className="text-xs text-muted-foreground">{v.strengths.slice(0, 2).join(" · ")}</p>
                  </td>
                  <td className="py-3 pr-4"><StatusBadge tone="info">{v.category}</StatusBadge></td>
                  {(["logs", "metrics", "traces", "events"]).map((k) => (
                    <td key={k} className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs tabular-nums w-8">{v.coverage[k]}</span>
                        <div className="h-1.5 w-16 rounded-full bg-muted relative overflow-hidden">
                          <div className="absolute inset-y-0 left-0 bg-primary rounded-full" style={{ width: `${v.coverage[k]}%` }} />
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{v.bestFor.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6">
        {[
          { icon: Database, label: "Data sources", value: "412", desc: "Onboarded telemetry sources" },
          { icon: Layers, label: "Pipelines", value: "28", desc: "Routed via OTel collector mesh" },
          { icon: GitBranch, label: "Service mesh integrations", value: "6", desc: "Istio · Linkerd · App Mesh · Consul" },
          { icon: Sigma, label: "Daily ingest", value: "12.4 TB", desc: "Avg 7-day rolling" },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-border bg-card p-4">
            <s.icon className="h-4 w-4 text-primary mb-2" />
            <p className="overline text-muted-foreground">{s.label}</p>
            <p className="font-mono text-2xl tabular-nums">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
