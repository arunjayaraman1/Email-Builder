"use client";

import { useState } from "react";
import { ArrowLeft, Eye, Star, Loader2, Zap } from "lucide-react";
import { generateEmail } from "@/lib/api";
import { useCampaignStore } from "@/lib/store";
import { TONE_COLOR, TONE_BG } from "@/lib/tones";
import type { TemplateCard } from "@/lib/types";

function MiniMailThumbnail({ tone, height = 120 }: { tone: string; height?: number }) {
  const bg = TONE_BG[tone] ?? "var(--accent-soft)";
  const c = TONE_COLOR[tone] ?? "var(--accent)";
  return (
    <div style={{
      background: "white", border: "1px solid var(--line)",
      borderRadius: 8, padding: "12px 12px 10px",
      width: 110, height, flexShrink: 0, overflow: "hidden",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <div style={{ width: 38, height: 5, background: "var(--line-2)", borderRadius: 3 }} />
        <div style={{ width: 18, height: 5, background: "var(--line-2)", borderRadius: 3 }} />
      </div>
      <div style={{ width: "88%", height: 6, background: "var(--ink)", borderRadius: 3, marginBottom: 6 }} />
      <div style={{ height: 28, background: bg, borderRadius: 4, marginBottom: 6 }} />
      <div style={{ width: "80%", height: 4, background: "var(--line-2)", borderRadius: 3, marginBottom: 3 }} />
      <div style={{ width: "65%", height: 4, background: "var(--line-2)", borderRadius: 3, marginBottom: 3 }} />
      <div style={{ width: "50%", height: 4, background: "var(--line-2)", borderRadius: 3, marginBottom: 8 }} />
      <div style={{ width: 54, height: 16, background: c, borderRadius: 4, opacity: 0.7 }} />
    </div>
  );
}

function TemplateCardComponent({
  template, selected, onSelect, loading, isBestMatch,
}: {
  template: TemplateCard; selected: boolean; onSelect: (t: TemplateCard) => void;
  loading: boolean; isBestMatch?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const toneColor = TONE_COLOR[template.tone] ?? "var(--accent)";

  return (
    <div
      onClick={() => !loading && onSelect(template)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", gap: 16, padding: "16px 18px",
        borderRadius: "var(--radius)",
        border: `${selected ? "2px" : "1.5px"} solid ${selected ? "var(--accent)" : hovered ? "var(--accent-2)" : "var(--line)"}`,
        background: selected ? "var(--accent-soft)" : "white",
        cursor: loading ? "wait" : "pointer",
        opacity: loading && !selected ? 0.65 : 1,
        transition: "all 0.12s",
        boxShadow: !selected && hovered ? "var(--shadow-2)" : selected ? "none" : "var(--shadow-1)",
        position: "relative",
      }}
    >
      <MiniMailThumbnail tone={template.tone} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
          <h3 style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.3 }}>
            {template.name}
          </h3>
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {isBestMatch && (
              <span style={{
                display: "flex", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 700,
                padding: "3px 8px", borderRadius: 999,
                background: "var(--accent)", color: "white",
              }}>
                <Zap size={9} /> Best match
              </span>
            )}
            {template.badge && !isBestMatch && (
              <span style={{
                fontSize: 11, fontWeight: 600,
                padding: "2px 8px", borderRadius: 999,
                background: "var(--gold-soft)", color: "var(--gold)",
              }}>
                {template.badge}
              </span>
            )}
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, fontWeight: 500, padding: "2px 7px", borderRadius: 999, background: TONE_BG[template.tone] ?? "var(--accent-soft)", color: toneColor }}>
            {template.tone}
          </span>
          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>·</span>
          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{template.concept}</span>
          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>·</span>
          <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{template.duration}</span>
        </div>

        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 12px", lineHeight: 1.55 }}>
          {template.description}
        </p>

        {/* Stats + selected indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}>
            <Eye size={11} /> <b style={{ color: "var(--ink)" }}>{template.opens}</b> open rate
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--muted)" }}>
            <Star size={11} /> <b style={{ color: "var(--ink)" }}>{template.stars}</b>
          </span>
          <div style={{ flex: 1 }} />
          {selected ? (
            <span style={{
              fontSize: 12, fontWeight: 700, color: "var(--accent)",
              display: "flex", alignItems: "center", gap: 4,
            }}>
              ✓ Selected
            </span>
          ) : (
            <span style={{
              fontSize: 12, fontWeight: 500, color: hovered ? "var(--accent)" : "var(--muted)",
              transition: "color 0.12s",
            }}>
              Use template →
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TemplatePicker() {
  const { setup, recommendedTemplates, selectedTemplate, setSelectedTemplate, setGeneratedEmail, setStep } = useCampaignStore();
  const [loading, setLoading] = useState(false);

  const handleUseTemplate = async (template: TemplateCard) => {
    setSelectedTemplate(template);
    setLoading(true);
    try {
      const email = await generateEmail(template.id, setup.audience, setup.therapyArea, {
        campaignType: setup.campaignType,
        tone: setup.tone,
      });
      setGeneratedEmail(email);
      setStep(3);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ color: "var(--muted)", fontSize: 12.5, marginBottom: 4, fontWeight: 500 }}>
          Step 2 of 4
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
          Recommended templates
        </h1>

        {/* Criteria chips */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
          {[setup.therapyArea, setup.campaignType, setup.tone, setup.audience].filter(Boolean).map((val) => (
            <span key={val} style={{
              fontSize: 12, fontWeight: 500, padding: "3px 9px",
              borderRadius: 999, background: "var(--paper-2)",
              color: "var(--ink)", border: "1px solid var(--line)",
            }}>
              {val}
            </span>
          ))}
        </div>
      </div>

      {recommendedTemplates.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)" }}>
          <p>No templates found. Try adjusting your criteria.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {recommendedTemplates.map((t, i) => (
            <TemplateCardComponent
              key={t.id}
              template={t}
              selected={selectedTemplate?.id === t.id}
              onSelect={handleUseTemplate}
              loading={loading}
              isBestMatch={i === 0}
            />
          ))}
        </div>
      )}

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, color: "var(--muted)", fontSize: 13 }}>
          <Loader2 size={14} className="animate-spin" style={{ color: "var(--accent)" }} />
          Generating your email…
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 24 }}>
        <button
          onClick={() => { setSelectedTemplate(null); setGeneratedEmail(null); setStep(1); }}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", background: "none", border: 0, cursor: "pointer" }}
        >
          <ArrowLeft size={14} /> Back to setup
        </button>
      </div>
    </div>
  );
}
