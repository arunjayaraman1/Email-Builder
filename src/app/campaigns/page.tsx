"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, PlusCircle, Clock, Eye, Loader2 } from "lucide-react";
import { getCampaigns } from "@/lib/api";
import type { CampaignRecord } from "@/lib/api";

type StatusFilter = "all" | "sent" | "draft" | "scheduled";

const TABS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "sent", label: "Sent" },
  { id: "scheduled", label: "Scheduled" },
  { id: "draft", label: "Draft" },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<StatusFilter>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    getCampaigns()
      .then((data) => setCampaigns(data as CampaignRecord[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = campaigns.filter((c) => {
    if (tab !== "all" && c.status !== tab) return false;
    if (q && !(c.name + c.campaignType + c.therapyArea).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const counts = {
    all: campaigns.length,
    sent: campaigns.filter((c) => c.status === "sent").length,
    scheduled: campaigns.filter((c) => c.status === "scheduled").length,
    draft: campaigns.filter((c) => c.status === "draft").length,
  };

  function formatDate(iso: string, includeTime = false) {
    try {
      const d = new Date(iso);
      const datePart = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      if (!includeTime) return datePart;
      const timePart = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      return `${datePart} · ${timePart}`;
    } catch { return iso; }
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      {/* Actions row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", width: 280 }}>
          <Search size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search campaigns…"
            style={{ border: 0, outline: 0, background: "transparent", fontSize: 13, color: "var(--ink)", flex: 1 }}
          />
        </div>
        <Link href="/campaign" style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 16px", background: "var(--accent)", color: "white", borderRadius: "var(--radius-sm)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          <PlusCircle size={14} /> New Campaign
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: "1px solid var(--line)" }}>
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 16px", fontSize: 13,
            fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? "var(--ink)" : "var(--muted)",
            border: 0, background: "none", cursor: "pointer",
            borderBottom: `2px solid ${tab === t.id ? "var(--accent)" : "transparent"}`,
            marginBottom: -1, display: "flex", alignItems: "center", gap: 6,
          }}>
            {t.label}
            <span style={{ fontSize: 11, fontWeight: 600, padding: "1px 6px", borderRadius: 999, background: tab === t.id ? "var(--accent-soft)" : "var(--line-2)", color: tab === t.id ? "var(--accent)" : "var(--muted)" }}>
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "48px 0", display: "flex", justifyContent: "center", color: "var(--muted)", gap: 8 }}>
            <Loader2 size={16} className="animate-spin" style={{ color: "var(--accent)" }} /> Loading campaigns…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--muted)" }}>
            {campaigns.length === 0 ? (
              <><p style={{ margin: "0 0 12px", fontSize: 14 }}>No campaigns yet.</p><Link href="/campaign" style={{ fontSize: 13, color: "var(--accent)" }}>Create your first campaign →</Link></>
            ) : (
              <><p style={{ margin: "0 0 12px", fontSize: 14 }}>No campaigns match your filters.</p><button onClick={() => { setTab("all"); setQ(""); }} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: 0, cursor: "pointer" }}>Clear filters</button></>
            )}
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Type</th>
                <th>Therapy Area</th>
                <th>Audience</th>
                <th>Status</th>
                <th>Open Rate</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><div style={{ fontWeight: 500, color: "var(--ink)" }}>{c.name}</div><div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{c.subject}</div></td>
                  <td style={{ color: "var(--muted)" }}>{c.campaignType}</td>
                  <td style={{ color: "var(--muted)" }}>{c.therapyArea}</td>
                  <td style={{ color: "var(--muted)" }}>{c.audience}</td>
                  <td><span className={`badge-status badge-${c.status}`}>{c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span></td>
                  <td>
                    {c.opens !== "—" ? (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}><Eye size={11} style={{ color: "var(--muted)" }} /> {c.opens}</span>
                    ) : (
                      <span style={{ color: "var(--muted-2)" }}>—</span>
                    )}
                  </td>
                  <td style={{ color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={11} />
                    {c.status === "scheduled" && c.scheduledAt
                      ? <span title="Scheduled send time">{formatDate(c.scheduledAt, true)}</span>
                      : formatDate(c.createdAt)
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!loading && <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)" }}>Showing {filtered.length} of {campaigns.length} campaigns</div>}
    </div>
  );
}
