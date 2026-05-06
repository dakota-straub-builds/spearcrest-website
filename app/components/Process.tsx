import { Icon } from "./icons";

type IconKey = keyof typeof Icon;
const STEPS: { num: string; title: string; desc: string; icon: IconKey }[] = [
  { num: "01", title: "Discovery call", desc: "A 30-min intro. We learn your business, your goals, and the channels you've already tried.", icon: "phone" },
  { num: "02", title: "Audit & plan", desc: "A free written audit and 90-day roadmap with prioritized moves — yours to keep, even if we don't partner.", icon: "report" },
  { num: "03", title: "Sprint launch", desc: "Two-week onboarding. Tracking, GBP, ads, and SEO foundations all set up before month one is over.", icon: "spark" },
  { num: "04", title: "Monthly review", desc: "A 1-page report and a 30-min review call. Every month. No PDFs we both pretend to read.", icon: "calendar" },
];

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">How it goes</span>
          <h2 className="section-title">Simple, friendly, no surprises.</h2>
          <p className="section-sub">From the first call to the first report, you&rsquo;ll always know where things stand.</p>
        </div>
        <div className="proc-grid">
          {STEPS.map((s) => {
            const IconC = Icon[s.icon];
            return (
              <div key={s.num} className="proc-step">
                <div className="proc-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <div className="proc-step-icon"><IconC /></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
