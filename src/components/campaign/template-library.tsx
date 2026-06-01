"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Star, List, LayoutGrid, Loader2, Sparkles, X } from "lucide-react";
import { useCampaignStore } from "@/lib/store";
import { generateFromFilters } from "@/lib/api";
import { TONE_COLOR, TONE_BG } from "@/lib/tones";
import { CONCEPT_MAP } from "@/data/templates";
import type { TemplateCard } from "@/lib/types";

function MiniMail({ tone, name }: { tone: string; name: string }) {
  const color = TONE_COLOR[tone] ?? "var(--accent)";
  const bg = TONE_BG[tone] ?? "var(--accent-soft)";
  return (
    <div className="mini-mail">
      <div className="mm-h">
        <span>{tone === "Conversational" ? "Dr. A. Park" : "HCP Campaign"}</span>
        <span>7:42 AM</span>
      </div>
      <div className="mm-title">{name}</div>
      <div className="mm-band" style={{ background: bg }} />
      <div className="mm-line m" />
      <div className="mm-line s" />
      <div className="mm-cta" style={{ background: color }}>Read more</div>
    </div>
  );
}

function TemplateCardItem({ template, selected, onSelect, dense }: {
  template: TemplateCard; selected: boolean; onSelect: () => void; dense: boolean;
}) {
  const color = TONE_COLOR[template.tone] ?? "var(--accent)";
  return (
    <div className={"tcard " + (selected ? "is-selected" : "")} onClick={onSelect}>
      {!dense && (
        <div className="tcard-thumb">
          <div className="thumb-pattern" style={{ opacity: 0.08, background: color }} />
          <MiniMail tone={template.tone} name={template.name} />
        </div>
      )}
      <div className="tcard-body">
        {dense && (
          <div className="tcard-meta">
            <span>{template.concept}</span>
            <span className="dot" />
            <span style={{ color }}>{template.tone}</span>
            {template.badge && <><span className="dot" /><span style={{ color: "var(--ink)" }}>{template.badge}</span></>}
          </div>
        )}
        <div className="tcard-title">{template.name}</div>
        {!dense && <div className="tcard-desc">{template.description}</div>}
        <div className="tcard-tags">
          <span className="tag"><span className="sw" style={{ background: color }} />{template.tone}</span>
          <span className="tag">{template.duration}</span>
          {(template.audiences ?? []).slice(0, 1).map((a) => (
            <span className="tag" key={a}>{a}</span>
          ))}
        </div>
        <div className="tcard-foot">
          <span className="perf"><Eye size={11} /> <b>{template.opens}</b> open</span>
          <span className="perf"><Star size={11} /> <b>{template.stars}</b></span>
        </div>
      </div>
    </div>
  );
}

export default function TemplateLibrary() {
  const { filters, sortBy, density, setSortBy, setDensity, selectedTemplate, setSelectedTemplate, setGeneratedEmail, campaignCtx, setFilters } = useCampaignStore();
  const [templates, setTemplates] = useState<TemplateCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    fetch(`/api/templates`)
      .then((r) => r.json())
      .then(setTemplates)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const TA_SPECIALTY_MAP: Record<string, string[]> = {
    Oncology:   ["Oncology", "Hematology"],
    Cardiology: ["Cardiology", "Cardiovascular", "Primary Care"],
    Neurology:  ["Neurology", "Psychiatry"],
  };

  const PATIENT_TEMPLATE_IDS = new Set(["case-file", "patient-voice"]);
  const PATIENT_CONCEPTS = new Set(["case"]);

  function parseDuration(s: string): number {
    const nums = s.match(/\d+/g);
    if (!nums) return 8;
    return Math.max(...nums.map(Number));
  }

  const taSpecialties = TA_SPECIALTY_MAP[campaignCtx.therapyArea] ?? [];

  const filtered = templates.filter((t) => {
    if (taSpecialties.length && !(t.audiences ?? []).some((a: string) => taSpecialties.includes(a))) return false;
    if (filters.specialties.length && !(t.audiences ?? []).some((a: string) => filters.specialties.includes(a))) return false;
    if (filters.compliance.length && !(t.compliance ?? []).some((c: string) => filters.compliance.includes(c))) return false;
    if (campaignCtx.audience === "Patient") {
      if (!PATIENT_TEMPLATE_IDS.has(t.id) && !PATIENT_CONCEPTS.has(t.concept)) return false;
    }
    if (filters.concepts.length && !filters.concepts.includes(t.concept)) return false;
    if (filters.tones.length && !filters.tones.includes(t.tone)) return false;
    if (q && !(t.name + t.description + t.concept).toLowerCase().includes(q.toLowerCase())) return false;
    const mins = parseDuration(t.duration);
    if (mins < filters.readTimeRange[0] || mins > filters.readTimeRange[1]) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "stars") return b.stars - a.stars;
    if (sortBy === "opens") return parseFloat(b.opens) - parseFloat(a.opens);
    if (sortBy === "new") return 0;
    return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
  });

  const activeChips = [
    ...filters.concepts.map((c) => ({ key: "concepts" as const, val: c, label: `Concept: ${CONCEPT_MAP[c] ?? c}`, dot: undefined as string | undefined })),
    ...filters.tones.map((t) => ({ key: "tones" as const, val: t, label: t, dot: TONE_COLOR[t] })),
    ...filters.specialties.map((s) => ({ key: "specialties" as const, val: s, label: s, dot: undefined })),
    ...filters.compliance.map((c) => ({ key: "compliance" as const, val: c, label: c, dot: undefined })),
  ];

  if (loading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: "var(--muted)" }}>
        <Loader2 size={16} className="animate-spin" style={{ color: "var(--accent)" }} /> Loading templates\u2026
      </div>
    );
  }

  return (
    <div className="content" style={{ flex: 1, overflowY: "auto", paddingTop: 16 }}>
      <div className="content-head">
        <div>
          <div className="content-sub">
            Template library · <strong>{sorted.length}</strong> of {templates.length}
            {campaignCtx.therapyArea && <> · scoped to <strong>{campaignCtx.therapyArea}</strong></>}
          </div>
          <h1 className="content-title">Choose a template.</h1>
          <div className="content-sub">Filter by tone, concept, and audience \u2014 or hand it to the assistant.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="search-mini" style={{ minWidth: 260 }}>
            <Search size={13} style={{ color: "var(--muted)" }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, keyword, or campaign"
              style={{ border: 0, outline: 0, background: "transparent", flex: 1, fontSize: 13 }}
            />
          </div>
        </div>
      </div>

      <div className="toolbar">
        {activeChips.map((c) => (
          <span key={c.key + c.val} className="chip" onClick={() => {
            const cur = filters[c.key] as string[];
            setFilters({ [c.key]: cur.filter((x) => x !== c.val) });
          }}>
            {c.dot && <span className="dot" style={{ background: c.dot }} />}
            {c.label}
            <span className="x"><X size={10} /></span>
          </span>
        ))}
{activeChips.length > 0 && (
            <button className="chip is-soft" onClick={() => setFilters({ concepts: [], tones: [], specialties: [], compliance: [] })}>Clear all</button>
          )}
        <span className="toolbar-spacer" />
        <div className="sort">
          Sort: <strong style={{ color: "var(--ink)" }}>
            {sortBy === "featured" ? "Featured" : sortBy === "stars" ? "Highest rated" : sortBy === "opens" ? "Open rate" : "Newest"}
          </strong>
        </div>
        <div className="seg">
          <button className={density === "comfy" ? "on" : ""} onClick={() => setDensity("comfy")}><LayoutGrid size={13} /></button>
          <button className={density === "dense" ? "on" : ""} onClick={() => setDensity("dense")}><List size={13} /></button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--muted)" }}>
          <Sparkles size={20} />
          <div style={{ marginTop: 10 }}>No templates match those filters yet.</div>
          <button
            onClick={async () => {
              setAiGenerating(true);
              try {
                const result = await generateFromFilters({
                  campaignType: filters.concepts[0] ?? "Congress Event",
                  tone: filters.tones[0] ?? "Clinical",
                  therapyArea: campaignCtx.therapyArea,
                  audience: campaignCtx.audience,
                });
                setSelectedTemplate({
                  id: "ai-generated",
                  name: `AI \u00B7 ${filters.concepts[0] ?? "Custom"} \u00B7 ${filters.tones[0] ?? "Clinical"}`,
                  description: `AI-generated for ${campaignCtx.therapyArea}`,
                  tone: filters.tones[0] ?? result.tone,
                  concept: filters.concepts[0] ?? "Custom",
                  opens: "\u2014",
                  stars: 0,
                  badge: "AI",
                  duration: "\u2014",
                  audiences: [campaignCtx.audience],
                  compliance: filters.compliance,
                });
                setGeneratedEmail(result);
              } catch (err) {
                console.error(err);
              } finally {
                setAiGenerating(false);
              }
            }}
            disabled={aiGenerating}
            className="btn primary" style={{ marginTop: 12 }}
          >
            {aiGenerating ? <><Loader2 size={14} className="animate-spin" /> Generating\u2026</> : <><Sparkles size={14} /> Generate with AI</>}
          </button>
          <div style={{ marginTop: 8 }}>
              <button className="btn ghost" onClick={() => { setQ(""); setFilters({ concepts: [], tones: [], specialties: [], compliance: [], readTimeRange: [1, 8] }); }}>
                Clear filters instead
              </button>  
          </div>
        </div>
      ) : (
        <div className={"grid " + (density === "dense" ? "dense" : "")}>
          {sorted.map((t) => (
            <TemplateCardItem
              key={t.id}
              template={t}
              selected={selectedTemplate?.id === t.id}
              onSelect={() => {
                if (selectedTemplate?.id === t.id) {
                  setSelectedTemplate(null);
                  setGeneratedEmail(null);
                } else {
                  setSelectedTemplate(t);
                  setGeneratedEmail(null);
                }
              }}
              dense={density === "dense"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
