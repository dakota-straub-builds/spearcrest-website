"use client";
import { useState } from "react";
import { DashIcon } from "./icons";

const ROLES = ["SEO Specialist", "GBP Manager", "Developer", "Google Ads Specialist", "Account Lead", "Designer", "Founder"];

export default function InviteModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [tier, setTier] = useState<"leadership" | "employee">("employee");
  const [role, setRole] = useState(ROLES[0]);
  const validDomain = email.endsWith("@spearcrestdigital.com");

  return (
    <div className="dash-modal-backdrop" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("dash-modal-backdrop")) onClose(); }}>
      <div className="dash-modal" style={{ maxWidth: 480 }}>
        <div className="dash-modal-head">
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>Invite a teammate</h2>
          <button className="dash-iconbtn" onClick={onClose}><DashIcon.x width={18} height={18} /></button>
        </div>
        <div className="dash-modal-body">
          <div className="dash-field">
            <label>Work email *</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@spearcrestdigital.com" />
            {email && !validDomain && <div style={{ color: "var(--dash-risk)", fontSize: 12, marginTop: 6 }}>Must be a @spearcrestdigital.com address.</div>}
          </div>
          <div className="dash-field">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              {ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div className="dash-field">
            <label>Tier</label>
            <div className="dash-check-row">
              <label className={`dash-check-card dash-check-card-slim ${tier === "leadership" ? "on" : ""}`}>
                <input type="radio" checked={tier === "leadership"} onChange={() => setTier("leadership")} />
                <div>
                  <div style={{ fontWeight: 600 }}>Leadership</div>
                  <div className="dash-muted" style={{ fontSize: 12, marginTop: 2 }}>Sees revenue, all clients, can invite teammates and onboard clients.</div>
                </div>
              </label>
              <label className={`dash-check-card dash-check-card-slim ${tier === "employee" ? "on" : ""}`}>
                <input type="radio" checked={tier === "employee"} onChange={() => setTier("employee")} />
                <div>
                  <div style={{ fontWeight: 600 }}>Employee</div>
                  <div className="dash-muted" style={{ fontSize: 12, marginTop: 2 }}>Sees only assigned clients. Cannot see revenue or team settings.</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="dash-modal-foot">
          <div style={{ flex: 1 }} />
          <button className="dash-btn dash-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="dash-btn dash-btn-accent" disabled={!validDomain} onClick={onClose}>Send invite</button>
        </div>
      </div>
    </div>
  );
}
