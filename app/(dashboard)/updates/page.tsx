"use client";
import { useState } from "react";
import Link from "next/link";
import { team, updates as ALL_UPDATES } from "../lib/data";
import { fmtDateTime, userById, clientById } from "../lib/format";
import { Avatar } from "../components/ui";
import { DashIcon } from "../components/icons";

const SERVICES = ["All", "SEO", "Web Design", "Google Ads", "GBP", "Account"];

export default function UpdatesPage() {
  const [svc, setSvc] = useState("All");
  const [author, setAuthor] = useState("All");

  let list = ALL_UPDATES;
  if (svc !== "All") list = list.filter((u) => u.service === svc);
  if (author !== "All") list = list.filter((u) => u.authorId === author);

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Project updates</h1>
          <div className="dash-sub">Specialist updates across all clients · {ALL_UPDATES.length} this month</div>
        </div>
        <div className="dash-row" style={{ gap: 8 }}>
          <button className="dash-btn dash-btn-accent"><DashIcon.plus width={14} height={14} />New update</button>
        </div>
      </div>

      <div className="dash-filterbar">
        {SERVICES.map((s) => (
          <button key={s} className={`dash-chip ${svc === s ? "active" : ""}`} onClick={() => setSvc(s)}>{s}</button>
        ))}
        <div style={{ flex: 1 }} />
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ background: "var(--dash-surface)", border: "1px solid var(--dash-border-strong)", borderRadius: "var(--dash-radius)", padding: "7px 11px", fontSize: 13, color: "var(--dash-text)", outline: "none" }}
        >
          <option value="All">All teammates</option>
          {team.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      <div className="dash-card">
        {list.length === 0 ? (
          <div className="dash-empty">No updates matching these filters.</div>
        ) : (
          list.map((u) => {
            const client = clientById(u.clientId);
            const a = userById(u.authorId);
            if (!client || !a) return null;
            return (
              <div key={u.id} className="dash-update">
                <Avatar user={a} size="lg" />
                <div>
                  <div className="dash-title">{u.title}</div>
                  <div className="dash-meta">
                    <Link href={`/clients/${client.id}`} style={{ fontWeight: 600, color: "var(--dash-text)" }}>{client.name}</Link>
                    {" · "}
                    <span className="dash-pill dash-pill-purple" style={{ fontSize: 11 }}>{u.service}</span>
                    {" · "}
                    {a.name}
                  </div>
                  <div className="dash-body">{u.body}</div>
                </div>
                <div className="dash-right">{fmtDateTime(u.date)}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
