"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Eye, Star, Loader2, ArrowRight } from "lucide-react";
import { useCampaignStore } from "@/lib/store";

interface Template {
  id: string;
  name: string;
  description: string;
  tone: string;
  concept: string;
  opens: string;
  stars: number;
  badge?: string | null;
  duration: string;
  audiences?: string[];
}

const TONE_COLOR: Record<string, string> = {
  Clinical: "var(--accent)",
  Conversational: "var(--leaf)",
  Urgent: "var(--rose)",
  Educational: "var(--indigo)",
  Promotional: "var(--gold)",
  Empathetic: "var(--plum)",
};

const TONE_BG: Record<string, string> = {
  Clinical: "var(--accent-soft)",
  Conversational: "var(--leaf-soft)",
  Urgent: "var(--rose-soft)",
  Educational: "var(--indigo-soft)",
  Promotional: "var(--gold-soft)",
  Empathetic: "var(--plum-soft)",
};

function TemplateGrid({ template, onUse }: { template: Template; onUse: () => void }) {
  const color = TONE_COLOR[template.tone] ?? "var(--accent)";
  const bg = TONE_BG[template.tone] ?? "var(--accent-soft)";

  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        boxShadow: "var(--shadow-1)",
        transition: "box-shadow 0.15s, transform 0.15s",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-2)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-1)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
      onClick={onUse}
    >
      {/* Mini preview thumbnail */}
      <div style={{ height: 80, background: bg, position: "relative", padding: "12px 14px" }}>
        <div style={{ height: 6, background: color, borderRadius: 3, opacity: 0.6, marginBottom: 6, width: "70%" }} />
        <div style={{ height: 4, background: "rgba(0,0,0,0.1)", borderRadius: 3, marginBottom: 4, width: "90%" }} />
        <div style={{ height: 4, background: "rgba(0,0,0,0.07)", borderRadius: 3, width: "60%" }} />
        {template.badge && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            fontSize: 10, fontWeight: 700,
            padding: "2px 7px", borderRadius: 999,
            background: "var(--gold-soft)", color: "var(--gold)",
          }}>
            {template.badge}
          </span>
        )}
      </div>

      {/* Card content */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: bg, color }}>
            {template.tone}
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{template.concept}</span>
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.35 }}>
          {template.name}
        </h3>
        <p style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 10px", lineHeight: 1.5, flex: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {template.description}
        </p>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--muted)" }}>
            <Eye size={10} /> <b style={{ color: "var(--ink)" }}>{template.opens}</b>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--muted)" }}>
            <Star size={10} /> <b style={{ color: "var(--ink)" }}>{template.stars}</b>
          </span>
          <span style={{ fontSize: 11, color: "var(--muted-2)", marginLeft: "auto" }}>{template.duration}</span>
        </div>
      </div>

      {/* Use Template footer */}
      <div style={{
        padding: "10px 16px",
        borderTop: "1px solid var(--line-2)",
        background: "var(--paper)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: color }}>Use Template</span>
        <ArrowRight size={12} style={{ color }} />
      </div>
    </div>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [toneFilter, setToneFilter] = useState("All");

  const { setSelectedTemplate, setMode } = useCampaignStore();
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/templates`)
      .then((r) => r.json())
      .then(setTemplates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const tones = ["All", ...Array.from(new Set(templates.map((t) => t.tone)))];

  const filtered = templates.filter((t) => {
    if (toneFilter !== "All" && t.tone !== toneFilter) return false;
    if (q && !(t.name + t.description + t.concept).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const handleUseTemplate = (t: Template) => {
    setSelectedTemplate({
      id: t.id,
      name: t.name,
      description: t.description,
      tone: t.tone,
      concept: t.concept,
      opens: t.opens,
      stars: t.stars,
      badge: t.badge,
      duration: t.duration,
      audiences: t.audiences,
    });
    setMode("library");
    router.push("/campaign");
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 320, gap: 10, color: "var(--muted)" }}>
        <Loader2 size={18} className="animate-spin" style={{ color: "var(--accent)" }} />
        Loading templates…
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100 }}>
      {/* Filters row */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 12px", background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", width: 260, flexShrink: 0 }}>
          <Search size={13} style={{ color: "var(--muted)" }} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates…"
            style={{ border: 0, outline: 0, background: "transparent", fontSize: 13, color: "var(--ink)", flex: 1 }}
          />
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {tones.map((t) => {
            const active = toneFilter === t;
            const color = t === "All" ? "var(--ink)" : TONE_COLOR[t] ?? "var(--ink)";
            return (
              <button key={t} onClick={() => setToneFilter(t)} style={{
                padding: "5px 12px", borderRadius: 999,
                fontSize: 12, fontWeight: active ? 600 : 400,
                border: `1.5px solid ${active ? color : "var(--line)"}`,
                background: active ? color : "white",
                color: active ? "white" : "var(--ink)",
                cursor: "pointer", transition: "all 0.12s",
              }}>
                {t}
              </button>
            );
          })}
        </div>

        <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--muted)" }}>
          {filtered.length} templates
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map((t) => (
          <TemplateGrid key={t.id} template={t} onUse={() => handleUseTemplate(t)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
          <p>No templates match your search.</p>
          <button onClick={() => { setQ(""); setToneFilter("All"); }} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: 0, cursor: "pointer" }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
