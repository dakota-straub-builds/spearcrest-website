import type { SVGProps } from "react";

export function Astronaut({ className, variant }: { className?: string; variant?: "a" | "b" | "c" }) {
  const accent = variant === "b" ? "var(--accent)" : variant === "c" ? "var(--purple-2)" : "var(--accent)";
  return (
    <svg className={className} viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 60 70 Q 100 90 130 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 3" fill="none" />
      <rect x="32" y="58" width="56" height="44" rx="10" fill="#d8dce4" />
      <rect x="38" y="64" width="14" height="10" rx="2" fill={accent} opacity="0.9" />
      <circle cx="74" cy="70" r="3" fill="#ff5b5b" />
      <circle cx="82" cy="70" r="3" fill="#5be0ff" />
      <path d="M28 72 Q 16 78 18 96 L 28 100 Q 32 88 40 84 Z" fill="white" />
      <circle cx="22" cy="98" r="6" fill="#e8ecf2" />
      <path d="M92 72 Q 104 78 102 96 L 92 100 Q 88 88 80 84 Z" fill="white" />
      <circle cx="98" cy="98" r="6" fill="#e8ecf2" />
      <rect x="42" y="98" width="14" height="28" rx="6" fill="white" />
      <rect x="64" y="98" width="14" height="28" rx="6" fill="white" />
      <rect x="40" y="120" width="18" height="10" rx="3" fill="#d8dce4" />
      <rect x="62" y="120" width="18" height="10" rx="3" fill="#d8dce4" />
      <path d="M36 60 Q 36 50 48 48 L 72 48 Q 84 50 84 60 L 84 76 Q 84 84 76 86 L 44 86 Q 36 84 36 76 Z" fill="white" />
      <rect x="50" y="60" width="20" height="14" rx="3" fill="#1a1a3a" />
      <circle cx="56" cy="67" r="2" fill={accent} />
      <circle cx="64" cy="67" r="2" fill="#5be0ff" />
      <circle cx="60" cy="34" r="22" fill="#2a2d44" />
      <circle cx="60" cy="34" r="20" fill="url(#visor)" />
      <ellipse className="helmet-glow" cx="54" cy="28" rx="8" ry="6" fill="white" opacity="0.5" />
      <ellipse cx="66" cy="40" rx="3" ry="2" fill="white" opacity="0.7" />
      <circle cx="60" cy="34" r="22" stroke="white" strokeWidth="1.5" fill="none" />
      <defs>
        <radialGradient id="visor" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#3a4a7a" />
          <stop offset="60%" stopColor="#1a1a3a" />
          <stop offset="100%" stopColor="#0a0a23" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Satellite() {
  return (
    <svg className="satellite" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="22" width="28" height="16" rx="2" fill="#1a2e6a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <line x1="9" y1="22" x2="9" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <line x1="16" y1="22" x2="16" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <line x1="23" y1="22" x2="23" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="70" y="22" width="28" height="16" rx="2" fill="#1a2e6a" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      <line x1="77" y1="22" x2="77" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <line x1="84" y1="22" x2="84" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <line x1="91" y1="22" x2="91" y2="38" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      <rect x="36" y="18" width="28" height="24" rx="3" fill="#e8ecf2" />
      <rect x="40" y="22" width="20" height="4" rx="1" fill="var(--accent)" />
      <circle cx="50" cy="34" r="3" fill="#1a1a3a" />
      <ellipse cx="50" cy="12" rx="10" ry="4" fill="#d8dce4" />
      <line x1="50" y1="14" x2="50" y2="18" stroke="#d8dce4" strokeWidth="2" />
    </svg>
  );
}
