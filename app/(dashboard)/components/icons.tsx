import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  width: 16, height: 16, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
};

export const DashIcon = {
  grid: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>),
  users: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" /><circle cx="17" cy="6" r="2.5" /><path d="M15.5 11.2c2.6.5 4.5 2.8 4.5 5.5" /></svg>),
  activity: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>),
  chart: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M3 21h18" /><rect x="5" y="11" width="3" height="8" /><rect x="11" y="6" width="3" height="13" /><rect x="17" y="14" width="3" height="5" /></svg>),
  settings: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>),
  bell: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>),
  plus: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M12 5v14" /><path d="M5 12h14" /></svg>),
  arrow: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>),
  arrowLeft: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>),
  mail: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>),
  phone: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.91.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" /></svg>),
  globe: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18" /><path d="M12 3a14 14 0 0 0 0 18" /></svg>),
  map: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>),
  edit: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.12 2.12 0 1 1 3 3L12 15l-4 1 1-4z" /></svg>),
  file: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>),
  calendar: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></svg>),
  check: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="m5 12 5 5 9-11" /></svg>),
  more: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>),
  x: (p: SVGProps<SVGSVGElement>) => (<svg {...base} {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>),
};
