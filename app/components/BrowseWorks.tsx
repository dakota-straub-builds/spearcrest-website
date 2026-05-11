const WORKS = [
  { title: "Route 11 Roll Offs — Newville, PA", src: "/route-11.png" },
  { title: "LOZ Dumpster Drop — Osage Beach, MO", src: "/loz-dumpster.png" },
  { title: "Roling Dumpsters — Bettendorf, IA", src: "/roling-dumpsters.png" },
  { title: "Dump-It Dumpster Rentals — NH", src: "/dump-it.png" },
  { title: "Sadoski Dumpster Rentals — Whitney, TX", src: "/sadoski-dumpster.png" },
];

export default function BrowseWorks() {
  return (
    <section id="works" className="browse-works">
      <div className="container">
        <div className="browse-works-header">"
          <div>
            <span className="browse-works-tag">WORKS</span>
            <h2 className="browse-works-title">
              Browse latest<br />works
            </h2>
          </div>
          <a href="#contact" className="browse-works-cta">View all works</a>
        </div>

        <div className="works-grid">
          {WORKS.map((w) => (
            <div key={w.src} className="work-card">
              <div className="work-card-header">
                <span className="work-card-title">{w.title}</span>
                <div className="work-card-dots">
                  <span /><span /><span />
                </div>
              </div>
              <div className="work-card-image">
                <img src={w.src} alt={w.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}