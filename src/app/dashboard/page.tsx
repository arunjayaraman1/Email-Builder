"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Mail, LayoutGrid, PlusCircle, ArrowRight, Clock, Loader2 } from "lucide-react";
import { getCampaigns, getTemplates } from "@/lib/api";
import type { CampaignRecord } from "@/lib/api";

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [templateCount, setTemplateCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const userName = process.env.NEXT_PUBLIC_USER_NAME ?? "there";

  useEffect(() => {
    Promise.all([getCampaigns(), getTemplates()])
      .then(([c, t]) => {
        setCampaigns(c);
        setTemplateCount(t.length);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const sentCampaigns = campaigns.filter((c) => c.opens !== "—" && c.status === "sent");
  const avgOpenRate = sentCampaigns.length
    ? Math.round(sentCampaigns.reduce((sum, c) => sum + parseFloat(c.opens), 0) / sentCampaigns.length)
    : 0;

  const STATS = [
    {
      label: "Total Campaigns",
      value: loading ? "—" : String(campaigns.length),
      trend: loading ? "" : `${campaigns.filter((c) => c.status !== "draft").length} active`,
      icon: Mail,
      color: "var(--accent)",
      colorSoft: "var(--accent-soft)",
    },
    {
      label: "Avg. Open Rate",
      value: loading ? "—" : sentCampaigns.length ? `${avgOpenRate}%` : "—",
      trend: loading ? "" : sentCampaigns.length ? `Across ${sentCampaigns.length} sent` : "No sent campaigns yet",
      icon: TrendingUp,
      color: "var(--leaf)",
      colorSoft: "var(--leaf-soft)",
    },
    {
      label: "Templates Available",
      value: loading ? "—" : String(templateCount),
      trend: "Ready to use",
      icon: LayoutGrid,
      color: "var(--indigo)",
      colorSoft: "var(--indigo-soft)",
    },
  ];

  const recent = campaigns.slice(0, 4);

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return iso; }
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px" }}>
          Good morning, {userName} 👋
        </h1>
        <p style={{ fontSize: 14, color: "var(--muted)", margin: 0 }}>
          Here&apos;s what&apos;s happening with your campaigns.
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="stat-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {s.label}
                </div>
                <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: s.colorSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} style={{ color: s.color }} />
                </div>
              </div>
              <div style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)", lineHeight: 1, marginBottom: 8 }}>
                {loading ? <Loader2 size={20} className="animate-spin" style={{ color: "var(--muted)" }} /> : s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.trend}</div>
            </div>
          );
        })}
      </div>

      {/* Quick action banner */}
      <Link href="/campaign" style={{ textDecoration: "none" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 24px", background: "var(--ink)", borderRadius: "var(--radius)",
          marginBottom: 28, cursor: "pointer",
        }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.92")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PlusCircle size={16} style={{ color: "white" }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "white" }}>Create a new campaign</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>AI-powered · 4 steps · ready in minutes</div>
            </div>
          </div>
          <ArrowRight size={16} style={{ color: "rgba(255,255,255,0.5)" }} />
        </div>
      </Link>

      {/* Recent campaigns */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Recent campaigns</h2>
          <Link href="/campaigns" style={{ fontSize: 12, color: "var(--accent)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            View all <ArrowRight size={11} />
          </Link>
        </div>

        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "40px 0", display: "flex", justifyContent: "center", color: "var(--muted)", gap: 8 }}>
              <Loader2 size={16} className="animate-spin" style={{ color: "var(--accent)" }} /> Loading…
            </div>
          ) : recent.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--muted)", fontSize: 14 }}>
              No campaigns yet. <Link href="/campaign" style={{ color: "var(--accent)" }}>Create one →</Link>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Type</th>
                  <th>Therapy Area</th>
                  <th>Status</th>
                  <th>Open Rate</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((c) => (
                  <tr key={c.id}>
                    <td><div style={{ fontWeight: 500 }}>{c.name}</div></td>
                    <td style={{ color: "var(--muted)" }}>{c.campaignType}</td>
                    <td style={{ color: "var(--muted)" }}>{c.therapyArea}</td>
                    <td><span className={`badge-status badge-${c.status}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
                    <td style={{ fontWeight: c.opens !== "—" ? 600 : 400, color: c.opens !== "—" ? "var(--ink)" : "var(--muted-2)" }}>{c.opens}</td>
                    <td style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                      <Clock size={11} />
                      {c.status === "scheduled" && c.scheduledAt ? formatDate(c.scheduledAt) : formatDate(c.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
