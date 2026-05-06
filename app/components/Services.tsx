"use client";
import { Icon } from "./icons";

type Package = {
  key: string;
  name: string;
  badge?: string;
  bestFor: string;
  tagline: string;
  price: string;
  per: string;
  bullets: string[];
  cta: string;
  featured?: boolean;
};

const PACKAGES: Package[] = [
  {
    key: "launchpad",
    name: "Launchpad",
    bestFor: "Best for $100k – $175k businesses",
    tagline: "Build the foundation. Get found.",
    price: "$1,500",
    per: "/mo",
    bullets: [
      "On-Page SEO",
      "1 piece of content per month",
      "Google Business Profile optimization & management",
      "Monthly reporting",
    ],
    cta: "Get started",
  },
  {
    key: "ascent",
    name: "Ascent",
    badge: "Most Popular",
    bestFor: "Best for $300k – $500k businesses",
    tagline: "Start climbing.",
    price: "$3,000",
    per: "/mo",
    bullets: [
      "Custom website design",
      "On-Page SEO",
      "Starter technical and Off-Page SEO",
      "2 pieces of content per month",
      "Google Business Profile optimization & management",
      "Google PPC Ads management",
      "Ads lead tracking & monthly reporting",
    ],
    cta: "Book your strategy call",
    featured: true,
  },
  {
    key: "orbit",
    name: "Orbit",
    bestFor: "Best for $500k – $1M businesses",
    tagline: "Stay seen. Stay ahead.",
    price: "$4,500",
    per: "/mo",
    bullets: [
      "Custom website design",
      "Full technical, On-Page & Off-Page SEO",
      "4 pieces of content per month",
      "Google Business Profile optimization & management",
      "Google PPC Ads management",
      "Ads lead tracking & monthly reporting",
    ],
    cta: "Get started",
  },
  {
    key: "meteor",
    name: "Meteor",
    bestFor: "For $1M+ businesses & multi-location",
    tagline: "Contact for your custom growth plan.",
    price: "$7,000+",
    per: "/mo",
    bullets: [
      "Enterprise-level SEO & PPC",
      "Custom website design",
      "GBP optimization & management",
      "Lead tracking & weekly custom reporting",
      "Ideal for multi-location organizations",
    ],
    cta: "Get started",
  },
];

export default function Services() {
  return (
    <section id="services" className="services-section pricing-space">
      <div className="pricing-bg" aria-hidden="true">
        <div className="space-stars" />
        <div className="space-stars b" />
        <div className="shooting-star s1" />
        <img src="/rocket.png" alt="" className="pricing-rocket r1" />
        <img src="/rocket.png" alt="" className="pricing-rocket r2" />
        <img src="/rocket.png" alt="" className="pricing-rocket r3" />
      </div>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">Pick a package that fits where you&rsquo;re headed.</h2>
          <p className="section-sub">Built for owner-operators. Priced for growth, not enterprise overhead.</p>
        </div>
        <div className="pkg-grid">
          {PACKAGES.map((p) => (
            <div key={p.key} className={"pkg-card" + (p.featured ? " featured" : "")}>
              {p.badge && <div className="pkg-badge">{p.badge}</div>}
              <div className="pkg-name">{p.name} Package</div>
              <div className="pkg-best">{p.bestFor}</div>
              <div className="pkg-tagline">{p.tagline}</div>
              <div className="pkg-price">{p.price}<span className="per">{p.per}</span></div>
              <ul className="pkg-bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}><span className="pkg-check">✓</span>{b}</li>
                ))}
              </ul>
              <a href="#contact" className="btn pkg-cta">
                {p.cta}<span className="arrow"><Icon.arrowUR /></span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}