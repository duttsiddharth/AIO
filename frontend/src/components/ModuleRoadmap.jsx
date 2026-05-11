import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Calendar, User, Tag, GitBranch, ChevronRight } from "lucide-react";
import SectionCard from "@/components/SectionCard";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import RoadmapItemDialog from "@/components/RoadmapItemDialog";
import { useStore } from "@/store/useStore";
import {
  ROADMAP_STATUSES,
  PRIORITY_LEVELS,
  ROADMAP_MODULES,
} from "@/data/roadmapSeed";
import { cn } from "@/lib/utils";

const statusTone = (s) => ROADMAP_STATUSES.find((x) => x.id === s)?.tone || "low";
const priorityTone = (p) => PRIORITY_LEVELS.find((x) => x.id === p)?.tone || "low";

export default function ModuleRoadmap({ moduleId }) {
  const items = useStore((s) => s.roadmapItems);
  const seed = useStore((s) => s.seedRoadmapIfEmpty);
  const addItem = useStore((s) => s.addRoadmapItem);
  const updateItem = useStore((s) => s.updateRoadmapItem);
  const removeItem = useStore((s) => s.removeRoadmapItem);
  const moveItem = useStore((s) => s.moveRoadmapItem);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    seed();
  }, [seed]);

  const moduleItems = useMemo(
    () =>
      items
        .filter((it) => it.moduleId === moduleId)
        .sort((a, b) => {
          const order = { critical: 0, high: 1, medium: 2, low: 3 };
          return (order[a.priority] ?? 9) - (order[b.priority] ?? 9);
        }),
    [items, moduleId]
  );

  const stats = useMemo(() => {
    const total = moduleItems.length;
    const done = moduleItems.filter((it) => it.status === "done").length;
    const inProgress = moduleItems.filter((it) => it.status === "in_progress").length;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, inProgress, pct };
  }, [moduleItems]);

  const moduleLabel = ROADMAP_MODULES.find((m) => m.id === moduleId)?.label || moduleId;

  const cycleStatus = (it) => {
    const order = ["backlog", "planned", "in_progress", "done"];
    const next = order[(order.indexOf(it.status) + 1) % order.length];
    moveItem(it.id, next);
  };

  const openNew = () => {
    setEditing(null);
    setDialogOpen(true);
  };
  const openEdit = (it) => {
    setEditing(it);
    setDialogOpen(true);
  };
  const handleSave = (data) => {
    if (editing) updateItem(editing.id, data);
    else addItem(data);
  };

  return (
    <SectionCard
      title={`Module Roadmap · ${moduleLabel}`}
      description={`${stats.total} initiatives · ${stats.inProgress} in progress · ${stats.pct}% complete`}
      action={
        <div className="flex items-center gap-2">
          <a href="#/roadmap" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1" data-testid={`module-roadmap-open-board-${moduleId}`}>
            Open board <ChevronRight className="h-3 w-3" />
          </a>
          <Button size="sm" onClick={openNew} data-testid={`module-roadmap-add-${moduleId}`}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add
          </Button>
        </div>
      }
      testId={`module-roadmap-${moduleId}`}
      className="mt-6"
    >
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1.5">
          <span>Completion</span>
          <span>{stats.done} / {stats.total} done</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-success rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${stats.pct}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {moduleItems.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-md" data-testid={`module-roadmap-empty-${moduleId}`}>
          <p className="text-sm text-muted-foreground mb-3">No roadmap items yet for this module.</p>
          <Button size="sm" onClick={openNew}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add the first one
          </Button>
        </div>
      ) : (
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {moduleItems.map((it) => (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="group rounded-md border border-border bg-background/30 hover:bg-accent/40 px-3 py-2.5"
                data-testid={`roadmap-item-${it.id}`}
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => cycleStatus(it)}
                    title="Click to cycle status"
                    className="shrink-0 mt-0.5"
                    data-testid={`roadmap-item-status-${it.id}`}
                  >
                    <StatusBadge tone={statusTone(it.status)}>
                      {ROADMAP_STATUSES.find((s) => s.id === it.status)?.label || it.status}
                    </StatusBadge>
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={cn("text-sm font-medium leading-tight", it.status === "done" && "line-through text-muted-foreground")}>
                        {it.title}
                      </p>
                      <StatusBadge tone={priorityTone(it.priority)}>
                        {it.priority}
                      </StatusBadge>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {it.effort} effort · {it.impact} impact
                      </span>
                    </div>
                    {it.description && (
                      <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{it.description}</p>
                    )}
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground flex-wrap">
                      {it.owner && (
                        <span className="inline-flex items-center gap-1"><User className="h-3 w-3" /> {it.owner}</span>
                      )}
                      {it.dueDate && (
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {it.dueDate}</span>
                      )}
                      {Array.isArray(it.tags) && it.tags.length > 0 && (
                        <span className="inline-flex items-center gap-1"><Tag className="h-3 w-3" />
                          {it.tags.slice(0, 3).join(" · ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openEdit(it)}
                    className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
                    data-testid={`roadmap-item-edit-${it.id}`}
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      <RoadmapItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initial={editing}
        defaultModuleId={moduleId}
        onSave={handleSave}
        onDelete={removeItem}
      />
    </SectionCard>
  );
}
