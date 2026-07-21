"use client";
import { useDashboard } from "../components/DashboardContext";
import { monthlyRevenue } from "../lib/data";
import { fmtMoney, fmtDate } from "../lib/format";
import { Avatar, ServiceTags, StatCard } from "../components/ui";
import { RevenueChart, Sparkline } from "../components/charts";
import { DashIcon } from "../components/icons";

export default function DataPage() {
  const { isLead, clients } = useDashboard();

  if (!isLead) {
    return (
      <div className="dash-card">
        <div className="dash-empty">
          <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--dash-text)" }}>Leadership only</div>
          Data &amp; budget is visible to leadership accounts. Switch to Avery Hollis or Jordan Park from the user menu to preview it.
        </div>
      </div>
    );
  }

  const totalMRR = clients.reduce((s, c) => s + c.mrr, 0);
  const byIndustry: Record<string, number> = {};
  clients.forEach((c) => { byIndustry[c.industry] = (byIndustry[c.industry] || 0) + c.mrr; });
  const indEntries = Object.entries(byIndustry).sort((a, b) => b[1] - a[1]);
  const maxInd = Math.max(...indEntries.map((e) => e[1]));

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Data &amp; budget</h1>
          <div className="dash-sub">Leadership view · revenue, margin, and service mix</div>
        </div>
        <div className="dash-row" style={{ gap: 8 }}>
          <button className="dash-btn"><DashIcon.calendar width={14} height={14} />This year</button>
          <button className="dash-btn"><DashIcon.file width={14} height={14} />Export</button>
        </div>
      </div>

      <div className="dash-stats">
        <StatCard label="YTD revenue" value={fmtMoney(monthlyRevenue.reduce((s, d) => s + d.revenue, 0))} delta="+18% YoY" deltaDir="up" />
        <StatCard label="YTD costs" value={fmtMoney(monthlyRevenue.reduce((s, d) => s + d.costs, 0))} delta="+8% YoY" deltaDir="up" />
        <StatCard label="Gross margin" value="62%" delta="+3 pts YoY" deltaDir="up" />
        <StatCard label="Total MRR" value={fmtMoney(totalMRR)} sub={`${clients.length} clients`} />
      </div>

      <div className="dash-two-col" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head"><h3>Monthly revenue vs costs</h3></div>
          <div className="dash-card-pad">
            <RevenueChart data={monthlyRevenue} height={260} />
            <div className="dash-row" style={{ gap: 24, marginTop: 16, justifyContent: "center", fontSize: 13, color: "var(--dash-text-muted)" }}>
              <div className="dash-row" style={{ gap: 6 }}><span style={{ width: 10, height: 10, background: "var(--dash-purple)", borderRadius: 2 }} />Revenue</div>
              <div className="dash-row" style={{ gap: 6 }}><span style={{ width: 10, height: 10, border: "1px dashed var(--dash-purple)", borderRadius: 2 }} />Projected (May)</div>
            </div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>MRR by industry</h3></div>
          <div className="dash-card-pad" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {indEntries.map(([name, val]) => (
              <div key={name}>
                <div className="dash-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
                  <span className="dash-tnum dash-muted" style={{ fontSize: 13 }}>{fmtMoney(val)}/mo</span>
                </div>
                <div style={{ height: 8, background: "var(--dash-surface-2)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(val / maxInd) * 100}%`, background: "var(--dash-purple)", borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 24, overflowX: "auto" }}>
        <div className="dash-card-head">
          <h3>Per-client breakdown</h3>
          <span className="dash-muted" style={{ fontSize: 12 }}>Sorted by MRR</span>
        </div>
        <table className="dash-table">
          <thead>
            <tr><th>Client</th><th>Services</th><th style={{ textAlign: "right" }}>MRR</th><th style={{ textAlign: "right" }}>Annual</th><th>Trend (6mo)</th><th>Renewal</th></tr>
          </thead>
          <tbody>
            {[...clients].sort((a, b) => b.mrr - a.mrr).map((c) => {
              const seed = c.id.charCodeAt(1);
              const trend = Array.from({ length: 6 }).map((_, i) => c.mrr * (0.7 + ((seed * (i + 1)) % 30) / 100));
              trend[5] = c.mrr;
              return (
                <tr key={c.id}>
                  <td><div className="dash-client-cell"><Avatar user={c} /><div><div className="dash-name">{c.name}</div><div className="dash-sub">{c.industry}</div></div></div></td>
                  <td><ServiceTags services={c.services} /></td>
                  <td className="dash-tnum" style={{ textAlign: "right", fontWeight: 600 }}>{fmtMoney(c.mrr)}</td>
                  <td className="dash-tnum" style={{ textAlign: "right", color: "var(--dash-text-muted)" }}>{fmtMoney(c.mrr * 12)}</td>
                  <td><Sparkline data={trend} /></td>
                  <td className="dash-tnum" style={{ fontSize: 13 }}>{fmtDate(c.renewal)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
