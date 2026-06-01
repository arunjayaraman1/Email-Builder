"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight, Loader2, FlaskConical, Heart, Activity,
  Stethoscope, UserRound, Calendar, BookOpen, Newspaper,
  MessageSquare, Mail, BarChart3, GraduationCap, Sparkles, Check,
} from "lucide-react";
import { getOptions } from "@/lib/api";
import { recommendTemplates } from "@/lib/api";
import { useCampaignStore } from "@/lib/store";
import { toast } from "sonner";
import { TONE_COLOR, TONE_BG } from "@/lib/tones";
import type { CampaignSetup } from "@/lib/types";

// ─── Icon maps ────────────────────────────────────────────────────────────────

const THERAPY_ICONS: Record<string, React.ElementType> = {
  Oncology:   FlaskConical,
  Cardiology: Heart,
  Neurology:  Activity,
};

const THERAPY_SUBS: Record<string, string> = {
  Oncology:   "Cancer & blood cancers",
  Cardiology: "Heart & vascular disease",
  Neurology:  "Brain & nervous system",
};

const AUDIENCE_ICONS: Record<string, React.ElementType> = {
  HCP:     Stethoscope,
  Patient: UserRound,
};

const AUDIENCE_SUBS: Record<string, string> = {
  HCP:     "Healthcare professionals",
  Patient: "Patient-facing content",
};

const GEO_FLAGS: Record<string, string> = {
  US:     "🇺🇸",
  Europe: "🇪🇺",
  APAC:   "🌏",
};

const CAMPAIGN_ICONS: Record<string, React.ElementType> = {
  "Congress Event":      Calendar,
  "Guideline Update":    BookOpen,
  "Newsletter":          Newspaper,
  "Patient Case Study":  MessageSquare,
  "Event Invitation":    Mail,
};

const CAMPAIGN_SUBS: Record<string, string> = {
  "Congress Event":      "Event invite & RSVP",
  "Guideline Update":    "New protocols & algorithms",
  "Newsletter":          "Digest & recap format",
  "Patient Case Study":  "Narrative-driven story",
  "Event Invitation":    "Exclusive event invite",
};

const TONE_ICONS: Record<string, React.ElementType> = {
  Clinical:      BarChart3,
  Educational:   GraduationCap,
  Promotional:   Sparkles,
  Empathetic:    Heart,
};

const TONE_SUBS: Record<string, string> = {
  Clinical:    "Evidence-first, data-driven",
  Educational: "Teach a concept or update",
  Promotional: "Brand-forward, compelling",
  Empathetic:  "Patient-centred, caring",
};

// ─── Generic tile components ──────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{
      fontSize: 12, fontWeight: 700, color: "var(--muted)",
      textTransform: "uppercase", letterSpacing: "0.06em",
      marginBottom: 10,
    }}>
      {label}
    </div>
  );
}

function Tile({
  selected, onClick, icon: Icon, emoji, label, sublabel, color, bg, small,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  emoji?: string;
  label: string;
  sublabel?: string;
  color?: string;
  bg?: string;
  small?: boolean;
}) {
  const activeColor = color ?? "var(--accent)";
  const activeBg = bg ?? "var(--accent-soft)";
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: sublabel ? "column" : "row",
        alignItems: sublabel ? "flex-start" : "center",
        gap: sublabel ? 6 : 8,
        padding: small ? "10px 12px" : "14px 16px",
        borderRadius: "var(--radius)",
        border: `${selected ? "2px" : "1.5px"} solid ${selected ? activeColor : hovered ? "var(--accent-2)" : "var(--line)"}`,
        background: selected ? activeBg : "white",
        cursor: "pointer",
        transition: "all 0.12s",
        boxShadow: !selected && hovered ? "var(--shadow-1)" : "none",
        position: "relative",
      }}
    >
      {/* Selected check */}
      {selected && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          width: 16, height: 16, borderRadius: "50%",
          background: activeColor,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Check size={10} color="white" strokeWidth={3} />
        </div>
      )}

      {/* Icon or emoji */}
      {emoji ? (
        <span style={{ fontSize: small ? 16 : 20, lineHeight: 1 }}>{emoji}</span>
      ) : Icon ? (
        <Icon size={small ? 15 : 18} style={{ color: selected ? activeColor : "var(--muted)", flexShrink: 0 }} />
      ) : null}

      <div>
        <div style={{
          fontSize: small ? 12.5 : 13,
          fontWeight: selected ? 600 : 500,
          color: selected ? activeColor : "var(--ink)",
          lineHeight: 1.2,
        }}>
          {label}
        </div>
        {sublabel && (
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, lineHeight: 1.3 }}>
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CampaignSetupScreen() {
  const [options, setOptions] = useState<{
    therapyAreas: string[]; audiences: string[]; geographies: string[];
    campaignTypes: string[]; tones: string[]; compliance: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { setup, setSetup, setRecommendedTemplates, setStep } = useCampaignStore();

  // Local state — mirrors setup but in plain strings for tile selection
  const [therapyArea, setTherapyArea] = useState(setup.therapyArea ?? "");
  const [audience, setAudience] = useState(setup.audience ?? "");
  const [geography, setGeography] = useState(setup.geography ?? "");
  const [campaignType, setCampaignType] = useState(setup.campaignType ?? "");
  const [tone, setTone] = useState(setup.tone ?? "");
  const [compliance, setCompliance] = useState<string[]>(setup.compliance ?? []);

  useEffect(() => {
    getOptions().then((o) => setOptions(o as typeof options)).catch(console.error);
  }, []);

  const toggleCompliance = (item: string) => {
    setCompliance((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const allRequired = therapyArea && audience && geography && campaignType && tone;

  const handleSubmit = async () => {
    if (!allRequired) return;
    setLoading(true);
    const data: CampaignSetup = { therapyArea, audience, geography, campaignType, tone, compliance };
    try {
      setSetup(data);
      const templates = await recommendTemplates(campaignType, tone, audience);
      setRecommendedTemplates(templates);
      setStep(2);
    } catch (err) {
      console.error(err);
      toast.error("Failed to find templates. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!options) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 className="animate-spin" style={{ color: "var(--accent)" }} size={22} />
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Loading options…</p>
      </div>
    );
  }

  // Selection summary chips
  const selections = [therapyArea, audience, geography, campaignType, tone].filter(Boolean);

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ color: "var(--muted)", fontSize: 12.5, marginBottom: 4, fontWeight: 500 }}>
          Step 1 of 4
        </p>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>
          Set up your campaign
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 13.5, margin: 0 }}>
          Select your parameters and we&apos;ll find the best-matching email templates.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Therapy Area */}
        <div>
          <SectionLabel label="Therapy Area" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {options.therapyAreas.map((ta) => {
              const Icon = THERAPY_ICONS[ta];
              return (
                <Tile
                  key={ta}
                  selected={therapyArea === ta}
                  onClick={() => setTherapyArea(ta)}
                  icon={Icon}
                  label={ta}
                  sublabel={THERAPY_SUBS[ta]}
                />
              );
            })}
          </div>
        </div>

        {/* Audience */}
        <div>
          <SectionLabel label="Audience" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {options.audiences.map((aud) => {
              const Icon = AUDIENCE_ICONS[aud];
              return (
                <Tile
                  key={aud}
                  selected={audience === aud}
                  onClick={() => setAudience(aud)}
                  icon={Icon}
                  label={aud}
                  sublabel={AUDIENCE_SUBS[aud]}
                />
              );
            })}
          </div>
        </div>

        {/* Geography */}
        <div>
          <SectionLabel label="Geography" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {options.geographies.map((geo) => (
              <Tile
                key={geo}
                selected={geography === geo}
                onClick={() => setGeography(geo)}
                emoji={GEO_FLAGS[geo]}
                label={geo}
                small
              />
            ))}
          </div>
        </div>

        {/* Campaign Type */}
        <div>
          <SectionLabel label="Campaign Type" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {options.campaignTypes.map((ct) => {
              const Icon = CAMPAIGN_ICONS[ct];
              return (
                <Tile
                  key={ct}
                  selected={campaignType === ct}
                  onClick={() => setCampaignType(ct)}
                  icon={Icon}
                  label={ct}
                  sublabel={CAMPAIGN_SUBS[ct]}
                />
              );
            })}
          </div>
        </div>

        {/* Tone */}
        <div>
          <SectionLabel label="Tone" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {options.tones.map((t) => {
              const Icon = TONE_ICONS[t];
              return (
                <Tile
                  key={t}
                  selected={tone === t}
                  onClick={() => setTone(t)}
                  icon={Icon}
                  label={t}
                  sublabel={TONE_SUBS[t]}
                  color={TONE_COLOR[t]}
                  bg={TONE_BG[t]}
                />
              );
            })}
          </div>
        </div>

        {/* Compliance */}
        <div>
          <SectionLabel label="Compliance" />
          <div style={{ display: "flex", gap: 10 }}>
            {options.compliance.map((item) => (
              <div
                key={item}
                onClick={() => toggleCompliance(item)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 14px",
                  borderRadius: "var(--radius)",
                  border: `${compliance.includes(item) ? "2px" : "1.5px"} solid ${compliance.includes(item) ? "var(--leaf)" : "var(--line)"}`,
                  background: compliance.includes(item) ? "var(--leaf-soft)" : "white",
                  cursor: "pointer", transition: "all 0.12s",
                }}
              >
                <div style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  border: `1.5px solid ${compliance.includes(item) ? "var(--leaf)" : "var(--line)"}`,
                  background: compliance.includes(item) ? "var(--leaf)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {compliance.includes(item) && <Check size={10} color="white" strokeWidth={3} />}
                </div>
                <span style={{ fontSize: 13, fontWeight: compliance.includes(item) ? 600 : 400, color: compliance.includes(item) ? "var(--leaf)" : "var(--ink)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Selection summary + Submit */}
        <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 20 }}>
          {/* Selection chips summary */}
          {selections.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
              {selections.map((s) => (
                <span key={s} style={{
                  fontSize: 11.5, fontWeight: 500, padding: "3px 9px",
                  borderRadius: 999, background: "var(--paper-2)",
                  color: "var(--ink)", border: "1px solid var(--line)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0 }}>
              {allRequired
                ? "Ready — click to find matching templates"
                : `${5 - selections.length} selection${5 - selections.length !== 1 ? "s" : ""} remaining`
              }
            </p>
            <button
              onClick={handleSubmit}
              disabled={!allRequired || loading}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                border: 0,
                background: allRequired ? "var(--accent)" : "var(--line-2)",
                color: allRequired ? "white" : "var(--muted)",
                fontSize: 14, fontWeight: 600,
                cursor: allRequired ? "pointer" : "not-allowed",
                transition: "all 0.12s",
              }}
            >
              {loading
                ? <><Loader2 size={14} className="animate-spin" /> Finding templates…</>
                : <>Find Templates <ArrowRight size={14} /></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
