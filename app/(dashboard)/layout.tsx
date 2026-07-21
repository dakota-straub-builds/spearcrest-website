import type { Metadata } from "next";
import "./dashboard.css";
import { DashboardProvider } from "./components/DashboardContext";
import Topbar from "./components/Topbar";

export const metadata: Metadata = {
  title: "Spear Crest Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="dash-root">
        <div className="dash-shell">
          <Topbar />
          <div className="dash-demo-banner">
            <strong>Demo:</strong> switch the logged-in user from the top-right avatar to see how the dashboard changes for{" "}
            <strong>Leadership</strong> vs <strong>Employee</strong> roles. Data shown is sample content only.
          </div>
          <main className="dash-main">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
}
