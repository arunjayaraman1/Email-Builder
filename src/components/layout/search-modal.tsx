"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Loader2 } from "lucide-react";
import { getTemplates } from "@/lib/api";
import { useCampaignStore } from "@/lib/store";
import type { TemplateCard } from "@/lib/types";

const TONE_COLOR: Record<string, string> = {
  Clinical: "var(--accent)", Conversational: "var(--leaf)", Urgent: "var(--rose)",
  Educational: "var(--indigo)", Promotional: "var(--gold)", Empathetic: "var(--plum)",
};

interface SearchModalProps {
  onClose: () => void;
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const [q, setQ] = useState("");
  const [templates, setTemplates] = useState<TemplateCard[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setSelectedTemplate, setMode } = useCampaignStore();

  useEffect(() => {
    getTemplates().then(setTemplates).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const filtered = q.trim()
    ? templates.filter((t) =>
        (t.name + t.description + t.concept + t.tone)
          .toLowerCase()
          .includes(q.toLowerCase())
      )
    : templates.slice(0, 6);

  const handleSelect = (t: TemplateCard) => {
    setSelectedTemplate(t);
    setMode("library");
    router.push("/campaign");
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(15,27,45,0.5)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "80px 16px 16px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        width: "100%", maxWidth: 560,
        background: "white", borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-3)", overflow: "hidden",
      }}>
        {/* Search input */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
          <Search size={16} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates, concepts, tones…"
            style={{ flex: 1, border: 0, outline: 0, fontSize: 15, color: "var(--ink)", background: "transparent" }}
          />
          {q && (
            <button onClick={() => setQ("")} style={{ background: "none", border: 0, cursor: "pointer", color: "var(--muted)" }}>
              <X size={14} />
            </button>
          )}
          <kbd style={{ fontSize: 11, color: "var(--muted)", background: "var(--line-2)", borderRadius: 4, padding: "2px 6px" }}>Esc</kbd>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 400, overflowY: "auto" }}>
          {loading ? (
            <div style={{ padding: "32px 0", display: "flex", justifyContent: "center", color: "var(--muted)", gap: 8 }}>
              <Loader2 size={14} className="animate-spin" style={{ color: "var(--accent)" }} /> Loading templates…
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: "32px 0", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
              No templates match &ldquo;{q}&rdquo;
            </div>
          ) : (
            <>
              <div style={{ padding: "8px 16px 4px", fontSize: 10.5, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {q ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : "All templates"}
              </div>
              {filtered.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleSelect(t)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 16px", cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.background = "var(--paper)"}
                  onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {t.concept} · <span style={{ color: TONE_COLOR[t.tone] ?? "var(--muted)" }}>{t.tone}</span> · {t.duration}
                    </div>
                  </div>
                  <ArrowRight size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "8px 16px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, color: "var(--muted)" }}>
          <span><kbd style={{ background: "var(--line-2)", padding: "1px 5px", borderRadius: 3 }}>↵</kbd> to select</span>
          <span><kbd style={{ background: "var(--line-2)", padding: "1px 5px", borderRadius: 3 }}>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
