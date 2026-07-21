"use client";
import { useState } from "react";
import { useDashboard } from "../components/DashboardContext";
import { team } from "../lib/data";
import { fmtDate } from "../lib/format";
import { Avatar } from "../components/ui";
import { DashIcon } from "../components/icons";
import InviteModal from "../components/InviteModal";

type Tab = "team" | "workspace" | "billing" | "integrations";

const INTEGRATIONS = [
  { name: "Google Workspace", desc: "SSO + email domain restriction", status: "Connected" },
  { name: "Google Analytics", desc: "Pull client traffic data", status: "Connect" },
  { name: "Google Ads", desc: "Sync ad spend & lead data", status: "Connect" },
  { name: "Stripe", desc: "Invoice & MRR sync", status: "Connect" },
  { name: "Slack", desc: "Update notifications", status: "Connect" },
  { name: "Notion", desc: "Project docs sync", status: "Connect" },
];

export default function SettingsPage() {
  const { isLead, currentUser, clients } = useDashboard();
  const [tab, setTab] = useState<Tab>("team");
  const [showInvite, setShowInvite] = useState(false);

  if (!isLead) {
    return (
      <div className="dash-card">
        <div className="dash-empty">
          <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--dash-text)" }}>Leadership only</div>
          Settings is visible to leadership accounts. Switch to Avery Hollis or Jordan Park from the user menu to preview it.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="dash-page-head">
        <div>
          <h1>Settings</h1>
          <div className="dash-sub">Manage team members, roles, and workspace preferences</div>
        </div>
      </div>

      <div className="dash-tabs">
        <button className={tab === "team" ? "active" : ""} onClick={() => setTab("team")}>Team <span className="dash-muted" style={{ marginLeft: 6 }}>{team.length}</span></button>
        <button className={tab === "workspace" ? "active" : ""} onClick={() => setTab("workspace")}>Workspace</button>
        <button className={tab === "billing" ? "active" : ""} onClick={() => setTab("billing")}>Billing</button>
        <button className={tab === "integrations" ? "active" : ""} onClick={() => setTab("integrations")}>Integrations</button>
      </div>

      {tab === "team" && (
        <div className="dash-card" style={{ overflowX: "auto" }}>
          <div className="dash-card-head">
            <div>
              <h3>Team members</h3>
              <div className="dash-muted" style={{ fontSize: 12, marginTop: 4 }}>Anyone with an <strong>@spearcrestdigital.com</strong> email can be invited.</div>
            </div>
            <button className="dash-btn dash-btn-accent" onClick={() => setShowInvite(true)}><DashIcon.plus width={14} height={14} />Invite teammate</button>
          </div>
          <table className="dash-table">
            <thead>
              <tr><th>Name</th><th>Email</th><th>Role</th><th>Tier</th><th>Joined</th><th>Clients</th><th /></tr>
            </thead>
            <tbody>
              {team.map((m) => {
                const clientsAsOwner = clients.filter((c) => c.owner === m.id).length;
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="dash-client-cell">
                        <Avatar user={m} />
                        <div><div className="dash-name">{m.name}{m.id === currentUser.id && <span className="dash-pill dash-pill-purple" style={{ marginLeft: 6 }}>You</span>}</div></div>
                      </div>
                    </td>
                    <td className="dash-muted" style={{ fontSize: 13 }}>{m.email}</td>
                    <td style={{ fontSize: 13 }}>{m.role}</td>
                    <td><span className={`dash-pill ${m.tier === "leadership" ? "dash-pill-purple" : ""}`}>{m.tier === "leadership" ? "Leadership" : "Employee"}</span></td>
                    <td className="dash-muted" style={{ fontSize: 13 }}>{fmtDate(m.joined)}</td>
                    <td className="dash-muted" style={{ fontSize: 13 }}>{clientsAsOwner}</td>
                    <td><button className="dash-btn dash-btn-ghost dash-btn-sm"><DashIcon.more width={14} height={14} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {tab === "workspace" && (
        <div className="dash-card">
          <div className="dash-card-head"><h3>Workspace</h3></div>
          <div className="dash-card-pad" style={{ maxWidth: 480 }}>
            <div className="dash-field"><label>Agency name</label><input defaultValue="Spear Crest Digital" /></div>
            <div className="dash-field"><label>Allowed email domain</label><input defaultValue="spearcrestdigital.com" /></div>
            <div className="dash-field">
              <label>Default timezone</label>
              <select defaultValue="America/Denver">
                <option>America/New_York</option>
                <option>America/Chicago</option>
                <option>America/Denver</option>
                <option>America/Los_Angeles</option>
              </select>
            </div>
            <button className="dash-btn dash-btn-primary" style={{ marginTop: 16 }}>Save changes</button>
          </div>
        </div>
      )}

      {tab === "billing" && (
        <div className="dash-card">
          <div className="dash-card-head"><h3>Plan &amp; billing</h3></div>
          <div className="dash-card-pad">
            <div className="dash-row" style={{ gap: 24, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div className="dash-muted" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Current plan</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>Team · $99/mo</div>
                <div className="dash-muted" style={{ fontSize: 13, marginTop: 4 }}>Up to 15 teammates · unlimited clients</div>
              </div>
              <button className="dash-btn">Manage plan</button>
            </div>
          </div>
        </div>
      )}

      {tab === "integrations" && (
        <div className="dash-card">
          <div className="dash-card-head"><h3>Integrations</h3></div>
          <div className="dash-integ-grid">
            {INTEGRATIONS.map((i) => (
              <div key={i.name} className="dash-integ-card">
                <div style={{ fontWeight: 600 }}>{i.name}</div>
                <div className="dash-muted" style={{ fontSize: 12.5, marginTop: 4 }}>{i.desc}</div>
                <button className={`dash-btn dash-btn-sm ${i.status === "Connected" ? "" : "dash-btn-accent"}`} style={{ marginTop: 12 }}>{i.status}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showInvite && <InviteModal onClose={() => setShowInvite(false)} />}
    </div>
  );
}
