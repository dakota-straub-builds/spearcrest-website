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
      "Google Business Profile optimization",
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
      "Starter technical & Off-Page SEO",
      "2 pieces of content per month",
      "Google Business Profile management",
      "Google PPC Ads management",
      "Lead tracking & monthly reporting",
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
      "Google Business Profile management",
      "Google PPC Ads management",
      "Lead tracking & monthly reporting",
    ],
    cta: "Get started",
  },
  {
    key: "meteor",
    name: "Meteor",
    bestFor: "For $1M+ businesses & multi-location",
    tagline: "Custom growth plan.",
    price: "$7,000+",
    per: "/mo",
    bullets: [
      "Enterprise-level SEO & PPC",
      "Custom website design",
      "GBP optimization & management",
      "Weekly custom reporting",
      "Ideal for multi-location",
    ],
    cta: "Get started",
  },
];

export default function Services() {
  const [active, setActive] = useState(1); // Ascent centered first

  const goPrev = () => setActive((a) => (a - 1 + PACKAGES.length) % PACKAGES.length);
  const goNext = () => setActive((a) => (a + 1) % PACKAGES.length);

  return (
    <section id="services" className="rocket-carousel-section">
      <img src="/astronaut-flag.png" alt="" className="pricing-astro pa-1" aria-hidden="true" />
      <img src="/astronaut-flag.png" alt="" className="pricing-astro pa-2" aria-hidden="true" />
      <img src="/astronaut-flag.png" alt="" className="pricing-astro pa-3" aria-hidden="true" />

      <div className="container">
        <div className="dogfight-head">
          <span className="dogfight-tag">PRICING</span>
          <h2 className="dogfight-title">
            Pick a package that fits<br />where you&rsquo;re <em>headed</em>.
          </h2>
          <p className="dogfight-sub">
            Built for owner-operators. Priced for growth, not enterprise overhead.
          </p>
        </div>

        <div className="rc-wrap">
          <button className="rc-arrow rc-prev" onClick={goPrev} aria-label="Previous package">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div className="rc-track">
            {PACKAGES.map((p, i) => {
              const offset = i - active;
              const wrappedOffset =
                offset > PACKAGES.length / 2 ? offset - PACKAGES.length :
                offset < -PACKAGES.length / 2 ? offset + PACKAGES.length :
                offset;
              const position =
                wrappedOffset === 0 ? "center" :
                wrappedOffset === -1 ? "left" :
                wrappedOffset === 1 ? "right" :
                "hidden";

              return (
                <div
                  key={p.key}
                  className={`rc-card rc-${position}` + (p.badge ? " rc-popular" : "")}
                  onClick={() => position !== "center" && setActive(i)}
                  aria-hidden={position === "hidden"}
                >
                  <div className="rc-card-header">
                    <span className="rc-card-name">{p.name} Package</span>
                    <div className="rc-card-dots">
                      <span /><span /><span />
                    </div>
                  </div>

                  <div className="rc-card-body">
                    {position === "center" && (
                      <div className="rc-rockets" aria-hidden="true">
                        <img src="/rocket.png" alt="" className="rc-rocket rcr-1" />
                        <img src="/rocket.png" alt="" className="rc-rocket rcr-2" />
                      </div>
                    )}

                    {p.badge && <div className="rc-badge">★ {p.badge}</div>}

                    <div className="rc-content">
                      <div className="rc-best">{p.bestFor}</div>
                      <div className="rc-tagline">{p.tagline}</div>
                      <div className="rc-price">
                        {p.price}<span className="per">{p.per}</span>
                      </div>

                      <ul className="rc-bullets">
                        {p.bullets.map((b, j) => (
                          <li key={j}>
                            <span className="rc-check">✓</span>{b}
                          </li>
                        ))}
                      </ul>

                      <a href="#contact" className="rc-cta">
                        {p.cta}
                        <span className="arrow"><Icon.arrowUR /></span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="rc-arrow rc-next" onClick={goNext} aria-label="Next package">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        <div className="rc-dots">
          {PACKAGES.map((p, i) => (
            <button
              key={p.key}
              className={"rc-dot" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
              aria-label={`Go to ${p.name} package`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}