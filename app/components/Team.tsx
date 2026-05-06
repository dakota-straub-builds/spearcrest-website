import { HelmetAvatar } from "./HelmetAvatar";

const TEAM = [
  { name: "Ronnie Knuckles", role: "CEO / Founder", bio: "Founded SpearCrest to do for service businesses what big agencies won't. Sets the strategy across every account.", variant: 0 },
  { name: "Dakota Straub", role: "Vice President", bio: "Runs partnerships and operations. Your direct line for anything bigger than a tactic.", variant: 1 },
  { name: "Ryan Woosley", role: "Director of Paid Ads", bio: "Lives in Google Ads Editor. Has never met a wasted dollar he wouldn't hunt down.", variant: 2 },
  { name: "Rhiyana Padua", role: "Lead Developer", bio: "Builds the sites, landing pages, and tracking under the hood. The reason your site loads in under 2s.", variant: 3 },
  { name: "Eden Dasok", role: "GBP Manager", bio: "Photos, posts, Q&A, reviews — the entire local presence. Knows every map-pack ranking factor by heart.", variant: 4 },
  { name: "Bob Joe", role: "Lead SEO Specialist", bio: "Technical SEO + content strategy. The reason we rank you in 30 days, not 6 months.", variant: 5 },
];

export default function Team() {
  return (
    <section id="team" className="team-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Meet the team</span>
          <h2 className="section-title">Small team. Senior operators. No account managers.</h2>
          <p className="section-sub">When you hire SpearCrest, you talk to the people doing the work — not a sales rep handing you off.</p>
        </div>
        <div className="team-grid">
          {TEAM.map((m) => (
            <div key={m.name} className="team-card">
              <HelmetAvatar variant={m.variant} />
              <div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
              <p className="team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
