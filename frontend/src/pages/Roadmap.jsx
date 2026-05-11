import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import RoadmapItemDialog from "@/components/RoadmapItemDialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/useStore";
import {
  ROADMAP_STATUSES,
  PRIORITY_LEVELS,
  ROADMAP_MODULES,
} from "@/data/roadmapSeed";
import { Plus, Edit3, Calendar, User, RotateCcw, ChevronLeft, ChevronRight, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const priorityTone = (p) => PRIORITY_LEVELS.find((x) => x.id === p)?.tone || "low";

export default function Roadmap() {
  const items = useStore((s) => s.roadmapItems);
  const seed = useStore((s) => s.seedRoadmapIfEmpty);
  const resetRoadmap = useStore((s) => s.resetRoadmap);
  const addItem = useStore((s) => s.addRoadmapItem);
  const updateItem = useStore((s) => s.updateRoadmapItem);
  const removeItem = useStore((s) => s.removeRoadmapItem);
  const moveItem = useStore((s) => s.moveRoadmapItem);

  const [moduleFilter, setModuleFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState("backlog");

  useEffect(() => {
    seed();
  }, [seed]);

  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (moduleFilter !== "all" && it.moduleId !== moduleFilter) return false;
      if (priorityFilter !== "all" && it.priority !== priorityFilter) return false;
      return true;
    });
  }, [items, moduleFilter, priorityFilter]);

  const byStatus = useMemo(() => {
    const buckets = Object.fromEntries(ROADMAP_STATUSES.map((s) => [s.id, []]));
    filtered.forEach((it) => {
      if (buckets[it.status]) buckets[it.status].push(it);
    });
    // Sort each by priority then due date
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    Object.values(buckets).forEach((arr) =>
      arr.sort((a, b) => {
        const p = (order[a.priority] ?? 9) - (order[b.priority] ?? 9);
        if (p !== 0) return p;
        return (a.dueDate || "9999").localeCompare(b.dueDate || "9999");
      })
    );
    return buckets;
  }, [filtered]);

  const stats = useMemo(() => {
    const total = filtered.length;
    const done = filtered.filter((i) => i.status === "done").length;
    const inProgress = filtered.filter((i) => i.status === "in_progress").length;
    const critical = filtered.filter((i) => i.priority === "critical").length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, inProgress, critical, pct };
  }, [filtered]);

  const openNew = (status) => {
    setEditing(null);
    setDefaultStatus(status || "backlog");
    setDialogOpen(true);
  };
  const openEdit = (it) => {
    setEditing(it);
    setDialogOpen(true);
  };
  const handleSave = (data) => {
    if (editing) updateItem(editing.id, data);
    else addItem({ ...data, status: data.status || defaultStatus });
  };

  const handleReset = () => {
    if (confirm("Reset roadmap to the seed initiatives? Custom items will be lost.")) {
      resetRoadmap();
      toast.success("Roadmap reset to defaults");
    }
  };

  return (
    <div data-testid="page-roadmap">
      <PageHeader
        overline="Transformation Roadmap"
        title="Every initiative. Every owner. One board."
        subtitle="The editable Kanban backbone of the program — filter by module or priority, drag through stages, and keep the entire transformation in one operating view."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={handleReset} data-testid="roadmap-reset-btn">
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset to seed
            </Button>
            <Button size="sm" onClick={() => openNew("backlog")} data-testid="roadmap-add-btn">
              <Plus className="h-3.5 w-3.5 mr-1.5" /> New initiative
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <KPICard testId="kpi-roadmap-total" label="Total" value={stats.total} segment="In current filter" trend="—" direction="up" emphasized />
        <KPICard testId="kpi-roadmap-progress" label="In Progress" value={stats.inProgress} segment="Active work" trend="+3" direction="up" />
        <KPICard testId="kpi-roadmap-done" label="Done" value={stats.done} segment={`${stats.pct}% complete`} trend={`${stats.pct}%`} direction="up" />
        <KPICard testId="kpi-roadmap-critical" label="Critical" value={stats.critical} segment="Priority = critical" trend="watch" direction="down" />
        <KPICard testId="kpi-roadmap-modules" label="Modules covered" value={new Set(filtered.map((i) => i.moduleId)).size} segment={`${ROADMAP_MODULES.length} total`} trend="—" direction="up" />
      </div>

      {/* Filters */}
      <SectionCard title="Filters" description="Slice the board" testId="card-roadmap-filters" className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <p className="overline text-muted-foreground mb-1.5">Module</p>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger data-testid="roadmap-filter-module"><SelectValue /></SelectTrigger>
              <SelectContent className="max-h-[300px]">
                <SelectItem value="all">All modules</SelectItem>
                {ROADMAP_MODULES.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="overline text-muted-foreground mb-1.5">Priority</p>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger data-testid="roadmap-filter-priority"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All priorities</SelectItem>
                {PRIORITY_LEVELS.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-end text-xs text-muted-foreground">
            Showing <span className="mx-1 font-mono text-foreground">{filtered.length}</span> of <span className="ml-1 font-mono text-foreground">{items.length}</span>
          </div>
        </div>
      </SectionCard>

      {/* Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {ROADMAP_STATUSES.map((status) => {
          const bucket = byStatus[status.id] || [];
          return (
            <div
              key={status.id}
              className="rounded-lg border border-border bg-card flex flex-col min-h-[340px]"
              data-testid={`kanban-column-${status.id}`}
            >
              <header className="px-3 pt-3 pb-2 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">{bucket.length}</span>
                </div>
                <button
                  type="button"
                  onClick={() => openNew(status.id)}
                  className="text-muted-foreground hover:text-foreground"
                  data-testid={`kanban-add-${status.id}`}
                  title="Add to this column"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </header>

              <div className="p-2 space-y-2 flex-1">
                <AnimatePresence initial={false}>
                  {bucket.map((it) => (
                    <motion.button
                      key={it.id}
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.18 }}
                      onClick={() => openEdit(it)}
                      className="w-full text-left rounded-md border border-border bg-background/40 hover:border-primary/40 hover:bg-accent/30 px-3 py-2.5 group"
                      data-testid={`kanban-card-${it.id}`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={cn(
                          "shrink-0 mt-1.5 h-1.5 w-1.5 rounded-full",
                          it.priority === "critical" && "bg-destructive",
                          it.priority === "high" && "bg-warning",
                          it.priority === "medium" && "bg-primary",
                          it.priority === "low" && "bg-muted-foreground"
                        )} />
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium leading-tight", it.status === "done" && "line-through text-muted-foreground")}>
                            {it.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                            <span className="px-1.5 py-0.5 rounded-sm bg-accent/60">
                              {ROADMAP_MODULES.find((m) => m.id === it.moduleId)?.label.split(" ")[0]}
                            </span>
                            <span>{it.effort}/{it.impact}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                            {it.owner && <span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {it.owner}</span>}
                            {it.dueDate && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {it.dueDate}</span>}
                          </div>
                        </div>
                        <Edit3 className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                      </div>

                      {/* Move controls */}
                      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="overline text-muted-foreground mr-auto">Move</span>
                        {ROADMAP_STATUSES.map((s, idx) => {
                          if (s.id === it.status) return null;
                          return (
                            <span
                              key={s.id}
                              role="button"
                              tabIndex={0}
                              onClick={(e) => { e.stopPropagation(); moveItem(it.id, s.id); }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") { e.stopPropagation(); moveItem(it.id, s.id); }
                              }}
                              className="text-[10px] font-mono uppercase tracking-[0.16em] px-1.5 py-0.5 rounded-sm hover:bg-accent border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                              data-testid={`kanban-move-${it.id}-${s.id}`}
                            >
                              {s.label}
                            </span>
                          );
                        })}
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>

                {bucket.length === 0 && (
                  <div className="text-center py-8 text-xs text-muted-foreground border border-dashed border-border rounded-md">
                    Empty — drop something here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Module heatmap summary */}
      <SectionCard
        title="Module Coverage"
        description="Initiatives per module"
        action={<Map className="h-4 w-4 text-primary" />}
        testId="card-module-coverage"
        className="mt-6"
      >
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {ROADMAP_MODULES.map((m) => {
            const moduleItems = items.filter((i) => i.moduleId === m.id);
            const done = moduleItems.filter((i) => i.status === "done").length;
            const inP = moduleItems.filter((i) => i.status === "in_progress").length;
            const pct = moduleItems.length === 0 ? 0 : Math.round((done / moduleItems.length) * 100);
            return (
              <li key={m.id} className="rounded-md border border-border bg-background/40 p-3" data-testid={`coverage-${m.id}`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{m.label}</p>
                  <span className="font-mono text-xs text-muted-foreground tabular-nums">{moduleItems.length}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums w-10 text-right">{pct}%</span>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground mt-1">
                  {inP} in progress · {done} done
                </p>
              </li>
            );
          })}
        </ul>
      </SectionCard>

      <RoadmapItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        defaultModuleId={moduleFilter !== "all" ? moduleFilter : "command-center"}
        onSave={handleSave}
        onDelete={removeItem}
      />
    </div>
  );
}
