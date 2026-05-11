import { cn } from "@/lib/utils";

export default function SectionCard({
  title,
  description,
  action,
  children,
  className,
  padded = true,
  testId,
}) {
  return (
    <section
      data-testid={testId}
      className={cn(
        "rounded-lg border border-border bg-card",
        className
      )}
    >
      {(title || action) && (
        <header className={cn("flex items-start justify-between gap-3 border-b border-border", padded ? "px-5 py-4" : "px-4 py-3")}>
          <div>
            {title && <h3 className="font-heading text-base sm:text-lg tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cn(padded ? "p-5" : "p-3")}>{children}</div>
    </section>
  );
}
