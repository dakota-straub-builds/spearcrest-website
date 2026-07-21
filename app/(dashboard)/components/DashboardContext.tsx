"use client";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { team, clients as initialClients, type Client, type TeamMember } from "../lib/data";

type DashboardContextValue = {
  currentUser: TeamMember;
  isLead: boolean;
  switchUser: (id: string) => void;
  clients: Client[];
  addClient: (c: Client) => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState("u1"); // Avery Hollis — leadership default
  const [clients, setClients] = useState<Client[]>(initialClients);

  const currentUser = useMemo(
    () => team.find((t) => t.id === currentUserId) ?? team[0],
    [currentUserId]
  );

  const value: DashboardContextValue = {
    currentUser,
    isLead: currentUser.tier === "leadership",
    switchUser: setCurrentUserId,
    clients,
    addClient: (c) => setClients((prev) => [c, ...prev]),
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
