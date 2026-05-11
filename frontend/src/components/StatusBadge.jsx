import { cn } from "@/lib/utils";

const TONE_MAP = {
  ok: "bg-success/15 text-success border-success/30",
  warn: "bg-warning/15 text-warning border-warning/40",
  danger: "bg-destructive/15 text-destructive border-destructive/40",
  critical: "bg-destructive/20 text-destructive border-destructive/50",
  high: "bg-warning/15 text-warning border-warning/40",
  medium: "bg-info/15 text-info border-info/40",
  low: "bg-muted text-muted-foreground border-border",
  info: "bg-primary/10 text-primary border-primary/30",
  na: "bg-muted text-muted-foreground border-border",
};

export default function StatusBadge({ tone = "ok", children, dot = true, className, testId }) {
  return (
    <span
      data-testid={testId || `status-${tone}`}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border font-mono text-[10px] uppercase tracking-[0.16em]",
        TONE_MAP[tone] || TONE_MAP.ok,
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full bg-current opacity-80")} />}
      {children}
    </span>
  );
}
