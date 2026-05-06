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
  const a = useCountUp(300, 1400, seen);
  const b = useCountUp(60, 1200, seen);
  const c = useCountUp(1000, 1600, seen);

  return (
    <section className="stats-section" ref={ref}>
      <img src="/rocket.png" alt="" className="stats-rocket r1" />
      <img src="/rocket.png" alt="" className="stats-rocket r2" />
      <img src="/rocket.png" alt="" className="stats-rocket r3" />
      <div className="container">
        <div className="section-head center" style={{ marginBottom: 40 }}>
          <span className="eyebrow">BY THE NUMBERS</span>
          <h2 className="section-title" style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}></h2>
          <p className="section-sub">REAL WINS FROM REAL BUSINESSES WE WORK WITH EVERYDAY.</p>
        </div>
     <div className="stats-grid">
          <div className="stat">
            <div className="stat-value">{Math.round(a)}<span className="unit">+</span></div>
            <div className="stat-label">Websites built</div>
            <div className="stat-desc">Clients trusting SpearCrest with their growth.</div>
          </div>
          <div className="stat">
            <div className="stat-value">{Math.round(b)}<span className="unit">+</span></div>
            <div className="stat-label">Dumpster rental clients</div>
            <div className="stat-desc">Trusting SpearCrest with their growth.</div>
          </div>
          <div className="stat">
            <div className="stat-value">{seen ? Math.round(c).toLocaleString() : 0}<span className="unit">+</span></div>
            <div className="stat-label">Leads from Google Ads</div>
            <div className="stat-desc">Generated for our clients across every vertical.</div>
          </div>
        </div>
      </div>
    </section>
  );
}