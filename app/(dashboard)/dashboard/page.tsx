"use client";
import Link from "next/link";
import { useDashboard } from "../components/DashboardContext";
import { updates as ALL_UPDATES, monthlyRevenue, serviceBreakdown, TODAY } from "../lib/data";
import { fmtMoney, fmtDate, fmtDateTime, userById, clientById } from "../lib/format";
import { Avatar, HealthPill, StatCard } from "../components/ui";
import { RevenueChart, Donut } from "../components/charts";
import { DashIcon } from "../components/icons";

export default function DashboardPage() {
  const { isLead } = useDashboard();
  return isLead ? <LeadershipDashboard /> : <EmployeeDashboard />;
}

function LeadershipDashboard() {
  const { clients } = useDashboard();
  const totalMRR = clients.filter((c) => c.status === "Active" || c.status === "Onboarding").reduce((s, c) => s + c.mrr, 0);
  const active = clients.filter((c) => c.status === "Active").length;
  const onboarding = clients.filter((c) => c.status === "Onboarding").length;
  const atRisk = clients.filter((c) => c.health === "at-risk").length;

  const renewSoon = clients
    .map((c) => ({ ...c, days: Math.ceil((new Date(c.renewal).getTime() - new Date(TODAY).getTime()) / 86400000) }))
    .filter((c) => c.days >= 0 && c.days <= 90)
    .sort((a, b) => a.days - b.days);

  const recentUpdates = ALL_UPDATES.slice(0, 4);

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Good afternoon, Avery.</h1>
          <div className="dash-sub">Here's what's moving across the agency today — Mon, May 12.</div>
        </div>
        <div className="dash-row" style={{ gap: 8 }}>
          <button className="dash-btn"><DashIcon.file width={14} height={14} />Export</button>
          <button className="dash-btn dash-btn-accent"><DashIcon.plus width={14} height={14} />New update</button>
        </div>
      </div>

      <div className="dash-stats">
        <StatCard label="Monthly recurring rev" value={fmtMoney(totalMRR)} delta="+$1,100 vs Apr" deltaDir="up" />
        <StatCard label="Active clients" value={active} sub={`${onboarding} onboarding`} />
        <StatCard label="May revenue (proj.)" value={fmtMoney(30000)} delta="+1.0% vs Apr" deltaDir="up" />
        <StatCard label="At-risk accounts" value={atRisk} sub="1 needs a call this week" />
      </div>

      <div className="dash-two-col" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>Revenue — last 6 months</h3>
            <div className="dash-row" style={{ gap: 8 }}>
              <span className="dash-pill"><span className="dash-pill-dot" style={{ background: "var(--dash-purple)" }} />Booked</span>
              <span className="dash-pill"><span className="dash-pill-dot" style={{ background: "var(--dash-purple-soft)", boxShadow: "inset 0 0 0 1px var(--dash-purple)" }} />Projected</span>
            </div>
          </div>
          <div className="dash-card-pad">
            <RevenueChart data={monthlyRevenue} />
          </div>
          <div className="dash-card-head" style={{ borderTop: "1px solid var(--dash-border)", borderBottom: "none" }}>
            <div className="dash-row" style={{ gap: 24 }}>
              <div>
                <div className="dash-muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>YTD revenue</div>
                <div className="dash-tnum" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{fmtMoney(monthlyRevenue.reduce((s, d) => s + d.revenue, 0))}</div>
              </div>
              <div>
                <div className="dash-muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>YTD margin</div>
                <div className="dash-tnum" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>62%</div>
              </div>
              <div>
                <div className="dash-muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Avg deal size</div>
                <div className="dash-tnum" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>$3,750</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>MRR by service</h3></div>
          <div className="dash-card-pad" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Donut data={serviceBreakdown} />
          </div>
          <div style={{ padding: "0 20px 16px" }}>
            {serviceBreakdown.map((s) => (
              <div key={s.name} className="dash-row" style={{ justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid var(--dash-border)" }}>
                <div className="dash-row" style={{ gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} /><span style={{ fontSize: 13 }}>{s.name}</span></div>
                <div className="dash-tnum" style={{ fontSize: 13, color: "var(--dash-text-muted)" }}>{fmtMoney(s.value)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dash-two-col" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>Recent project updates</h3>
            <Link href="/updates" className="dash-btn dash-btn-ghost dash-btn-sm">View all <DashIcon.arrow width={12} height={12} /></Link>
          </div>
          <div>
            {recentUpdates.map((u) => {
              const client = clientById(u.clientId);
              const author = userById(u.authorId);
              if (!client || !author) return null;
              return (
                <Link key={u.id} href={`/clients/${client.id}`} className="dash-update" style={{ cursor: "pointer" }}>
                  <Avatar user={author} size="lg" />
                  <div>
                    <div className="dash-title">{u.title}</div>
                    <div className="dash-meta">
                      <span style={{ fontWeight: 600, color: "var(--dash-text)" }}>{client.name}</span> · {u.service} · {author.name}
                    </div>
                    <div className="dash-body">{u.body}</div>
                  </div>
                  <div className="dash-right">{fmtDateTime(u.date)}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>Renewals — next 90 days</h3></div>
          {renewSoon.length === 0 ? (
            <div className="dash-empty">No renewals in this window.</div>
          ) : (
            <div style={{ padding: "4px 0" }}>
              {renewSoon.map((c) => (
                <Link key={c.id} href={`/clients/${c.id}`} className="dash-row" style={{ justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid var(--dash-border)", cursor: "pointer" }}>
                  <div className="dash-row" style={{ gap: 12 }}>
                    <Avatar user={c} square />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                      <div className="dash-muted" style={{ fontSize: 12 }}>{fmtMoney(c.mrr)}/mo · {c.industry}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{fmtDate(c.renewal)}</div>
                    <div className="dash-muted" style={{ fontSize: 12 }}>in {c.days} days</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmployeeDashboard() {
  const { currentUser, clients } = useDashboard();
  const myClients = clients.filter((c) => {
    if (c.owner === currentUser.id) return true;
    if (currentUser.role.includes("SEO") && c.services.includes("SEO")) return true;
    if (currentUser.role.includes("GBP") && c.services.includes("GBP")) return true;
    if (currentUser.role.includes("Developer") && c.services.includes("Web Design")) return true;
    if (currentUser.role.includes("Ads") && c.services.includes("Google Ads")) return true;
    return false;
  });
  const myUpdates = ALL_UPDATES.filter((u) => u.authorId === currentUser.id);
  const recentUpdates = ALL_UPDATES.filter((u) => myClients.some((c) => c.id === u.clientId)).slice(0, 5);

  const myTasks = [
    { id: 1, client: myClients[0]?.name || "—", text: "Publish content cluster spoke pages", due: "Today", done: false, priority: "high" as const },
    { id: 2, client: myClients[1]?.name || "—", text: "Audit page speed + Core Web Vitals", due: "Tomorrow", done: false, priority: "med" as const },
    { id: 3, client: myClients[0]?.name || "—", text: "Review backlink prospects for outreach", due: "Wed", done: false, priority: "med" as const },
    { id: 4, client: myClients[2]?.name || "—", text: "Send monthly progress recap", due: "Fri", done: true, priority: "low" as const },
  ].filter((t) => t.client !== "—");

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Hi, {currentUser.name.split(" ")[0]}.</h1>
          <div className="dash-sub">
            You have <strong>{myTasks.filter((t) => !t.done).length}</strong> open tasks across <strong>{myClients.length}</strong> clients today.
          </div>
        </div>
        <div className="dash-row" style={{ gap: 8 }}>
          <Link href="/updates" className="dash-btn dash-btn-accent"><DashIcon.plus width={14} height={14} />New update</Link>
        </div>
      </div>

      <div className="dash-stats">
        <StatCard label="My clients" value={myClients.length} sub={currentUser.role} />
        <StatCard label="My updates this month" value={myUpdates.length} delta="On pace" deltaDir="up" />
        <StatCard label="Open tasks" value={myTasks.filter((t) => !t.done).length} sub={`${myTasks.filter((t) => t.priority === "high" && !t.done).length} high priority`} />
        <StatCard label="Avg response time" value="2.4 hrs" delta="-18% vs last mo" deltaDir="up" />
      </div>

      <div className="dash-two-col" style={{ marginTop: 24 }}>
        <div className="dash-card">
          <div className="dash-card-head">
            <h3>My tasks</h3>
            <button className="dash-btn dash-btn-ghost dash-btn-sm"><DashIcon.plus width={12} height={12} />Add task</button>
          </div>
          <div style={{ padding: "8px 0" }}>
            {myTasks.map((t) => (
              <div key={t.id} className="dash-row" style={{ gap: 12, padding: "10px 20px", borderTop: "1px solid var(--dash-border)" }}>
                <input type="checkbox" defaultChecked={t.done} style={{ accentColor: "var(--dash-purple)", width: 16, height: 16 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--dash-text-muted)" : "var(--dash-text)" }}>{t.text}</div>
                  <div className="dash-muted" style={{ fontSize: 12, marginTop: 2 }}>{t.client}</div>
                </div>
                <span className={`dash-pill ${t.priority === "high" ? "dash-pill-risk" : t.priority === "med" ? "dash-pill-warn" : ""}`}>{t.due}</span>
              </div>
            ))}
            {myTasks.length === 0 && <div className="dash-empty">No tasks yet. Tasks you're assigned will appear here.</div>}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-head"><h3>My clients</h3></div>
          {myClients.length === 0 ? (
            <div className="dash-empty">You don't have any clients assigned yet.</div>
          ) : (
            myClients.map((c) => (
              <Link key={c.id} href={`/clients/${c.id}`} className="dash-row" style={{ justifyContent: "space-between", padding: "12px 20px", borderTop: "1px solid var(--dash-border)", cursor: "pointer" }}>
                <div className="dash-row" style={{ gap: 12 }}>
                  <Avatar user={c} square />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                    <div className="dash-muted" style={{ fontSize: 12 }}>{c.industry} · {c.lastTouch}</div>
                  </div>
                </div>
                <HealthPill status={c.status} health={c.health} />
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: 24 }}>
        <div className="dash-card-head">
          <h3>Recent updates on my clients</h3>
          <Link href="/updates" className="dash-btn dash-btn-ghost dash-btn-sm">View all <DashIcon.arrow width={12} height={12} /></Link>
        </div>
        {recentUpdates.length === 0 ? (
          <div className="dash-empty">No recent updates on your clients.</div>
        ) : (
          recentUpdates.map((u) => {
            const client = clientById(u.clientId);
            const author = userById(u.authorId);
            if (!client || !author) return null;
            return (
              <Link key={u.id} href={`/clients/${client.id}`} className="dash-update" style={{ cursor: "pointer" }}>
                <Avatar user={author} size="lg" />
                <div>
                  <div className="dash-title">{u.title}</div>
                  <div className="dash-meta"><span style={{ fontWeight: 600, color: "var(--dash-text)" }}>{client.name}</span> · {u.service} · {author.name}</div>
                  <div className="dash-body">{u.body}</div>
                </div>
                <div className="dash-right">{fmtDateTime(u.date)}</div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
