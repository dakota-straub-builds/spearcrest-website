import type { SVGProps } from "react";

const VARIANTS = [
  { suit: "#ffffff", visor: "#3a4a7a", visorDeep: "#0a0a23", chest: "#c4a3ff", light: "#5be0ff" },
  { suit: "#f0f4ff", visor: "#5b3a9a", visorDeep: "#1a0e3d", chest: "#d4ff3a", light: "#ff6b9d" },
  { suit: "#ffffff", visor: "#1e4a8a", visorDeep: "#0a1a3d", chest: "#5eead4", light: "#fbbf24" },
  { suit: "#fafaf7", visor: "#7a3aa9", visorDeep: "#2a0e4d", chest: "#fbbf24", light: "#c4a3ff" },
  { suit: "#ffffff", visor: "#2a6a8a", visorDeep: "#0a2a3d", chest: "#7a4dff", light: "#d4ff3a" },
  { suit: "#f5f5ff", visor: "#4a2a8a", visorDeep: "#1a0a3d", chest: "#ff6b9d", light: "#5eead4" },
];

export function HelmetAvatar({ variant = 0, size = 92, ...rest }: { variant?: number; size?: number } & SVGProps<SVGSVGElement>) {
  const v = VARIANTS[variant % VARIANTS.length];
  const id = `visor-${variant}`;
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="team-helmet" {...rest}>
      {/* shoulder/suit collar */}
      <path d="M14 110 Q 14 88 36 84 L 84 84 Q 106 88 106 110 Z" fill={v.suit} />
      <rect x="48" y="86" width="24" height="6" rx="2" fill="#2a2d44" />
      <circle cx="54" cy="89" r="1.5" fill={v.chest} />
      <circle cx="60" cy="89" r="1.5" fill={v.light} />
      <circle cx="66" cy="89" r="1.5" fill={v.chest} opacity="0.6" />
      {/* helmet ring base */}
      <ellipse cx="60" cy="80" rx="34" ry="6" fill="#d8dce4" />
      {/* helmet sphere */}
      <circle cx="60" cy="50" r="38" fill="#2a2d44" />
      <circle cx="60" cy="50" r="36" fill={`url(#${id})`} />
      {/* visor reflections */}
      <ellipse cx="50" cy="40" rx="12" ry="9" fill="white" opacity="0.45" />
      <ellipse cx="68" cy="58" rx="4" ry="3" fill="white" opacity="0.6" />
      {/* helmet outer ring */}
      <circle cx="60" cy="50" r="38" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* antenna */}
      <line x1="60" y1="12" x2="60" y2="6" stroke="#d8dce4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="60" cy="5" r="2" fill={v.chest} />
      <defs>
        <radialGradient id={id} cx="0.4" cy="0.3" r="0.85">
          <stop offset="0%" stopColor={v.visor} stopOpacity="0.9" />
          <stop offset="55%" stopColor={v.visorDeep} />
          <stop offset="100%" stopColor="#0a0a23" />
        </radialGradient>
      </defs>
    </svg>
  );
}
