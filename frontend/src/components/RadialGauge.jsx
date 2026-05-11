import { useEffect, useState } from "react";

/**
 * SVG radial gauge — 220° arc with monospace value.
 */
export default function RadialGauge({
  value = 0,
  max = 100,
  label,
  suffix = "",
  size = 180,
  thickness = 12,
  tone = "primary",
  testId,
}) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / 800);
      setDisplay(Math.round(value * t));
      if (t < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;
  const start = -210; // degrees
  const end = 30; // degrees
  const sweep = end - start; // 240

  const ratio = Math.max(0, Math.min(1, value / max));
  const valueEnd = start + sweep * ratio;

  const polar = (deg) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  const describeArc = (s, e) => {
    const [sx, sy] = polar(s);
    const [ex, ey] = polar(e);
    const large = e - s > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
  };

  const toneVar = `hsl(var(--${tone}))`;

  return (
    <div className="flex flex-col items-center" data-testid={testId}>
      <svg width={size} height={size * 0.85} viewBox={`0 0 ${size} ${size * 0.85}`} className="overflow-visible">
        <path
          d={describeArc(start, end)}
          stroke="hsl(var(--border))"
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d={describeArc(start, valueEnd)}
          stroke={toneVar}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="font-mono"
          style={{ fontSize: size * 0.22, fill: "hsl(var(--foreground))", fontVariantNumeric: "tabular-nums" }}
        >
          {display}
        </text>
        <text
          x={cx}
          y={cy + size * 0.18}
          textAnchor="middle"
          style={{ fontSize: size * 0.075, fill: "hsl(var(--muted-foreground))" }}
        >
          {suffix}
        </text>
      </svg>
      {label && (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-2">{label}</p>
      )}
    </div>
  );
}
