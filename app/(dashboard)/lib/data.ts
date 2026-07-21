// Mock data for the Spear Crest team dashboard. UI prototype only — no backend.

export type Tier = "leadership" | "employee";
export type ClientStatus = "Active" | "Onboarding" | "Paused" | "Churned";
export type ClientHealth = "good" | "watch" | "at-risk";

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  role: string;
  tier: Tier;
  email: string;
  color: string;
  joined: string;
};

export type Client = {
  id: string;
  name: string;
  industry: string;
  logo: string;
  logoColor: string;
  status: ClientStatus;
  health: ClientHealth;
  owner: string;
  mrr: number;
  contractStart: string;
  renewal: string;
  services: string[];
  contact: { name: string; email: string; phone: string };
  location: string;
  website: string;
  lastTouch: string;
  notes: { date: string; author: string; text: string }[];
};

export type Update = {
  id: string;
  clientId: string;
  authorId: string;
  service: string;
  date: string;
  title: string;
  body: string;
  tag: string;
};

export const team: TeamMember[] = [
  { id: "u1", name: "Avery Hollis", initials: "AH", role: "Account Lead", tier: "leadership", email: "avery@spearcrestdigital.com", color: "#4a1ef5", joined: "2022-03-14" },
  { id: "u6", name: "Jordan Park", initials: "JP", role: "Founder", tier: "leadership", email: "jordan@spearcrestdigital.com", color: "#0a0a23", joined: "2021-09-01" },
  { id: "u2", name: "Marcus Lin", initials: "ML", role: "SEO Specialist", tier: "employee", email: "marcus@spearcrestdigital.com", color: "#1a8f6a", joined: "2023-01-20" },
  { id: "u3", name: "Priya Shah", initials: "PS", role: "GBP Manager", tier: "employee", email: "priya@spearcrestdigital.com", color: "#7a4dff", joined: "2023-06-12" },
  { id: "u4", name: "Diego Reyes", initials: "DR", role: "Developer", tier: "employee", email: "diego@spearcrestdigital.com", color: "#0284c7", joined: "2024-02-05" },
  { id: "u5", name: "Sam Whitlock", initials: "SW", role: "Google Ads Specialist", tier: "employee", email: "sam@spearcrestdigital.com", color: "#c2410c", joined: "2024-08-19" },
];

export const clients: Client[] = [
  {
    id: "c1", name: "Harborline Dental", industry: "Healthcare", logo: "HD", logoColor: "#0ea5e9",
    status: "Active", health: "good", owner: "u1", mrr: 3400,
    contractStart: "2024-08-12", renewal: "2025-08-12", services: ["Web Design", "SEO", "GBP"],
    contact: { name: "Dr. Lena Park", email: "lena@harborlinedental.com", phone: "(415) 555-0142" },
    location: "San Francisco, CA", website: "harborlinedental.com", lastTouch: "2 days ago",
    notes: [
      { date: "2025-05-04", author: "u1", text: "Lena confirmed she wants to expand to 2 more practice locations next quarter. Potential to upsell GBP across all three." },
      { date: "2025-04-22", author: "u2", text: "Ranking #2 for 'pediatric dentist financial district'. Pushed for #1 with new content cluster on family dental." },
      { date: "2025-04-10", author: "u1", text: "Quarterly review went well. Lena loves the new appointment booking flow." },
    ],
  },
  {
    id: "c2", name: "Pinecrest Roofing Co.", industry: "Home Services", logo: "PR", logoColor: "#1a8f6a",
    status: "Active", health: "good", owner: "u6", mrr: 5200,
    contractStart: "2023-11-01", renewal: "2025-11-01", services: ["SEO", "Google Ads", "GBP"],
    contact: { name: "Travis McCue", email: "travis@pinecrestroof.com", phone: "(720) 555-0188" },
    location: "Denver, CO", website: "pinecrestroof.com", lastTouch: "Yesterday",
    notes: [
      { date: "2025-05-09", author: "u5", text: "Ad spend up 12% MoM. CPL dropped to $38, well under target of $55." },
      { date: "2025-05-01", author: "u3", text: "GBP profile got 4 new 5-star reviews this week. Responded to all." },
    ],
  },
  {
    id: "c3", name: "Olive & Oak Bistro", industry: "Restaurant", logo: "OO", logoColor: "#c2410c",
    status: "Active", health: "watch", owner: "u1", mrr: 1800,
    contractStart: "2024-02-14", renewal: "2025-06-14", services: ["GBP", "SEO"],
    contact: { name: "Marisol Vega", email: "marisol@oliveoakbistro.com", phone: "(512) 555-0199" },
    location: "Austin, TX", website: "oliveoakbistro.com", lastTouch: "6 days ago",
    notes: [
      { date: "2025-05-06", author: "u3", text: "Marisol mentioned slow Tuesdays. Suggested running a GBP post + offer." },
      { date: "2025-04-28", author: "u1", text: "Renewal coming up in June. Need to schedule call by end of May." },
    ],
  },
  {
    id: "c4", name: "Vance & Mora Law", industry: "Legal", logo: "VM", logoColor: "#0a0a23",
    status: "Active", health: "good", owner: "u6", mrr: 6800,
    contractStart: "2023-06-20", renewal: "2026-06-20", services: ["Web Design", "SEO", "Google Ads"],
    contact: { name: "Eleanor Mora", email: "emora@vancemora.legal", phone: "(212) 555-0166" },
    location: "New York, NY", website: "vancemora.legal", lastTouch: "Today",
    notes: [
      { date: "2025-05-12", author: "u4", text: "Pushed new practice-area pages to production. Page speed at 96 on mobile." },
      { date: "2025-05-08", author: "u2", text: "Featured snippet won for 'personal injury attorney NYC'." },
    ],
  },
  {
    id: "c5", name: "Northshore Pediatrics", industry: "Healthcare", logo: "NP", logoColor: "#7a4dff",
    status: "Onboarding", health: "good", owner: "u1", mrr: 2900,
    contractStart: "2025-05-01", renewal: "2026-05-01", services: ["Web Design", "GBP"],
    contact: { name: "Dr. Kavi Mehta", email: "kavi@northshorepeds.com", phone: "(847) 555-0123" },
    location: "Evanston, IL", website: "northshorepeds.com", lastTouch: "3 days ago",
    notes: [
      { date: "2025-05-09", author: "u4", text: "Wireframes approved. Moving to design phase next Mon." },
      { date: "2025-05-02", author: "u1", text: "Kickoff call complete. Brand assets received." },
    ],
  },
  {
    id: "c6", name: "Cascade HVAC", industry: "Home Services", logo: "CH", logoColor: "#0284c7",
    status: "Active", health: "good", owner: "u6", mrr: 4100,
    contractStart: "2024-04-08", renewal: "2026-04-08", services: ["SEO", "Google Ads"],
    contact: { name: "Brian Holcomb", email: "brian@cascadehvac.com", phone: "(503) 555-0134" },
    location: "Portland, OR", website: "cascadehvac.com", lastTouch: "4 days ago",
    notes: [
      { date: "2025-05-08", author: "u5", text: "Summer AC campaign launched. Budget bumped to $4k/mo per Brian's req." },
    ],
  },
  {
    id: "c7", name: "Loomis Veterinary", industry: "Healthcare", logo: "LV", logoColor: "#1a8f6a",
    status: "Active", health: "at-risk", owner: "u1", mrr: 2200,
    contractStart: "2024-09-15", renewal: "2025-09-15", services: ["GBP", "Web Design"],
    contact: { name: "Dr. Anna Loomis", email: "anna@loomisvet.com", phone: "(916) 555-0156" },
    location: "Sacramento, CA", website: "loomisvet.com", lastTouch: "11 days ago",
    notes: [
      { date: "2025-05-01", author: "u1", text: "Anna mentioned cash flow concerns. May want to scale back. Need check-in call." },
    ],
  },
  {
    id: "c8", name: "Brightside Landscaping", industry: "Home Services", logo: "BL", logoColor: "#16a34a",
    status: "Active", health: "good", owner: "u6", mrr: 3600,
    contractStart: "2024-01-22", renewal: "2026-01-22", services: ["SEO", "GBP", "Google Ads"],
    contact: { name: "Roy Castellano", email: "roy@brightsidelawn.com", phone: "(602) 555-0177" },
    location: "Phoenix, AZ", website: "brightsidelawn.com", lastTouch: "Yesterday",
    notes: [
      { date: "2025-05-11", author: "u3", text: "Posted seasonal content + 3 new photos to GBP. Engagement up 40% WoW." },
    ],
  },
];

export const updates: Update[] = [
  { id: "p1", clientId: "c4", authorId: "u4", service: "Web Design", date: "2025-05-12T10:24:00", title: "Practice-area pages shipped", body: "Pushed 4 new practice-area pages (PI, Family, Estate, Criminal) to production. Page speed at 96 on mobile, 99 on desktop. All forms wired to CRM.", tag: "Shipped" },
  { id: "p2", clientId: "c2", authorId: "u5", service: "Google Ads", date: "2025-05-11T16:08:00", title: "May ad spend tracking under target CPL", body: "Cost per lead dropped to $38 vs target of $55. Spend up 12% MoM. Considering allocating extra $600 to top-performing emergency repair campaign.", tag: "On track" },
  { id: "p3", clientId: "c8", authorId: "u3", service: "GBP", date: "2025-05-11T09:42:00", title: "Seasonal GBP refresh — Brightside", body: "Posted spring/summer service content, added 3 fresh project photos, refreshed service categories. Engagement +40% WoW already.", tag: "Done" },
  { id: "p4", clientId: "c1", authorId: "u2", service: "SEO", date: "2025-05-10T14:11:00", title: "New content cluster targeting 'family dental'", body: "Drafted hub + 4 spoke pages. Currently #2 for primary keyword, going after #1 with topical depth. Internal linking pass scheduled for Wed.", tag: "In progress" },
  { id: "p5", clientId: "c5", authorId: "u4", service: "Web Design", date: "2025-05-09T11:30:00", title: "Northshore Pediatrics — wireframes approved", body: "All 7 page types signed off. Moving to high-fi design Monday. Aiming for dev handoff by 5/26 and launch 6/16.", tag: "Milestone" },
  { id: "p6", clientId: "c6", authorId: "u5", service: "Google Ads", date: "2025-05-08T13:55:00", title: "Summer AC campaign live", body: "Brian approved $4k/mo budget bump. New ad groups for 'AC repair' + 'AC install' running geo-targeted to Portland metro. First leads coming in.", tag: "Launched" },
  { id: "p7", clientId: "c3", authorId: "u3", service: "GBP", date: "2025-05-06T15:20:00", title: "Slow Tuesday strategy for Olive & Oak", body: "Setting up recurring GBP offer post (Tue prix-fixe) + matched IG cross-post. Will measure dine-in volume change over 4 weeks.", tag: "Plan" },
  { id: "p8", clientId: "c7", authorId: "u1", service: "Account", date: "2025-05-01T17:10:00", title: "Loomis Vet — at-risk check-in needed", body: "Anna flagged cash flow concerns. Schedule a call this week to talk renewal options. Possible scope reduction vs. pause.", tag: "Risk" },
];

export const monthlyRevenue = [
  { month: "Dec", revenue: 24800, costs: 9200 },
  { month: "Jan", revenue: 26100, costs: 9800 },
  { month: "Feb", revenue: 27400, costs: 10200 },
  { month: "Mar", revenue: 28900, costs: 10400 },
  { month: "Apr", revenue: 29700, costs: 10900 },
  { month: "May", revenue: 30000, costs: 11100 }, // projected
];

export const serviceBreakdown = [
  { name: "SEO", value: 11200, color: "#4a1ef5" },
  { name: "Web Design", value: 8400, color: "#0a0a23" },
  { name: "Google Ads", value: 6800, color: "#7a4dff" },
  { name: "GBP Mgmt", value: 3600, color: "#c4a3ff" },
];

// "Today" for the purposes of this static prototype's date math.
export const TODAY = "2025-05-12";
