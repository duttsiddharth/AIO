import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOPOLOGY_NODES, TOPOLOGY_EDGES, TELEMETRY_KINDS } from "@/data/topology";
import { Database, Layers, Network, Sparkles, Server, Globe, Cpu, Activity, BarChart2, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  k8s: Box,
  vms: Server,
  apps: Cpu,
  net: Globe,
  otel: Network,
  pipeline: Layers,
  topology: Activity,
  tsdb: BarChart2,
  logs: Database,
  traces: Activity,
  events: Sparkles,
  aiops: Sparkles,
  itsi: Activity,
  console: Layers,
};

const NODE_W = 160;
const NODE_H = 56;
const VB_W = 1000;
const VB_H = 560;

export default function TopologyDiagram() {
  const [activeKind, setActiveKind] = useState("all");
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  const nodesById = useMemo(() => Object.fromEntries(TOPOLOGY_NODES.map((n) => [n.id, n])), []);

  const visibleEdges = useMemo(() => {
    if (activeKind === "all") return TOPOLOGY_EDGES;
    return TOPOLOGY_EDGES.filter((e) => e.kind === activeKind);
  }, [activeKind]);

  // Adjacency for highlight on hover/select
  const neighborSet = useMemo(() => {
    const target = selected?.id || hovered;
    if (!target) return null;
    const s = new Set([target]);
    TOPOLOGY_EDGES.forEach((e) => {
      if (e.from === target) s.add(e.to);
      if (e.to === target) s.add(e.from);
    });
    return s;
  }, [hovered, selected]);

  return (
    <div className="relative" data-testid="topology-diagram">
      {/* Legend / controls */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setActiveKind("all")}
          data-testid="topology-filter-all"
          className={cn(
            "font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border transition-colors",
            activeKind === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          All telemetry
        </button>
        {Object.entries(TELEMETRY_KINDS).map(([k, v]) => (
          <button
            key={k}
            type="button"
            onClick={() => setActiveKind(k)}
            data-testid={`topology-filter-${k}`}
            className={cn(
              "font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm border flex items-center gap-1.5 transition-colors",
              activeKind === k
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: v.color }} />
            {v.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-muted-foreground hidden md:inline">
          Hover a node to highlight its dependencies · click to inspect
        </span>
      </div>

      <div className="rounded-md border border-border bg-card relative overflow-hidden">
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
          {/* Subtle grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeOpacity="0.4" strokeWidth="0.5" />
            </pattern>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" opacity="0.55" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
            </marker>
          </defs>
          <rect width={VB_W} height={VB_H} fill="url(#grid)" opacity="0.5" />

          {/* Lane labels */}
          {["Collect", "Process", "Store", "Analyze"].map((lane, i) => (
            <g key={lane}>
              <text x={20 + i * 250} y={24} fontFamily="JetBrains Mono" fontSize="10" fill="hsl(var(--muted-foreground))" letterSpacing="3">
                {lane.toUpperCase()}
              </text>
              {i > 0 && (
                <line
                  x1={i * 250 - 10}
                  y1={36}
                  x2={i * 250 - 10}
                  y2={VB_H - 20}
                  stroke="hsl(var(--border))"
                  strokeDasharray="3 6"
                  opacity="0.5"
                />
              )}
            </g>
          ))}

          {/* Edges */}
          {visibleEdges.map((e, idx) => {
            const a = nodesById[e.from];
            const b = nodesById[e.to];
            if (!a || !b) return null;
            const x1 = a.x + NODE_W;
            const y1 = a.y + NODE_H / 2;
            const x2 = b.x;
            const y2 = b.y + NODE_H / 2;
            const cx = (x1 + x2) / 2;
            const path = `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`;
            const isActive = neighborSet && (neighborSet.has(e.from) && neighborSet.has(e.to));
            const dim = neighborSet && !isActive;
            const kindColor = TELEMETRY_KINDS[e.kind]?.color || "hsl(var(--muted-foreground))";

            return (
              <g key={`edge-${idx}`} opacity={dim ? 0.12 : 1}>
                <path
                  d={path}
                  fill="none"
                  stroke={isActive ? "hsl(var(--primary))" : kindColor}
                  strokeWidth={isActive ? 2.2 : 1.2}
                  strokeOpacity={isActive ? 1 : 0.55}
                  markerEnd={isActive ? "url(#arrow-active)" : "url(#arrow)"}
                />
                {/* Telemetry pulse */}
                <circle r={isActive ? 3.5 : 2.4} fill={isActive ? "hsl(var(--primary))" : kindColor}>
                  <animateMotion dur={`${3 + (idx % 4) * 0.6}s`} repeatCount="indefinite" path={path} />
                </circle>
              </g>
            );
          })}

          {/* Nodes */}
          {TOPOLOGY_NODES.map((n) => {
            const Icon = ICON_MAP[n.id] || Server;
            const isSelected = selected?.id === n.id;
            const isHovered = hovered === n.id;
            const dim = neighborSet && !neighborSet.has(n.id);
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                opacity={dim ? 0.25 : 1}
                style={{ cursor: "pointer", transition: "opacity 0.15s ease" }}
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(isSelected ? null : n)}
                data-testid={`topology-node-${n.id}`}
              >
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="8"
                  fill="hsl(var(--card))"
                  stroke={isSelected ? "hsl(var(--primary))" : isHovered ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={isSelected ? 2 : 1}
                />
                {isSelected && (
                  <rect width={NODE_W} height={NODE_H} rx="8" fill="hsl(var(--primary))" fillOpacity="0.06" />
                )}
                <foreignObject x="10" y="10" width={NODE_W - 20} height={NODE_H - 20}>
                  <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon size={16} style={{ color: "hsl(var(--primary))" }} />
                    <div style={{ lineHeight: 1.15 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "hsl(var(--foreground))", fontFamily: "Cabinet Grotesk, Satoshi, sans-serif" }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: 9, fontFamily: "JetBrains Mono, monospace", color: "hsl(var(--muted-foreground))", letterSpacing: 1.5, textTransform: "uppercase", marginTop: 2 }}>
                        {n.layer}
                      </div>
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>

        {/* Detail panel overlay */}
        <AnimatePresence>
          {selected && (
            <motion.aside
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="absolute top-3 right-3 w-[320px] rounded-md border border-border bg-card/95 backdrop-blur-md shadow-xl p-4"
              data-testid="topology-detail"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="overline text-primary">{selected.layer}</p>
                  <h4 className="font-heading text-base">{selected.label}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground text-xs"
                  data-testid="topology-detail-close"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{selected.description}</p>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="overline text-muted-foreground mb-1.5">Telemetry kinds</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.telemetry.map((k) => (
                    <span
                      key={k}
                      className="font-mono text-[10px] uppercase tracking-[0.16em] px-1.5 py-0.5 rounded-sm border border-border"
                      style={{ color: TELEMETRY_KINDS[k]?.color }}
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border">
                <p className="overline text-muted-foreground mb-1.5">Connected to</p>
                <div className="flex flex-wrap gap-1">
                  {TOPOLOGY_EDGES.filter((e) => e.from === selected.id || e.to === selected.id).map((e, i) => {
                    const otherId = e.from === selected.id ? e.to : e.from;
                    const other = nodesById[otherId];
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelected(other)}
                        className="font-mono text-[10px] px-1.5 py-0.5 rounded-sm bg-accent/60 hover:bg-accent border border-border"
                      >
                        {other.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
