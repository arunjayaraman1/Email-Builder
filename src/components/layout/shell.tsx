"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

const PAGE_TITLES: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard":  { title: "Dashboard", subtitle: "Your campaign overview" },
  "/campaign":   { title: "New Campaign" },
  "/campaigns":  { title: "Campaigns", subtitle: "All your campaigns in one place" },
  "/templates":  { title: "Templates", subtitle: "Browse and preview email templates" },
  "/settings":   { title: "Settings" },
};

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const meta = PAGE_TITLES[pathname] ?? { title: "HCP Campaign Studio" };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Topbar title={meta.title} subtitle={meta.subtitle} />
        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}
