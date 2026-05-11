import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function PageHeader({
  overline,
  title,
  subtitle,
  actions,
  align = "left",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 lg:mb-8",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="space-y-2 max-w-3xl">
        {overline && <p className="overline text-primary" data-testid="page-overline">{overline}</p>}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]"
          data-testid="page-title"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}
