"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "../(dashboard)/dashboard.css";
import { DashIcon } from "../(dashboard)/components/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("avery@spearcrestdigital.com");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    router.push("/dashboard");
  };

  return (
    <div className="dash-root">
      <div className="dash-login">
        <div className="dash-login-form-side">
          <form className="dash-login-card" onSubmit={submit}>
            <div className="dash-row" style={{ gap: 12, marginBottom: 28 }}>
              <img src="/spearcrest-logo.png" alt="Spear Crest" style={{ width: 36, height: 36, borderRadius: 8 }} />
              <div style={{ fontWeight: 700, letterSpacing: "-0.01em" }}>Spear Crest Digital</div>
            </div>
            <h1>Welcome back.</h1>
            <p className="dash-lead">Sign in with your work email to access the team dashboard.</p>

            <div className="dash-field">
              <label>Work email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@spearcrestdigital.com" />
            </div>
            <div className="dash-field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" />
            </div>

            <button className="dash-btn dash-btn-primary" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
              {!busy && <DashIcon.arrow width={14} height={14} />}
            </button>

            <div className="dash-row" style={{ gap: 12, marginTop: 16, justifyContent: "space-between", fontSize: 13 }}>
              <a href="#" className="dash-muted">Use SSO instead</a>
              <a href="#" className="dash-muted">Forgot password?</a>
            </div>

            <div style={{ marginTop: 32, fontSize: 12, color: "var(--dash-text-faint)" }}>
              Only <strong>@spearcrestdigital.com</strong> accounts may access this dashboard.
            </div>
          </form>
        </div>

        <aside className="dash-login-side">
          <div className="dash-logo-mark"><img src="/spearcrest-logo.png" alt="" /></div>
          <div>
            <h2>Run the agency.<br />Not the spreadsheet.</h2>
            <p className="dash-quote">Clients, project updates, monthly budget — one place for the whole team.</p>
          </div>
          <div className="dash-foot">Internal preview · UI prototype</div>
        </aside>
      </div>
    </div>
  );
}
