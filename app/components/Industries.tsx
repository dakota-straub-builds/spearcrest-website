"use client";
import { useState } from "react";
import { Icon } from "./icons";

type IconKey = keyof typeof Icon;
type Industry = {
  key: string; icon: IconKey; name: string;
  headline: string; desc: string; bullets: string[];
  metrics: { v: string; l: string }[];
  rows: { label: string; val: string }[];
};

export const INDUSTRIES: Industry[] = [
  { key: "junk", icon: "truck", name: "Junk Removal", headline: "Calls on weekends. Trucks booked solid.", desc: "Junk removal lives or dies on local intent. We win 'junk removal near me' across your service radius — and turn it into booked jobs.", bullets: ["Same-day search-to-call funnels","Service-area landing pages","GBP optimized for service jobs"], metrics: [{ v: "3.4×", l: "Booked jobs" }, { v: "$22", l: "Cost / lead" }], rows: [{ label: 'Local pack — "junk removal Louisville"', val: "#1" },{ label: "Avg. weekend bookings", val: "+187%" },{ label: "Phone calls (last 30d)", val: "412" }] },
  { key: "dumpster", icon: "dumpster", name: "Dumpster Rental", headline: "Rented out before the weekend rush.", desc: "Dumpster rentals are a yield game. We help you fill the calendar with the right size hauls and the right ZIPs.", bullets: ["Inventory-aware ad copy","Service-radius geo-targeting","Repeat-customer remarketing"], metrics: [{ v: "92%", l: "Utilization" }, { v: "2.1×", l: "Repeat rate" }], rows: [{ label: "Quote-form submits", val: "+143%" },{ label: "Avg. rental days", val: "6.2d" },{ label: "Cost / converted lead", val: "$31" }] },
  { key: "restoration", icon: "drop", name: "Restoration", headline: "First call when the water hits.", desc: "Restoration is an emergency category. We make sure when disaster strikes, you're the first call — not the third.", bullets: ["24/7 ad scheduling","Insurance-keyword strategies","Speed-to-lead automation"], metrics: [{ v: "11min", l: "Avg. response" }, { v: "4.7×", l: "Emergency calls" }], rows: [{ label: "After-hours call rate", val: "+312%" },{ label: "Insurance-claim deals", val: "38" },{ label: "Avg. ticket size", val: "$8.4K" }] },
  { key: "roofing", icon: "roof", name: "Roofing", headline: "From storm radar to signed contracts.", desc: "Roofing pipelines need volume and speed. We pair geo-bid storm campaigns with airtight follow-up tracking.", bullets: ["Storm-zone campaign launch","Inspection booking flows","Project-photo SEO"], metrics: [{ v: "5.2×", l: "Inspections / mo" }, { v: "$1.2M", l: "Pipeline lift" }], rows: [{ label: "Free-inspection book rate", val: "+227%" },{ label: "Cost / signed contract", val: "$280" },{ label: "Avg. project size", val: "$14.6K" }] },
  { key: "landscaping", icon: "leaf", name: "Landscaping", headline: "Spring books out by February.", desc: "Seasonal businesses need year-round momentum. We fill your spring calendar before the snow melts.", bullets: ["Off-season retargeting","Project portfolio SEO","Maintenance-package upsells"], metrics: [{ v: "108", l: "Spring books" }, { v: "$67K", l: "Avg. backlog" }], rows: [{ label: "Estimate requests", val: "+165%" },{ label: "Maintenance recurring", val: "+58%" },{ label: "Photo-search clicks", val: "14.2K" }] },
  { key: "law", icon: "scale", name: "Law Firms", headline: "Cases that close, not contacts that stall.", desc: "Legal SEO is high-stakes and high-cost. We focus on the case types that actually fill your docket.", bullets: ["Practice-area landing pages","Local cluster SEO","Case-qualified intake forms"], metrics: [{ v: "$185", l: "Cost / SQL" }, { v: "3.1×", l: "Signed cases" }], rows: [{ label: "Qualified consults", val: "+142%" },{ label: "Avg. fee per case", val: "$12.4K" },{ label: "Practice-area top-3", val: "7 of 8" }] },
];

export default function Industries() {
  const [active, setActive] = useState(0);
  const ind = INDUSTRIES[active];
  const IconC = Icon[ind.icon];
  return (
    <section id="industries" className="industries-section">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Who we serve</span>
          <h2 className="section-title">We know your trade. We know your customer.</h2>
          <p className="section-sub">From dumpster yards to law offices — we&rsquo;ve shipped wins in all of them.</p>
        </div>
        <div className="ind-tabs">
          {INDUSTRIES.map((i, idx) => {
            const Ic = Icon[i.icon];
            return (
              <button key={i.key} className={"ind-tab" + (idx === active ? " active" : "")} onClick={() => setActive(idx)}>
                <Ic /><span>{i.name}</span><span className="tab-num">0{idx+1}</span>
              </button>
            );
          })}
        </div>
        <div className="ind-display" key={ind.key}>
          <div className="ind-text">
            <span className="eyebrow">Vertical / {ind.name}</span>
            <h3>{ind.headline}</h3>
            <p>{ind.desc}</p>
            <ul className="ind-bullets">{ind.bullets.map((b,i)=><li key={i}>{b}</li>)}</ul>
            <a href="#audit" className="btn btn-dark">Get a {ind.name.toLowerCase()} audit<span className="arrow"><Icon.arrowUR /></span></a>
          </div>
          <div className="ind-visual">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div className="ind-mock-icon" style={{ width: 40, height: 40, borderRadius: 10 }}><IconC /></div>
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Live dashboard</div>
                  <div style={{ fontFamily: "var(--font-display-grotesk)", fontSize: 18, fontWeight: 600 }}>{ind.name} · 30d</div>
                </div>
              </div>
              <div className="ind-mock">
                {ind.rows.map((r,i)=>(
                  <div key={i} className="ind-mock-row">
                    <span className="ind-mock-icon"><Icon.spark /></span>
                    <b>{r.label}</b><span className="val">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ind-stats">
              {ind.metrics.map((m,i)=>(
                <div key={i} className="ind-stat-mini"><div className="v">{m.v}</div><div className="l">{m.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
