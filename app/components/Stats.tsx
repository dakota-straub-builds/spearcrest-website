"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration = 1400, trigger = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number, start: number | undefined;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(end * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [trigger, end, duration]);
  return n;
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const a = useCountUp(60, 1200, seen);
  const b = useCountUp(500, 1600, seen);
  const c = useCountUp(3, 1200, seen);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <span className="eyebrow">By the numbers</span>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}>A few numbers we&rsquo;re proud of.</h2>
          <p className="section-sub">Real wins from real businesses we work with every day.</p>
        </div>
        <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">{Math.round(a)}<span className="unit">+</span></div>
            <div className="stat-label">Businesses partnered</div>
            <div className="stat-desc">Local owner-operators across six verticals.</div>
          </div>
          <div className="stat">
            <div className="stat-value">{seen ? Math.round(b).toLocaleString() : 0}<span className="unit">K+</span></div>
            <div className="stat-label">Leads generated</div>
            <div className="stat-desc">Across SEO, paid, and local presence — tracked end-to-end.</div>
          </div>
          <div className="stat">
            <div className="stat-value">{c.toFixed(1)}<span className="unit">×</span></div>
            <div className="stat-label">Avg. traffic increase</div>
            <div className="stat-desc">Measured 90 days vs. the 90 days before we started.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
