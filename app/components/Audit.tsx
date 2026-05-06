import { Icon } from "./icons";

export default function Audit() {
  return (
    <section id="audit" className="audit-section">
      <div className="container">
        <div className="audit-card">
          <div>
            <span className="eyebrow">Free audit</span>
            <h2>Want to see what we&rsquo;d actually do for your site?</h2>
            <p>We&rsquo;ll send a no-strings 30-minute Loom walking through your site and three things we&rsquo;d fix this week.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="btn btn-primary">Claim your audit<span className="arrow"><Icon.arrowUR /></span></a>
              <a href="#process" className="btn btn-on-dark-ghost">What we&rsquo;ll cover</a>
            </div>
          </div>
          <div className="audit-checklist">
            {[
              ["Site speed & technical SEO","12 checks"],
              ["Local presence + GBP gaps","8 checks"],
              ["Top-3 competitor teardown","3 sites"],
              ["90-day priority roadmap","1 page"],
            ].map(([label, meta], i) => (
              <div key={i} className="audit-check">
                <div className="check">✓</div>
                <b>{label}</b>
                <span>{meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
