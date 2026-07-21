"use client";
import { useEffect, useRef, useState } from "react";
import { team } from "../lib/data";
import { useDashboard } from "./DashboardContext";
import { Avatar } from "./ui";
import { DashIcon } from "./icons";

export default function UserMenu() {
  const { currentUser, switchUser } = useDashboard();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const leadership = team.filter((u) => u.tier === "leadership");
  const employees = team.filter((u) => u.tier === "employee");

  return (
    <div className="dash-user-menu-wrap" ref={ref}>
      <div className={`dash-user-menu-trigger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <Avatar user={currentUser} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{currentUser.name}</div>
          <div className="dash-muted" style={{ fontSize: 11 }}>
            <span className={`dash-pill ${currentUser.tier === "leadership" ? "dash-pill-purple" : ""}`} style={{ padding: "1px 6px", fontSize: 10 }}>
              {currentUser.tier === "leadership" ? "Leadership" : "Employee"}
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div className="dash-user-menu">
          <div className="dash-user-menu-head">
            <div className="dash-row" style={{ gap: 12 }}>
              <Avatar user={currentUser} size="lg" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{currentUser.name}</div>
                <div className="dash-muted" style={{ fontSize: 12 }}>{currentUser.email}</div>
              </div>
            </div>
          </div>
          <div className="dash-user-menu-section">
            <div className="dash-lbl">Switch user — Leadership</div>
            {leadership.map((u) => (
              <div key={u.id} className="dash-user-menu-item" onClick={() => { switchUser(u.id); setOpen(false); }}>
                <Avatar user={u} />
                <div>
                  <div style={{ fontSize: 13 }}>{u.name}</div>
                  <div className="dash-muted" style={{ fontSize: 11 }}>{u.role}</div>
                </div>
                {u.id === currentUser.id && <span className="dash-check"><DashIcon.check width={14} height={14} /></span>}
              </div>
            ))}
            <div className="dash-user-menu-divider" />
            <div className="dash-lbl">Switch user — Employee</div>
            {employees.map((u) => (
              <div key={u.id} className="dash-user-menu-item" onClick={() => { switchUser(u.id); setOpen(false); }}>
                <Avatar user={u} />
                <div>
                  <div style={{ fontSize: 13 }}>{u.name}</div>
                  <div className="dash-muted" style={{ fontSize: 11 }}>{u.role}</div>
                </div>
                {u.id === currentUser.id && <span className="dash-check"><DashIcon.check width={14} height={14} /></span>}
              </div>
            ))}
            <div className="dash-user-menu-divider" />
            <div className="dash-user-menu-item">
              <a href="/login">Sign out</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
