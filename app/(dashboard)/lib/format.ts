import { team, clients, type Client, type TeamMember } from "./data";

export function userById(id: string): TeamMember | undefined {
  return team.find((t) => t.id === id);
}

export function clientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

export function fmtMoney(n: number, opts: { sign?: boolean } = {}): string {
  const { sign = false } = opts;
  const sgn = sign && n > 0 ? "+" : "";
  return sgn + "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
  );
}
