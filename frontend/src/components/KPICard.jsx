import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Premium KPI card with monospace value, trend, and overline label.
 */
export default function KPICard({
  label,
  value,
  suffix,
  trend,
  direction = "up",
  segment,
  icon: Icon,
  emphasized = false,
  testId,
}) {
  const trendPositive = direction === "up";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      data-testid={testId || "kpi-card"}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card p-5 group",
        emphasized && "ring-1 ring-primary/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="overline text-muted-foreground">{label}</p>
        {Icon && (
          <span className="h-7 w-7 rounded-md bg-accent/60 flex items-center justify-center">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </span>
        )}
      </div>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-mono text-4xl font-medium tabular-nums tracking-tight">{value}</span>
        {suffix && (
          <span className="font-mono text-base text-muted-foreground">{suffix}</span>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{segment}</span>
        {trend && (
          <span
            className={cn(
              "font-mono px-1.5 py-0.5 rounded-sm",
              trendPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
            )}
          >
            {trend}
          </span>
        )}
      </div>
      {emphasized && (
        <div className="absolute -bottom-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      )}
    </motion.div>
  );
}
