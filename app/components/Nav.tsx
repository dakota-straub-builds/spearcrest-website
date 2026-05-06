"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const cls = "nav-wrap" + (scrolled ? " scrolled" : " on-dark");
  const links = [
    { href: "#services", label: "Services" },
    { href: "#industries", label: "Industries" },
    { href: "#process", label: "How we work" },
    { href: "#team", label: "Meet the Team" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={cls}>
      <div className="nav">
        <a href="#top" className="nav-brand">
          <img src="/spearcrest-logo.png" alt="SpearCrest Digital" />
          <span>SpearCrest <span style={{ opacity: 0.6, fontWeight: 500 }}>Digital</span></span>
        </a>
        <nav className="nav-links">
          {links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
        <div className="nav-cta">
          <a href="#audit" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 14 }}>
            Free audit
            <span className="arrow"><Icon.arrowUR /></span>
          </a>
        </div>
      </div>
    </header>
  );
}
