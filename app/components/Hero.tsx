import { Icon } from "./icons";
import { Astronaut, Satellite } from "./SpaceArt";

const HERO = {
  eyebrow: "Louisville, KY",
  sub: "We're a small team that runs SEO, Google Ads, and Manages your Google Business Profile like it's our own shop — because for our partners, it kind of is.",
  primary: "Grab a free audit",
  secondary: "Meet the team",
};

export default function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-bg" aria-hidden="true">
        <div className="space-stars" />
        <div className="space-stars b" />
        <div className="shooting-star s1" />
        <div className="shooting-star s2" />
        <div className="hero-rings" />
        <div className="hero-orb" />
        <div className="hero-orb b" />
        <img src="/astronaut-flag.png" alt="" className="astronaut-img a1" />
        <img src="/astronaut-flag.png" alt="" className="astronaut-img a3" />
        <Satellite />
        <div className="planet">
          <div className="planet-ring" />
          <div className="planet-ring inner" />
        </div>
        <div className="hero-noise" />
      </div>
      <div className="container">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">{HERO.eyebrow}</span>
            <h1 className="hero-h1">
              <span className="accent-dot" />
              <em>Marketing that actually</em> <strong></strong>.
              <br />
              <span style={{ opacity: 0.55 }}>shows up for your <strong><em>business</em></strong>.</span>
            </h1>
            <p className="hero-sub">{HERO.sub}</p>
            <div className="hero-cta">
              <a href="#audit" className="btn btn-primary">
                {HERO.primary}
                <span className="arrow"><Icon.arrowUR /></span>
              </a>
              <a href="#team" className="btn btn-on-dark-ghost">{HERO.secondary}</a>
            </div>
            <div className="hero-meta">
              <div className="hero-meta-item">
                <span className="dot-live" />
                <span><b>Now Accepting</b> New Clients</span>
              </div>
              <div className="hero-meta-item">
                <span>★★★★★</span>
                <span><b>We Only Work With 1 Client Per Service Area</b> </span>
              </div>
            </div>
          </div>
          <div className="hero-stage">
            <div className="hero-pulse">
              <div className="hero-ring r3"><span className="hero-ring-dot" /></div>
              <div className="hero-ring r2"><span className="hero-ring-dot" /></div>
              <div className="hero-ring r1"><span className="hero-ring-dot" /></div>
              <div className="hero-pulse-core" />
            </div>
            <div className="float-card fc-1">
              <div className="fc-label">Calls / wk</div>
              <div className="fc-value">+187%</div>
              <div className="fc-spark">
                {[12,18,16,24,30,28,42,52,48,64,72,86].map((h,i)=>(<span key={i} style={{height: h+"%"}} />))}
              </div>
            </div>
            <div className="float-card fc-2">
              <div className="fc-label">Local pack rank</div>
              <div className="fc-value">#1 <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>↑6</span></div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                {['"dumpster rental louisville"','"dumpster rental near me"'].map((q,i)=>(
                  <span key={i} style={{ fontSize: 10, padding: "4px 8px", borderRadius: 6, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)" }}>{q}</span>
                ))}
              </div>
            </div>
            <div className="float-card fc-3">
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div className="fc-label">Cost / lead</div>
                  <div className="fc-value">$24<span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>.40</span></div>
                  <div className="fc-trend">↓ 38% vs. last 90d</div>
                </div>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: "conic-gradient(var(--accent) 0% 72%, rgba(255,255,255,0.1) 72% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(20,20,58,0.9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: "var(--font-mono)" }}>72%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="trusted">
          <div className="trusted-label">Trusted by service businesses across the World</div>
          <div className="ticker">
            <div className="ticker-track">
              {[...Array(2)].map((_, i) => (
                <div className="ticker-set" key={i} aria-hidden={i === 1}>
                  <img src="/logos/sadoski-dumpster.png" alt="Sadoski Dumpster" />
                  <img src="/logos/helping-cans.png" alt="Helping Cans" />
                  <img src="/logos/dumpster-417.png" alt="Dumpster 417" />
                  <img src="/logos/loz-dumpster-drop.png" alt="LOZ Dumpster Drop" />
                  <img src="/logos/mini-binz.png" alt="Mini Binz" />
                  <img src="/logos/borders-dumpsters.png" alt="Borders Dumpsters" />
                  <img src="/logos/alco-disposal.png" alt="Alco Disposal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}