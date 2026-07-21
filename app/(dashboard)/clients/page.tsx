"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDashboard } from "../components/DashboardContext";
import { fmtMoney, fmtDate, userById } from "../lib/format";
import { Avatar, HealthPill, ServiceTags } from "../components/ui";
import { DashIcon } from "../components/icons";
import type { Client } from "../lib/data";

export default function ClientsPage() {
  const { isLead, currentUser, clients } = useDashboard();
  const router = useRouter();
  const [filter, setFilter] = useState(isLead ? "All" : "My clients");
  const [q, setQ] = useState("");

  const isMine = (c: Client) => {
    if (c.owner === currentUser.id) return true;
    if (currentUser.role.includes("SEO") && c.services.includes("SEO")) return true;
    if (currentUser.role.includes("GBP") && c.services.includes("GBP")) return true;
    if (currentUser.role.includes("Developer") && c.services.includes("Web Design")) return true;
    if (currentUser.role.includes("Ads") && c.services.includes("Google Ads")) return true;
    return false;
  };

  const filters = isLead ? ["All", "Active", "Onboarding", "At risk"] : ["My clients", "All assigned"];
  const baseList = isLead ? clients : clients.filter(isMine);
  let list = baseList;
  if (isLead) {
    if (filter === "Active") list = list.filter((c) => c.status === "Active");
    else if (filter === "Onboarding") list = list.filter((c) => c.status === "Onboarding");
    else if (filter === "At risk") list = list.filter((c) => c.health === "at-risk" || c.health === "watch");
  }
  if (q) list = list.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.industry.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (!isLead && filter === "All") setFilter("My clients");
  }, [isLead, filter]);

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Clients</h1>
          <div className="dash-sub">
            {isLead
              ? `${clients.length} accounts · ${fmtMoney(clients.reduce((s, c) => s + c.mrr, 0))} total MRR`
              : `${baseList.length} clients assigned to you`}
          </div>
        </div>
        <div className="dash-row" style={{ gap: 8 }}>
          {isLead && <button className="dash-btn"><DashIcon.file width={14} height={14} />Export CSV</button>}
        </div>
      </div>

      <div className="dash-filterbar">
        {filters.map((f) => (
          <button key={f} className={`dash-chip ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <div style={{ flex: 1 }} />
        <input
          placeholder="Search clients…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ background: "var(--dash-surface)", border: "1px solid var(--dash-border-strong)", borderRadius: "var(--dash-radius)", padding: "8px 13px", fontSize: 13, width: 240, outline: "none", color: "var(--dash-text)" }}
        />
      </div>

      <div className="dash-card" style={{ overflowX: "auto" }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Status</th>
              <th>Services</th>
              <th>Owner</th>
              {isLead && <th style={{ textAlign: "right" }}>MRR</th>}
              <th>Renewal</th>
              <th>Last touch</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => {
              const owner = userById(c.owner);
              return (
                <tr key={c.id} className="dash-clickable" onClick={() => router.push(`/clients/${c.id}`)}>
                  <td>
                    <div className="dash-client-cell">
                      <Avatar user={c} />
                      <div>
                        <div className="dash-name">{c.name}</div>
                        <div className="dash-sub">{c.industry} · {c.location}</div>
                      </div>
                    </div>
                  </td>
                  <td><HealthPill status={c.status} health={c.health} /></td>
                  <td><ServiceTags services={c.services} /></td>
                  <td>
                    <div className="dash-row" style={{ gap: 8 }}><Avatar user={owner} /><span style={{ fontSize: 13 }}>{owner?.name.split(" ")[0]}</span></div>
                  </td>
                  {isLead && <td className="dash-tnum" style={{ textAlign: "right", fontWeight: 600 }}>{fmtMoney(c.mrr)}</td>}
                  <td className="dash-tnum" style={{ fontSize: 13 }}>{fmtDate(c.renewal)}</td>
                  <td style={{ fontSize: 13, color: "var(--dash-text-muted)" }}>{c.lastTouch}</td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr><td colSpan={isLead ? 7 : 6}><div className="dash-empty">No clients match your filters.</div></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
