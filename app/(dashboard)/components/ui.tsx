import type { ReactNode } from "react";

type AvatarSubject = { initials?: string; logo?: string; name?: string; color?: string; logoColor?: string };

export function Avatar({
  user,
  size,
  square,
  color,
}: {
  user?: AvatarSubject | null;
  size?: "lg" | "xl";
  square?: boolean;
  color?: string;
}) {
  if (!user) return null;
  const cls = ["dash-avatar", size === "lg" && "dash-avatar-lg", size === "xl" && "dash-avatar-xl", square && "dash-avatar-sq"]
    .filter(Boolean)
    .join(" ");
  return (
    <span className={cls} style={{ background: color || user.color || user.logoColor || "var(--dash-navy)" }}>
      {user.initials || user.logo || (user.name || "").slice(0, 1)}
    </span>
  );
}

export function HealthPill({ status, health }: { status?: string; health?: string }) {
  if (status === "Onboarding") return <span className="dash-pill dash-pill-info"><span className="dash-pill-dot" />Onboarding</span>;
  if (status === "Paused") return <span className="dash-pill dash-pill-warn"><span className="dash-pill-dot" />Paused</span>;
  if (status === "Churned") return <span className="dash-pill dash-pill-risk"><span className="dash-pill-dot" />Churned</span>;
  if (health === "at-risk") return <span className="dash-pill dash-pill-risk"><span className="dash-pill-dot" />At risk</span>;
  if (health === "watch") return <span className="dash-pill dash-pill-warn"><span className="dash-pill-dot" />Watch</span>;
  return <span className="dash-pill dash-pill-success"><span className="dash-pill-dot" />Healthy</span>;
}

export function ServiceTags({ services }: { services: string[] }) {
  return (
    <div className="dash-svc-tags">
      {services.map((s) => (
        <span key={s} className="dash-svc-tag">{s}</span>
      ))}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  deltaDir,
  sub,
}: {
  label: string;
  value: ReactNode;
  delta?: string;
  deltaDir?: "up" | "down" | "flat";
  sub?: ReactNode;
}) {
  return (
    <div className="dash-card dash-stat">
      <div className="dash-card-pad">
        <div className="dash-label">{label}</div>
        <div className="dash-val dash-tnum">{value}</div>
        {delta && (
          <div className={`dash-delta ${deltaDir || "flat"}`}>
            {deltaDir === "up" && <span>↑</span>}
            {deltaDir === "down" && <span>↓</span>}
            {delta}
          </div>
        )}
        {sub && <div className="dash-delta flat">{sub}</div>}
      </div>
    </div>
  );
}
