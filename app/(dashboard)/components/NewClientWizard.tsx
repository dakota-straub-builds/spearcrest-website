"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { team, type Client } from "../lib/data";
import { fmtMoney, userById } from "../lib/format";
import { useDashboard } from "./DashboardContext";
import { DashIcon } from "./icons";

const SERVICE_OPTIONS = ["SEO", "Web Design", "Google Ads", "GBP"];
const STEPS = ["Basics", "Services & contract", "Primary contact", "Team assignment", "Kickoff checklist", "Review"];

type FormState = {
  name: string;
  industry: string;
  location: string;
  website: string;
  services: string[];
  mrr: string;
  contractStart: string;
  contractMonths: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  owner: string;
  assignments: Record<string, string>;
  checklist: Record<string, boolean>;
};

const DEFAULT_FORM: FormState = {
  name: "", industry: "", location: "", website: "",
  services: [], mrr: "", contractStart: "", contractMonths: 12,
  contactName: "", contactEmail: "", contactPhone: "",
  owner: "u1", assignments: {},
  checklist: {
    "Kickoff call scheduled": false,
    "Brand assets received": false,
    "Google Analytics access granted": false,
    "Google Search Console access granted": false,
    "GBP ownership transferred": false,
    "Hosting & DNS access": false,
  },
};

export default function NewClientWizard({ onClose }: { onClose: () => void }) {
  const { addClient } = useDashboard();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);

  const set = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));
  const toggleService = (s: string) =>
    set({
      services: form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s],
      assignments: { ...form.assignments, [s]: form.assignments[s] || "" },
    });

  const total = STEPS.length;
  const canAdvance = (() => {
    if (step === 0) return !!(form.name && form.industry && form.location);
    if (step === 1) return form.services.length > 0 && !!form.mrr && !!form.contractStart;
    if (step === 2) return !!(form.contactName && form.contactEmail);
    if (step === 3) return !!form.owner && form.services.every((s) => form.assignments[s]);
    return true;
  })();

  const submit = () => {
    const id = "c" + Math.random().toString(36).slice(2, 7);
    const client: Client = {
      id,
      name: form.name,
      industry: form.industry,
      logo: form.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      logoColor: "#7a4dff",
      status: "Onboarding",
      health: "good",
      owner: form.owner,
      mrr: Number(form.mrr) || 0,
      contractStart: form.contractStart,
      renewal: form.contractStart,
      services: form.services,
      contact: { name: form.contactName, email: form.contactEmail, phone: form.contactPhone },
      location: form.location,
      website: form.website,
      lastTouch: "Just now",
      notes: [{ date: new Date().toISOString().slice(0, 10), author: form.owner, text: "Client onboarded via dashboard wizard." }],
    };
    addClient(client);
    onClose();
    router.push(`/clients/${id}`);
  };

  return (
    <div className="dash-modal-backdrop" onClick={(e) => { if ((e.target as HTMLElement).classList.contains("dash-modal-backdrop")) onClose(); }}>
      <div className="dash-modal dash-modal-wizard">
        <div className="dash-modal-head">
          <div>
            <div className="dash-muted" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              New client · step {step + 1} of {total}
            </div>
            <h2 style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{STEPS[step]}</h2>
          </div>
          <button className="dash-iconbtn" onClick={onClose} title="Close"><DashIcon.x width={18} height={18} /></button>
        </div>

        <div className="dash-wizard-progress">
          {STEPS.map((s, i) => (
            <div key={s} className={`dash-wp-step ${i < step ? "done" : ""} ${i === step ? "current" : ""}`}>
              <span className="dash-wp-dot">{i < step ? "✓" : i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="dash-modal-body">
          {step === 0 && (
            <div className="dash-form-grid">
              <div className="dash-field"><label>Company name *</label><input value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Acme Roofing Co." /></div>
              <div className="dash-field">
                <label>Industry *</label>
                <select value={form.industry} onChange={(e) => set({ industry: e.target.value })}>
                  <option value="">Choose…</option>
                  {["Healthcare", "Home Services", "Restaurant", "Legal", "Retail", "Real Estate", "Professional Services", "Other"].map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div className="dash-field"><label>Location *</label><input value={form.location} onChange={(e) => set({ location: e.target.value })} placeholder="Austin, TX" /></div>
              <div className="dash-field"><label>Website</label><input value={form.website} onChange={(e) => set({ website: e.target.value })} placeholder="acmeroofing.com" /></div>
            </div>
          )}

          {step === 1 && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 600 }}>Services *</label>
              <div className="dash-checks" style={{ marginTop: 8 }}>
                {SERVICE_OPTIONS.map((s) => (
                  <label key={s} className={`dash-check-card ${form.services.includes(s) ? "on" : ""}`}>
                    <input type="checkbox" checked={form.services.includes(s)} onChange={() => toggleService(s)} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{s}</div>
                      <div className="dash-muted" style={{ fontSize: 12, marginTop: 2 }}>
                        {s === "SEO" ? "Ranking, content, links" : s === "Web Design" ? "Build & maintain site" : s === "Google Ads" ? "Paid search & display" : "Google Business Profile mgmt"}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
              <div className="dash-form-grid" style={{ marginTop: 20 }}>
                <div className="dash-field"><label>Monthly retainer (USD) *</label><input value={form.mrr} onChange={(e) => set({ mrr: e.target.value.replace(/[^0-9]/g, "") })} placeholder="3500" /></div>
                <div className="dash-field"><label>Contract start *</label><input type="date" value={form.contractStart} onChange={(e) => set({ contractStart: e.target.value })} /></div>
                <div className="dash-field">
                  <label>Contract length (months)</label>
                  <select value={form.contractMonths} onChange={(e) => set({ contractMonths: Number(e.target.value) })}>
                    {[3, 6, 12, 18, 24].map((m) => <option key={m} value={m}>{m} months</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="dash-form-grid">
              <div className="dash-field"><label>Contact name *</label><input value={form.contactName} onChange={(e) => set({ contactName: e.target.value })} placeholder="Jane Doe" /></div>
              <div className="dash-field"><label>Email *</label><input type="email" value={form.contactEmail} onChange={(e) => set({ contactEmail: e.target.value })} placeholder="jane@company.com" /></div>
              <div className="dash-field"><label>Phone</label><input value={form.contactPhone} onChange={(e) => set({ contactPhone: e.target.value })} placeholder="(555) 555-0100" /></div>
              <div className="dash-field"><label>Role / title</label><input placeholder="Owner, Marketing Director, etc." /></div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="dash-field">
                <label>Account owner *</label>
                <select value={form.owner} onChange={(e) => set({ owner: e.target.value })}>
                  {team.map((t) => <option key={t.id} value={t.id}>{t.name} — {t.role}</option>)}
                </select>
                <div className="dash-muted" style={{ fontSize: 12, marginTop: 4 }}>The owner is the day-to-day point of contact for this client.</div>
              </div>
              <div className="dash-divider" />
              <label style={{ fontSize: 13, fontWeight: 600 }}>Service leads</label>
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
                {form.services.map((s) => (
                  <div key={s} className="dash-row" style={{ gap: 12, justifyContent: "space-between" }}>
                    <span className="dash-svc-tag" style={{ minWidth: 90, textAlign: "center" }}>{s}</span>
                    <select style={{ flex: 1 }} value={form.assignments[s] || ""} onChange={(e) => set({ assignments: { ...form.assignments, [s]: e.target.value } })}>
                      <option value="">Assign teammate…</option>
                      {team.map((t) => <option key={t.id} value={t.id}>{t.name} — {t.role}</option>)}
                    </select>
                  </div>
                ))}
                {form.services.length === 0 && <div className="dash-muted" style={{ fontSize: 13 }}>Pick services in the previous step to assign teammates.</div>}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="dash-muted" style={{ marginTop: 0, fontSize: 13.5 }}>
                Tasks the team should complete in the first 2 weeks. The client will appear as <strong>Onboarding</strong> until all are checked.
              </p>
              <div className="dash-checklist" style={{ marginTop: 12 }}>
                {Object.entries(form.checklist).map(([k, v]) => (
                  <label key={k} className="dash-checkrow">
                    <input type="checkbox" checked={v} onChange={() => set({ checklist: { ...form.checklist, [k]: !v } })} />
                    <span>{k}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="dash-muted" style={{ marginTop: 0, fontSize: 13.5 }}>Review and confirm. You can edit any field later from the client's detail page.</p>
              <div className="dash-review-grid" style={{ marginTop: 12 }}>
                <div className="dash-review-card">
                  <div className="dash-rc-title">Company</div>
                  <div className="dash-rc-rows">
                    <div><span>Name</span><strong>{form.name}</strong></div>
                    <div><span>Industry</span><strong>{form.industry}</strong></div>
                    <div><span>Location</span><strong>{form.location}</strong></div>
                    <div><span>Website</span><strong>{form.website || "—"}</strong></div>
                  </div>
                </div>
                <div className="dash-review-card">
                  <div className="dash-rc-title">Contract</div>
                  <div className="dash-rc-rows">
                    <div><span>Services</span><strong>{form.services.join(", ") || "—"}</strong></div>
                    <div><span>MRR</span><strong>{form.mrr ? fmtMoney(Number(form.mrr)) : "—"}</strong></div>
                    <div><span>Annual</span><strong>{form.mrr ? fmtMoney(Number(form.mrr) * 12) : "—"}</strong></div>
                    <div><span>Start</span><strong>{form.contractStart || "—"}</strong></div>
                    <div><span>Length</span><strong>{form.contractMonths} months</strong></div>
                  </div>
                </div>
                <div className="dash-review-card">
                  <div className="dash-rc-title">Primary contact</div>
                  <div className="dash-rc-rows">
                    <div><span>Name</span><strong>{form.contactName}</strong></div>
                    <div><span>Email</span><strong>{form.contactEmail}</strong></div>
                    <div><span>Phone</span><strong>{form.contactPhone || "—"}</strong></div>
                  </div>
                </div>
                <div className="dash-review-card">
                  <div className="dash-rc-title">Team</div>
                  <div className="dash-rc-rows">
                    <div><span>Owner</span><strong>{userById(form.owner)?.name}</strong></div>
                    {form.services.map((s) => (
                      <div key={s}><span>{s} lead</span><strong>{userById(form.assignments[s])?.name || "—"}</strong></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dash-modal-foot">
          <button className="dash-btn dash-btn-ghost" onClick={onClose}>Cancel</button>
          <div style={{ flex: 1 }} />
          {step > 0 && <button className="dash-btn" onClick={() => setStep(step - 1)}>Back</button>}
          {step < total - 1 ? (
            <button className="dash-btn dash-btn-accent" disabled={!canAdvance} onClick={() => setStep(step + 1)}>Continue</button>
          ) : (
            <button className="dash-btn dash-btn-accent" onClick={submit}><DashIcon.check width={14} height={14} /> Create client</button>
          )}
        </div>
      </div>
    </div>
  );
}
