"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Search, X } from "lucide-react";
import SearchModal from "./search-modal";

const NOTIFICATIONS = [
  { id: "1", text: "MERIDIAN-2 topline data is embargoed until Oct 14.", time: "2h ago" },
  { id: "2", text: "CME Series Q2 Enrollment is scheduled for Jun 5.", time: "1d ago" },
  { id: "3", text: "New template added: Monograph digest (Clinical).", time: "3d ago" },
];

interface TopbarProps {
  title: string;
  subtitle?: string;
}

export default function Topbar({ title, subtitle }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const bellRef = useRef<HTMLDivElement>(null);

  // ⌘K shortcut
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  // Load dismissed from localStorage
  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem("hcp_dismissed_notifs") ?? "[]");
      setDismissed(d);
    } catch {}
  }, []);

  const dismiss = (id: string) => {
    const next = [...dismissed, id];
    setDismissed(next);
    localStorage.setItem("hcp_dismissed_notifs", JSON.stringify(next));
  };

  // Close bell on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const visibleNotifs = NOTIFICATIONS.filter((n) => !dismissed.includes(n.id));

  return (
    <>
      <div className="app-topbar">
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{subtitle}</div>}
        </div>

        {/* Search trigger */}
        <div
          onClick={() => setSearchOpen(true)}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: "6px 12px", background: "var(--paper)",
            border: "1px solid var(--line)", borderRadius: "var(--radius-sm)",
            cursor: "text", minWidth: 220,
          }}
        >
          <Search size={12} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: "var(--muted-2)", flex: 1 }}>Search templates…</span>
          <span style={{ fontSize: 10.5, color: "var(--muted-2)", background: "var(--line-2)", borderRadius: 3, padding: "1px 5px", fontFamily: "monospace" }}>⌘K</span>
        </div>

        {/* Bell */}
        <div ref={bellRef} style={{ position: "relative" }}>
          <button
            onClick={() => setBellOpen((v) => !v)}
            style={{
              width: 32, height: 32, borderRadius: "var(--radius-sm)",
              border: "1px solid var(--line)", background: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--muted)", position: "relative",
            }}
          >
            <Bell size={14} />
            {visibleNotifs.length > 0 && (
              <span style={{
                position: "absolute", top: 4, right: 4,
                width: 7, height: 7, borderRadius: "50%",
                background: "var(--rose)", border: "1.5px solid white",
              }} />
            )}
          </button>

          {bellOpen && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)",
              width: 300, background: "white", border: "1px solid var(--line)",
              borderRadius: "var(--radius)", boxShadow: "var(--shadow-3)", zIndex: 200, overflow: "hidden",
            }}>
              <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line-2)", fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
                Notifications
              </div>
              {visibleNotifs.length === 0 ? (
                <div style={{ padding: "20px 14px", fontSize: 13, color: "var(--muted)", textAlign: "center" }}>
                  All caught up!
                </div>
              ) : (
                visibleNotifs.map((n) => (
                  <div key={n.id} style={{ padding: "10px 14px", borderBottom: "1px solid var(--line-2)", display: "flex", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.4, marginBottom: 3 }}>{n.text}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{n.time}</div>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      style={{ background: "none", border: 0, cursor: "pointer", color: "var(--muted)", flexShrink: 0, padding: "3px", borderRadius: 4, transition: "background 0.12s, color 0.12s" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--line-2)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)"; }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
