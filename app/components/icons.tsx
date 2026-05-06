import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
};

export const Icon = {
  search: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>),
  pin: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>),
  ads: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2Z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg>),
  heat: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>),
  lead: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 6h18M3 12h12M3 18h6"/><path d="M17 14l4 4-4 4"/></svg>),
  report: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 14l3-3 3 3 4-5"/></svg>),
  truck: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>),
  dumpster: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 8h18l-2 12H5L3 8Z"/><path d="M3 8 5 5h14l2 3"/><path d="M9 12v5M15 12v5"/></svg>),
  drop: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z"/></svg>),
  roof: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 12 12 4l9 8"/><path d="M5 11v9h14v-9"/><path d="M10 20v-5h4v5"/></svg>),
  leaf: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M4 20c0-9 7-16 16-16 0 9-7 16-16 16Z"/><path d="M4 20 14 10"/></svg>),
  scale: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M12 3v18M5 21h14"/><path d="M3 9h6l-3 6-3-6Z"/><path d="M15 9h6l-3 6-3-6Z"/></svg>),
  spark: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>),
  arrow: (p: SVGProps<SVGSVGElement>) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 8h10M9 4l4 4-4 4"/></svg>),
  arrowUR: (p: SVGProps<SVGSVGElement>) => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 11 11 5M6 5h5v5"/></svg>),
  mail: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>),
  phone: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>),
  calendar: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>),
};
