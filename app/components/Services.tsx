"use client";
import { useState } from "react";
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
  const [active, setActive] = useState(1); // start with Ascent

  const goPrev = () => setActive((a) => (a - 1 + PACKAGES.length) % PACKAGES.length);
  const goNext = () => setActive((a) => (a + 1) % PACKAGES.length);

  return (
    <section id="services" className="services-section pricing-space">
      <div className="pricing-bg" aria-hidden="true">
        <div className="space-stars" />
        <div className="space-stars b" />
        <img src="/rocket.png" alt="" className="pricing-rocket r1" />
        <img src="/rocket.png" alt="" className="pricing-rocket r2" />
        <img src="/rocket.png" alt="" className="pricing-rocket r3" />
      </div>
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">Pick a package that fits where you&rsquo;re headed.</h2>
          <p className="section-sub">Built for owner-operators. Priced for growth, not enterprise overhead.</p>
        </div>

        <div className="carousel">
          <button className="carousel-arrow prev" onClick={goPrev} aria-label="Previous package">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="carousel-track">
            {PACKAGES.map((p, i) => {
              const offset = i - active;
              const wrappedOffset = offset > PACKAGES.length / 2 ? offset - PACKAGES.length : offset < -PACKAGES.length / 2 ? offset + PACKAGES.length : offset;
              const position = wrappedOffset === 0 ? "center" : wrappedOffset === -1 ? "left" : wrappedOffset === 1 ? "right" : "hidden";
              return (
                <div
                  key={p.key}
                  className={`carousel-card pos-${position}`}
                  onClick={() => position !== "center" && setActive(i)}
                  aria-hidden={position === "hidden"}
                >
                  {p.badge && position === "center" && <div className="pkg-badge">{p.badge}</div>}
                  <div className="pkg-name">{p.name} Package</div>
                  <div className="pkg-best">{p.bestFor}</div>
                  <div className="pkg-tagline">{p.tagline}</div>
                  <div className="pkg-price">{p.price}<span className="per">{p.per}</span></div>
                  <ul className="pkg-bullets">
                    {p.bullets.map((b, j) => (
                      <li key={j}><span className="pkg-check">✓</span>{b}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn pkg-cta">
                    {p.cta}<span className="arrow"><Icon.arrowUR /></span>
                  </a>
                </div>
              );
            })}
          </div>

          <button className="carousel-arrow next" onClick={goNext} aria-label="Next package">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="carousel-dots">
          {PACKAGES.map((p, i) => (
            <button
              key={p.key}
              className={"carousel-dot" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
              aria-label={`Go to ${p.name} package`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}