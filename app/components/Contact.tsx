"use client";
import { useState } from "react";
import { Icon } from "./icons";
import { INDUSTRIES } from "./Industries";
import { sendContact } from "../actions";

const INTERESTS = ["SEO", "Google Ads", "GBP", "Lead Tracking", "Full Retainer"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", business: "", industry: "Junk Removal", message: "", interests: ["SEO"] as string[] });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (v: string) => setForm((f) => ({ ...f, interests: f.interests.includes(v) ? f.interests.filter((i) => i !== v) : [...f.interests, v] }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string,string> = {};
    if (!form.name.trim()) errs.name = "What should we call you?";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "A real email, please.";
    if (!form.business.trim()) errs.business = "Your business name";
    if (form.message.trim().length < 10) errs.message = "Tell us a little more (10+ chars).";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setServerError(null);
    const res = await sendContact(form);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setServerError(res.error || "Something went wrong. Please email us directly.");
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div>
              <span className="eyebrow">Say hi</span>
              <div className="lead">Let&rsquo;s chat about what&rsquo;s working — <em>and what isn&rsquo;t.</em></div>
            </div>
            <div className="contact-channels">
              <a href="mailto:spearcrestdigital@gmail.com" className="contact-channel">
                <span className="contact-channel-icon"><Icon.mail /></span>
                <div><div className="label">Email</div><div className="value">spearcrestdigital@gmail.com</div></div>
              </a>
              <a href="tel:+15023058770" className="contact-channel">
                <span className="contact-channel-icon"><Icon.phone /></span>
                <div><div className="label">Phone</div><div className="value">(502) 305-8770</div></div>
              </a>
              <a href="https://calendly.com/dakota-spearcrestdigital/30min?month=2026-05" target="_blank" rel="noopener noreferrer" className="contact-channel">
                <span className="contact-channel-icon"><Icon.calendar /></span>
                <div><div className="label">Book a call</div><div className="value">30-min discovery slot</div></div>
              </a>
            </div>
            <div style={{ padding: "18px 20px", borderRadius: "var(--radius)", background: "var(--paper-2)", border: "1px solid var(--line)" }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Office</div>
              <div style={{ fontFamily: "var(--font-display-grotesk)", fontSize: 17, fontWeight: 500 }}>Louisville, Kentucky</div>
              <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>Serving the South & Midwest, fully remote-friendly.</div>
            </div>
          </div>
          <form className="contact-form-card" onSubmit={submit} noValidate>
            {sent ? (
              <div className="form-success">
                <div className="check">✓</div>
                <h3>Got it — talk soon.</h3>
                <p>We&rsquo;ll reach out within one business day with next steps.</p>
              </div>
            ) : (
              <>
                <div className="field-row">
                  <div className="field"><label>Your name</label><input value={form.name} onChange={(e)=>update("name", e.target.value)} placeholder="Jamie Chen" />{errors.name && <div className="field-error">{errors.name}</div>}</div>
                  <div className="field"><label>Email</label><input type="email" value={form.email} onChange={(e)=>update("email", e.target.value)} placeholder="jamie@yourshop.com" />{errors.email && <div className="field-error">{errors.email}</div>}</div>
                </div>
                <div className="field-row">
                  <div className="field"><label>Business name</label><input value={form.business} onChange={(e)=>update("business", e.target.value)} placeholder="Bluegrass Hauling Co." />{errors.business && <div className="field-error">{errors.business}</div>}</div>
                  <div className="field"><label>Industry</label><select value={form.industry} onChange={(e)=>update("industry", e.target.value)}>{INDUSTRIES.map((i)=><option key={i.key}>{i.name}</option>)}<option>Other</option></select></div>
                </div>
                <div className="field"><label>Interested in</label><div className="chip-row">{INTERESTS.map((i)=><button type="button" key={i} className={"chip"+(form.interests.includes(i)?" active":"")} onClick={()=>toggle(i)}>{i}</button>)}</div></div>
                <div className="field"><label>What are you trying to grow?</label><textarea value={form.message} onChange={(e)=>update("message", e.target.value)} placeholder="A few sentences about your goals, what's working, what isn't…" />{errors.message && <div className="field-error">{errors.message}</div>}</div>
                <button type="submit" disabled={submitting} className="btn btn-dark" style={{ width: "100%", justifyContent: "center", opacity: submitting ? 0.6 : 1 }}>
                  {submitting ? "Sending…" : "Send & get my audit"}
                  <span className="arrow"><Icon.arrowUR /></span>
                </button>
                {serverError && <p style={{ color: "#c0252a", fontSize: 13, marginTop: 14, textAlign: "center" }}>{serverError}</p>}
                <p style={{ fontSize: 12, color: "var(--muted-2)", marginTop: 14, textAlign: "center" }}>No spam. We&rsquo;ll reply within one business day.</p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
