import { fmtMoney } from "../lib/format";

export function Sparkline({ data, w = 80, h = 28, color }: { data: number[]; w?: number; h?: number; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * (w - 2) + 1;
      const y = h - 1 - ((v - min) / range) * (h - 2);
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color || "var(--dash-purple)"} strokeWidth="1.5" />
    </svg>
  );
}

export function RevenueChart({ data, height = 220 }: { data: { month: string; revenue: number }[]; height?: number }) {
  const w = 560;
  const h = height;
  const pad = { l: 40, r: 12, t: 18, b: 24 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const max = Math.ceil(Math.max(...data.map((d) => d.revenue)) / 5000) * 5000;
  const barW = innerW / data.length;
  const yTicks = [0, max * 0.25, max * 0.5, max * 0.75, max];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto", display: "block" }}>
      {yTicks.map((t, i) => {
        const y = pad.t + innerH - (t / max) * innerH;
        return (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} className="dash-chart-grid" />
            <text x={pad.l - 6} y={y + 3} textAnchor="end" className="dash-chart-axis">
              ${(t / 1000) | 0}k
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const bx = pad.l + i * barW + barW * 0.18;
        const bw = barW * 0.64;
        const bh = (d.revenue / max) * innerH;
        const by = pad.t + innerH - bh;
        const projected = i === data.length - 1;
        return (
          <g key={i}>
            <rect x={bx} y={by} width={bw} height={bh} rx="4" className={projected ? "dash-chart-bar-lite" : "dash-chart-bar"} />
            {projected && (
              <rect x={bx} y={by} width={bw} height={bh} rx="4" fill="none" stroke="var(--dash-purple)" strokeWidth="1" strokeDasharray="3 3" />
            )}
            <text x={bx + bw / 2} y={h - 8} textAnchor="middle" className="dash-chart-axis">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Donut({ data, size = 160, thickness = 24 }: { data: { name: string; value: number; color: string }[]; size?: number; thickness?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = size / 2 - thickness / 2;
  const cx = size / 2;
  const cy = size / 2;
  let acc = 0;
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--dash-border)" strokeWidth={thickness} />
      {data.map((d, i) => {
        const frac = d.value / total;
        const dash = 2 * Math.PI * r;
        const len = dash * frac;
        const offset = dash * (acc / total);
        acc += d.value;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={d.color}
            strokeWidth={thickness}
            strokeDasharray={`${len} ${dash - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" style={{ fontSize: 22, fontWeight: 700, fill: "var(--dash-text)", fontFamily: "var(--font-display-grotesk)" }}>
        {fmtMoney(total / 1000)}k
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontSize: 11, fill: "var(--dash-text-muted)", fontFamily: "var(--font-body)" }}>
        MRR
      </text>
    </svg>
  );
}
