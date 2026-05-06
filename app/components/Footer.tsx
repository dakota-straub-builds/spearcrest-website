import { Icon } from "./icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-mega">Let&rsquo;s<span className="accent-dot" />compound.</div>
        <div className="footer-cols">
          <div className="footer-brand">
            <div className="name">
              <img src="/spearcrest-logo.png" alt="" />
              SpearCrest Digital
            </div>
            <p>A small Louisville-based team running SEO, paid, and local presence for service businesses across the South & Midwest.</p>
            <a href="#audit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
              Get a free audit<span className="arrow"><Icon.arrowUR /></span>
            </a>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Targeted SEO</a></li>
              <li><a href="#services">Google Ads</a></li>
              <li><a href="#services">Business Profile</a></li>
              <li><a href="#services">Lead Tracking</a></li>
              <li><a href="#services">Reporting</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Industries</h5>
            <ul>
              <li><a href="#industries">Junk Removal</a></li>
              <li><a href="#industries">Dumpster Rental</a></li>
              <li><a href="#industries">Restoration</a></li>
              <li><a href="#industries">Roofing</a></li>
              <li><a href="#industries">Landscaping</a></li>
              <li><a href="#industries">Law Firms</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#process">How we work</a></li>
              <li><a href="#team">Meet the team</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="mailto:spearcrestdigital@gmail.com">spearcrestdigital@gmail.com</a></li>
              <li><a href="tel:+15023058770">(502) 305-8770</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} SpearCrest Digital — Louisville, KY</div>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
