import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function MaturityRadar({ data, height = 320 }) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="78%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "JetBrains Mono" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
            stroke="hsl(var(--border))"
          />
          <Radar
            name="Benchmark"
            dataKey="benchmark"
            stroke="hsl(var(--muted-foreground))"
            fill="hsl(var(--muted-foreground))"
            fillOpacity={0.08}
            strokeDasharray="4 4"
          />
          <Radar
            name="Your org"
            dataKey="score"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              fontSize: 12,
              borderRadius: 8,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
