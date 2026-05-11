import { cn } from "@/lib/utils";

/**
 * Simple SVG-free grid heatmap rendered with Tailwind.
 * data: 2D array, first column = label, rest = numeric (lower or higher is better depending on tone)
 */
export default function Heatmap({ data, columns = [], inverse = false, max = 5, title }) {
  const colorFor = (val) => {
    const ratio = Math.min(1, Math.abs(val) / max);
    if (inverse) {
      // higher = good
      if (ratio < 0.34) return "bg-destructive/40";
      if (ratio < 0.67) return "bg-warning/40";
      return "bg-success/40";
    }
    // higher = bad
    if (ratio < 0.34) return "bg-success/35";
    if (ratio < 0.67) return "bg-warning/40";
    return "bg-destructive/45";
  };

  return (
    <div className="overflow-x-auto scrollbar-thin">
      {title && <p className="overline text-muted-foreground mb-3">{title}</p>}
      <table className="text-xs">
        <thead>
          <tr>
            <th className="pr-3 pb-2 text-left text-muted-foreground font-mono uppercase tracking-[0.14em] text-[10px]"></th>
            {columns.map((c) => (
              <th key={c} className="px-1.5 pb-2 text-muted-foreground font-mono uppercase tracking-[0.14em] text-[10px]">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="pr-3 py-1 text-sm">{row[0]}</td>
              {row.slice(1).map((val, j) => (
                <td key={j} className="px-1.5 py-1">
                  <div
                    className={cn(
                      "h-7 w-10 rounded-sm flex items-center justify-center font-mono text-[10px] text-foreground/80 border border-border",
                      colorFor(val)
                    )}
                    title={`${row[0]} · ${columns[j]} · ${val}`}
                  >
                    {val}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
