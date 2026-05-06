"use client";
import { useState } from "react";
import { Icon } from "./icons";

type IconKey = keyof typeof Icon;
type Service = {
  key: string; icon: IconKey; name: string; sub?: string; desc: string;
  price: string; per: string; bullets: string[];
  feature?: boolean; large?: boolean; wide?: boolean; withAccent?: boolean;
};

const SERVICES: Service[] = [
  { key: "seo", icon: "search", name: "Targeted SEO", sub: "Local & national", desc: "Rank where your buyers actually search — built around the keywords that turn into calls, not just clicks.", price: "$1,500", per: "/month", bullets: ["Keyword & competitor mapping","On-page + technical fixes","Local citation cleanup","Monthly content sprints"], feature: true, withAccent: true },
  { key: "gbp", icon: "pin", name: "Google Business Profile", sub: "Management", desc: "Photos, posts, Q&A, review responses — the local presence that wins the map pack.", price: "$750", per: "/month", bullets: ["Weekly posts & photo refresh","Review reply playbook","Q&A & service area tuning","Insights reporting"] },
  { key: "ads", icon: "ads", name: "Google Ads", sub: "Paid management", desc: "Tightly-scoped campaigns built around buyer intent. We hunt for $20 leads, not $200 ones.", price: "$1,000", per: "/month", bullets: ["Search + Performance Max","Negative keyword grooming","Conversion + call tracking","Weekly budget shaping"], large: true },
  { key: "heat", icon: "heat", name: "Heat Map Tracking", desc: "See exactly where visitors click, scroll, and bounce. Turn the dead zones into conversions.", price: "Included", per: "with retainer", bullets: ["Click + scroll heatmaps","Session recordings","CRO recommendations"] },
  { key: "lead", icon: "lead", name: "Lead Tracking", desc: "Every call, form, and chat — attributed to the channel that sent it. No more guessing what worked.", price: "Included", per: "with retainer", bullets: ["Call recording + scoring","Form + chat capture","CRM-ready exports"] },
  { key: "report", icon: "report", name: "Monthly Reporting", desc: "One page. Real numbers. What we did, what moved, what's next. No filler dashboards.", price: "Included", per: "with retainer", wide: true, bullets: ["Channel-by-channel breakdown","Wins, losses, next bets","30-min review call"] },
];

export default function Services() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Services</span>
          <h2 className="section-title">Pick what helps. Skip what doesn&rsquo;t.</h2>
          <p className="section-sub">Mix-and-match services priced for owner-operators, not enterprise.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => {
            const cls = ["svc-card"];
            if (s.feature) cls.push("feature");
            if (s.large) cls.push("large");
            if (s.wide) cls.push("wide");
            if (s.withAccent) cls.push("with-accent");
            if (openKey === s.key) cls.push("is-open");
            const IconC = Icon[s.icon];
            return (
              <div key={s.key} className={cls.join(" ")} onClick={() => setOpenKey(openKey === s.key ? null : s.key)}>
                {s.feature && <div className="svc-glow" />}
                {s.wide ? (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: "62%" }}>
                      <div className="svc-icon"><IconC /></div>
                      <h3 className="svc-name">{s.name}</h3>
                      <p className="svc-desc">{s.desc}</p>
                      <div className="svc-detail"><div><ul>{s.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul></div></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="svc-price">{s.price}<span className="per"> {s.per}</span></div>
                      <div className="svc-cta-mini" style={{ marginTop: 14, justifyContent: "flex-end" }}>Learn more <Icon.arrow /></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="svc-icon"><IconC /></div>
                    <h3 className="svc-name">{s.name}</h3>
                    {s.sub && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: s.feature ? "rgba(255,255,255,0.55)" : "var(--muted-2)", marginTop: -8 }}>{s.sub}</div>}
                    <p className="svc-desc">{s.desc}</p>
                    <div className="svc-detail"><div><ul>{s.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul></div></div>
                    <div className="svc-foot">
                      <div className="svc-price">{s.price}<span className="per"> {s.per}</span></div>
                      <div className="svc-cta-mini">Details <Icon.arrow /></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
