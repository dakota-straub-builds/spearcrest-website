"use client";
import { useState } from "react";
import Link from "next/link";
import { useDashboard } from "../../components/DashboardContext";
import { updates as ALL_UPDATES } from "../../lib/data";
import { fmtMoney, fmtDate, fmtDateTime, userById } from "../../lib/format";
import { Avatar, HealthPill, ServiceTags, StatCard } from "../../components/ui";
import { DashIcon } from "../../components/icons";

type Tab = "overview" | "updates" | "notes" | "files" | "billing";

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const { isLead, clients } = useDashboard();
  const [tab, setTab] = useState<Tab>("overview");
  const c = clients.find((x) => x.id === params.id);

  if (!c) {
    return (
      <div>
        <div className="dash-empty">Client not found.</div>
        <div style={{ textAlign: "center" }}>
          <Link href="/clients" className="dash-btn dash-btn-ghost dash-btn-sm"><DashIcon.arrowLeft width={12} height={12} /> All clients</Link>
        </div>
      </div>
    );
  }

  const owner = userById(c.owner);
  const clientUpdates = ALL_UPDATES.filter((u) => u.clientId === c.id);
  const tabs: Tab[] = isLead ? ["overview", "updates", "notes", "files", "billing"] : ["overview", "updates", "notes", "files"];

  return (
    <div>
      <Link href="/clients" className="dash-btn dash-btn-ghost dash-btn-sm" style={{ marginBottom: 12, marginLeft: -6, display: "inline-flex" }}>
        <DashIcon.arrowLeft width={12} height={12} /> All clients
      </Link>

      <div className="dash-detail-header">
        <Avatar user={c} size="xl" />
        <div>
          <h1>{c.name}</h1>
          <div className="dash-meta-row">
            <HealthPill status={c.status} health={c.health} />
            <span><DashIcon.map width={13} height={13} /> {c.location}</span>
            <span><DashIcon.globe width={13} height={13} /> {c.website}</span>
            <span>Owner: <strong style={{ color: "var(--dash-text)", fontWeight: 600 }}>{owner?.name}</strong></span>
          </div>
        </div>
        <div className="dash-actions">
          <button className="dash-btn"><DashIcon.edit width={14} height={14} />Edit</button>
          <button className="dash-btn dash-btn-accent"><DashIcon.plus width={14} height={14} />Log update</button>
        </div>
      </div>

      <div className="dash-stats">
        {isLead ? (
          <StatCard label="MRR" value={fmtMoney(c.mrr)} sub={`${c.services.length} services`} />
        ) : (
          <StatCard label="Services" value={c.services.length} sub={c.services.join(" · ")} />
        )}
        {isLead ? (
          <StatCard label="Lifetime value" value={fmtMoney(c.mrr * 14)} sub="14 months · est." />
        ) : (
          <StatCard label="Last touch" value={c.lastTouch} sub="Most recent activity" />
        )}
        <StatCard label="Contract start" value={fmtDate(c.contractStart)} />
        <StatCard label="Renewal" value={fmtDate(c.renewal)} />
      </div>

      <div className="dash-tabs" style={{ marginTop: 24 }}>
        {tabs.map((t) => (
          <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
            {t === "updates" && <span className="dash-muted" style={{ marginLeft: 6 }}>{clientUpdates.length}</span>}
            {t === "notes" && <span className="dash-muted" style={{ marginLeft: 6 }}>{c.notes.length}</span>}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="dash-two-col">
          <div className="dash-card">
            <div className="dash-card-head"><h3>Recent activity</h3></div>
            <div>
              {clientUpdates.length === 0 && <div className="dash-empty">No updates yet.</div>}
              {clientUpdates.map((u) => {
                const author = userById(u.authorId);
                return (
                  <div key={u.id} className="dash-update">
                    <Avatar user={author} size="lg" />
                    <div>
                      <div className="dash-title">{u.title}</div>
                      <div className="dash-meta">{u.service} · {author?.name}</div>
                      <div className="dash-body">{u.body}</div>
                    </div>
                    <div className="dash-right">{fmtDateTime(u.date)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="dash-card">
              <div className="dash-card-head"><h3>Account info</h3></div>
              <div className="dash-card-pad">
                <dl className="dash-kv">
                  <dt>Industry</dt><dd>{c.industry}</dd>
                  <dt>Status</dt><dd><HealthPill status={c.status} health={c.health} /></dd>
                  <dt>Services</dt><dd><ServiceTags services={c.services} /></dd>
                  <dt>Website</dt><dd><a href={`https://${c.website}`} target="_blank" rel="noreferrer">{c.website}</a></dd>
                  <dt>Location</dt><dd>{c.location}</dd>
                  <dt>Owner</dt><dd className="dash-row" style={{ gap: 8 }}><Avatar user={owner} /><span>{owner?.name}</span></dd>
                </dl>
              </div>
            </div>

            <div className="dash-card" style={{ marginTop: 16 }}>
              <div className="dash-card-head"><h3>Primary contact</h3></div>
              <div className="dash-card-pad">
                <div style={{ fontSize: 15, fontWeight: 600 }}>{c.contact.name}</div>
                <div className="dash-row dash-muted" style={{ gap: 8, marginTop: 8, fontSize: 13 }}>
                  <DashIcon.mail width={14} height={14} /> {c.contact.email}
                </div>
                <div className="dash-row dash-muted" style={{ gap: 8, marginTop: 4, fontSize: 13 }}>
                  <DashIcon.phone width={14} height={14} /> {c.contact.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "updates" && (
        <div className="dash-card">
          {clientUpdates.length === 0 ? (
            <div className="dash-empty">No updates yet.</div>
          ) : (
            clientUpdates.map((u) => {
              const author = userById(u.authorId);
              return (
                <div key={u.id} className="dash-update">
                  <Avatar user={author} size="lg" />
                  <div>
                    <div className="dash-title">{u.title}</div>
                    <div className="dash-meta">{u.service} · {author?.name}</div>
                    <div className="dash-body">{u.body}</div>
                  </div>
                  <div className="dash-right">{fmtDateTime(u.date)}</div>
                </div>
              );
            })
          )}
        </div>
      )}

      {tab === "notes" && (
        <div className="dash-two-col">
          <div className="dash-card">
            <div className="dash-card-head">
              <h3>Notes</h3>
              <button className="dash-btn dash-btn-sm"><DashIcon.plus width={12} height={12} />New note</button>
            </div>
            <div>
              {c.notes.map((n, i) => {
                const author = userById(n.author);
                return (
                  <div key={i} className="dash-note">
                    <div className="dash-note-head">
                      <Avatar user={author} />
                      <span className="dash-who">{author?.name}</span>
                      <span>·</span>
                      <span>{fmtDate(n.date)}</span>
                    </div>
                    <div className="dash-body">{n.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="dash-card">
            <div className="dash-card-head"><h3>Add a note</h3></div>
            <div className="dash-card-pad">
              <textarea
                placeholder="What did you learn? Anything to flag for the team?"
                style={{ width: "100%", minHeight: 120, padding: 12, border: "1px solid var(--dash-border-strong)", borderRadius: "var(--dash-radius)", fontSize: 14, background: "var(--dash-surface)", color: "var(--dash-text)", resize: "vertical", outline: "none" }}
              />
              <div className="dash-row" style={{ marginTop: 12, justifyContent: "space-between" }}>
                <span className="dash-muted" style={{ fontSize: 12 }}>Notes are visible to all teammates</span>
                <button className="dash-btn dash-btn-accent dash-btn-sm">Post note</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "files" && (
        <div className="dash-card">
          <div className="dash-card-head"><h3>Files</h3><button className="dash-btn dash-btn-sm"><DashIcon.plus width={12} height={12} />Upload</button></div>
          <div className="dash-empty">No files uploaded yet. Drop brand kits, contracts, or screenshots here.</div>
        </div>
      )}

      {tab === "billing" && (
        <div className="dash-two-col">
          <div className="dash-card">
            <div className="dash-card-head"><h3>Recent invoices</h3></div>
            <table className="dash-table">
              <thead><tr><th>Invoice</th><th>Issued</th><th>Status</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
              <tbody>
                {[
                  ["INV-1208", "May 1, 2025"],
                  ["INV-1166", "Apr 1, 2025"],
                  ["INV-1124", "Mar 1, 2025"],
                  ["INV-1082", "Feb 1, 2025"],
                ].map(([num, d]) => (
                  <tr key={num}>
                    <td style={{ fontWeight: 600 }}>{num}</td>
                    <td className="dash-muted">{d}</td>
                    <td><span className="dash-pill dash-pill-success"><span className="dash-pill-dot" />Paid</span></td>
                    <td className="dash-tnum" style={{ textAlign: "right" }}>{fmtMoney(c.mrr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dash-card">
            <div className="dash-card-head"><h3>Billing summary</h3></div>
            <div className="dash-card-pad">
              <dl className="dash-kv">
                <dt>Monthly</dt><dd className="dash-tnum">{fmtMoney(c.mrr)}</dd>
                <dt>Annual</dt><dd className="dash-tnum">{fmtMoney(c.mrr * 12)}</dd>
                <dt>Payment</dt><dd>ACH · Net 15</dd>
                <dt>Next charge</dt><dd>Jun 1, 2025</dd>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
