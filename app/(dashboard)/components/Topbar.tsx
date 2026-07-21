"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "./DashboardContext";
import UserMenu from "./UserMenu";
import NewClientWizard from "./NewClientWizard";
import { DashIcon } from "./icons";

const LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: DashIcon.grid, leadOnly: false },
  { href: "/clients", label: "Clients", icon: DashIcon.users, leadOnly: false },
  { href: "/updates", label: "Updates", icon: DashIcon.activity, leadOnly: false },
  { href: "/data", label: "Data", icon: DashIcon.chart, leadOnly: true },
  { href: "/settings", label: "Settings", icon: DashIcon.settings, leadOnly: true },
];

export default function Topbar() {
  const pathname = usePathname();
  const { isLead } = useDashboard();
  const [showWizard, setShowWizard] = useState(false);

  return (
    <header className="dash-topbar">
      <Link href="/dashboard" className="dash-brand">
        <img src="/spearcrest-logo.png" alt="" />
        <span>Spear Crest</span>
      </Link>
      <nav className="dash-topbar-nav">
        {LINKS.filter((l) => !l.leadOnly || isLead).map((l) => {
          const active = pathname === l.href || (l.href === "/clients" && pathname?.startsWith("/clients"));
          const Icon = l.icon;
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              <Icon /> {l.label}
            </Link>
          );
        })}
      </nav>
      <div className="dash-grow" />
      <input className="dash-search" placeholder="Search clients, updates…" />
      {isLead && (
        <button className="dash-btn dash-btn-accent dash-btn-sm" onClick={() => setShowWizard(true)}>
          <DashIcon.plus width={13} height={13} /> New client
        </button>
      )}
      <button className="dash-iconbtn" title="Notifications">
        <DashIcon.bell width={16} height={16} />
        <span className="dash-dot" />
      </button>
      <UserMenu />
      {showWizard && <NewClientWizard onClose={() => setShowWizard(false)} />}
    </header>
  );
}
