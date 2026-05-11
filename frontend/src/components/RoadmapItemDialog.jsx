import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ROADMAP_MODULES,
  ROADMAP_STATUSES,
  PRIORITY_LEVELS,
  EFFORT_LEVELS,
  IMPACT_LEVELS,
} from "@/data/roadmapSeed";
import { Trash2 } from "lucide-react";

const empty = {
  title: "",
  description: "",
  owner: "",
  dueDate: "",
  status: "backlog",
  priority: "medium",
  effort: "M",
  impact: "M",
  moduleId: "command-center",
  tags: [],
};

export default function RoadmapItemDialog({
  open,
  onOpenChange,
  initial,
  defaultModuleId,
  onSave,
  onDelete,
}) {
  const [form, setForm] = useState(empty);
  const isEdit = !!initial?.id;

  useEffect(() => {
    if (open) {
      if (initial) setForm({ ...empty, ...initial });
      else setForm({ ...empty, moduleId: defaultModuleId || "command-center" });
    }
  }, [open, initial, defaultModuleId]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const submit = (e) => {
    e?.preventDefault?.();
    if (!form.title.trim()) return;
    onSave({ ...form, tags: typeof form.tags === "string" ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : form.tags });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[92vh] overflow-y-auto" data-testid="roadmap-dialog">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {isEdit ? "Edit roadmap item" : "Add roadmap item"}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the initiative — changes auto-save to local storage." : "Capture a new initiative against this module's roadmap."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <Label className="overline text-muted-foreground">Title</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Stand up chaos engineering cadence"
              className="mt-1.5"
              data-testid="roadmap-input-title"
              required
            />
          </div>

          <div>
            <Label className="overline text-muted-foreground">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Short outcome-oriented description"
              className="mt-1.5 min-h-[80px]"
              data-testid="roadmap-input-description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="overline text-muted-foreground">Owner</Label>
              <Input
                value={form.owner}
                onChange={(e) => update("owner", e.target.value)}
                placeholder="e.g. SRE Lead"
                className="mt-1.5"
                data-testid="roadmap-input-owner"
              />
            </div>
            <div>
              <Label className="overline text-muted-foreground">Due date</Label>
              <Input
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
                className="mt-1.5 font-mono"
                data-testid="roadmap-input-duedate"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <Label className="overline text-muted-foreground">Module</Label>
              <Select value={form.moduleId} onValueChange={(v) => update("moduleId", v)}>
                <SelectTrigger className="mt-1.5" data-testid="roadmap-input-module"><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-[280px]">
                  {ROADMAP_MODULES.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v)}>
                <SelectTrigger className="mt-1.5" data-testid="roadmap-input-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ROADMAP_STATUSES.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Priority</Label>
              <Select value={form.priority} onValueChange={(v) => update("priority", v)}>
                <SelectTrigger className="mt-1.5" data-testid="roadmap-input-priority"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRIORITY_LEVELS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Effort</Label>
              <Select value={form.effort} onValueChange={(v) => update("effort", v)}>
                <SelectTrigger className="mt-1.5" data-testid="roadmap-input-effort"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EFFORT_LEVELS.map((e) => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="overline text-muted-foreground">Impact</Label>
              <Select value={form.impact} onValueChange={(v) => update("impact", v)}>
                <SelectTrigger className="mt-1.5" data-testid="roadmap-input-impact"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {IMPACT_LEVELS.map((i) => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="overline text-muted-foreground">Tags (comma-separated)</Label>
              <Input
                value={Array.isArray(form.tags) ? form.tags.join(", ") : form.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="quick-win, governance, finops"
                className="mt-1.5"
                data-testid="roadmap-input-tags"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {isEdit && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onDelete?.(initial.id);
                  onOpenChange(false);
                }}
                className="mr-auto text-destructive hover:text-destructive"
                data-testid="roadmap-delete-btn"
              >
                <Trash2 className="h-4 w-4 mr-1.5" /> Delete
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} data-testid="roadmap-cancel-btn">Cancel</Button>
            <Button type="submit" data-testid="roadmap-save-btn">{isEdit ? "Save changes" : "Add to roadmap"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
