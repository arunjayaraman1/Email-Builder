"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Monitor, Smartphone, Maximize2, X, Sun, Moon, Eye, Clock,
  Copy, Send, Loader2, Sparkles, CheckCheck, Code, Pencil, Check, RotateCcw,
} from "lucide-react";
import { generateEmail, polishContent } from "@/lib/api";
import { toast } from "sonner";
import { useCampaignStore } from "@/lib/store";
import { TEMPLATES, TONE_MAP } from "@/data/templates";
import { TONE_COLOR, TONE_BG, TONE_COLOR_HEX } from "@/lib/tones";
import { EmailBody } from "./email-body";
import type { EmailBodyTemplate } from "./email-body";

const CTA_DEFAULTS: Record<string, string> = {
  rsvp: "Reserve My Seat", stats: "View Full Data", letter: "Read the Full Letter",
  case: "Read the Full Case", algorithm: "See the Full Algorithm",
  series: "Enroll Now", approval: "View Prescribing Information",
  winback: "Watch the Recording", embargo: "Access the Full Data",
  explainer: "Read the Full Explainer", rwe: "Download the RWE Report",
  voice: "Read the Full Story", rep: "Download the Resources",
  digest: "Read the Full Monograph Update",
};

// ─── Build standalone HTML ────────────────────────────────────────────────────

function buildFullEmailHtml(
  email: { subject: string; headline: string; preheader: string; body: string; cta: string; tone: string },
  toneColorHex: string,
  concept: string,
  therapyArea: string,
  width = 600
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${email.subject}</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 16px; background: #f5f5f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    .wrapper { max-width: ${width}px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  </style>
</head>
<body>
  <div class="wrapper">
    <div style="display:none;max-height:0;overflow:hidden;">${email.preheader}</div>
    <!-- Header -->
    <div style="background:#000485;padding:16px 24px;display:flex;align-items:center;gap:10px;">
      <div style="width:28px;height:28px;border-radius:6px;background:${toneColorHex};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;">H</div>
      <span style="color:rgba(255,255,255,0.75);font-size:13px;font-weight:500;">HCP Campaign Studio</span>
    </div>
    <!-- Hero -->
    <div style="background:${toneColorHex};padding:32px 40px;">
      <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">${concept} · ${therapyArea}</div>
      <h1 style="font-size:24px;font-weight:700;color:white;margin:0 0 12px;line-height:1.3;">${email.headline}</h1>
      <p style="font-size:14px;color:rgba(255,255,255,0.8);margin:0;line-height:1.6;">${email.preheader}</p>
    </div>
    <!-- Body -->
    <div style="padding:32px 40px;font-size:14px;color:#333;line-height:1.7;">${email.body}</div>
    <!-- CTA -->
    <div style="padding:0 40px 32px;">
      <a href="#" style="display:inline-block;padding:12px 28px;border-radius:999px;background:${toneColorHex};color:white;font-weight:600;font-size:14px;text-decoration:none;">${email.cta}</a>
    </div>
    <!-- Footer -->
    <div style="background:var(--paper);padding:20px 40px;border-top:1px solid var(--line);">
      <p style="font-size:11px;color:var(--muted);margin:0;line-height:1.6;">
        HCP Campaign Studio · This communication is intended for healthcare professionals only.<br>
        To unsubscribe or update your preferences, <a href="#" style="color:var(--muted);">click here</a>.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Email content (React) ────────────────────────────────────────────────────

function EmailContent({ email, toneColor, concept, therapyArea, width }: {
  email: { subject: string; headline: string; preheader: string; body: string; cta: string; tone: string };
  toneColor: string; concept: string; therapyArea: string; width: number;
}) {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "white", width: width, flexShrink: 0 }}>
      <div style={{ display: "none" }}>{email.preheader}</div>
      <div className="email-head">
        <div style={{ fontSize: 10, fontWeight: 700, color: toneColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
          {concept} · {therapyArea}
        </div>
        <h1 className="email-subject">{email.headline}</h1>
        <p style={{ fontSize: 13, color: "var(--muted-2)", margin: "0 0 14px", lineHeight: 1.5 }}>
          {email.preheader}
        </p>
        <div className="email-from">
          <div className="ava" style={{ background: toneColor }}>H</div>
          <span className="name">HCP Campaign Studio</span>
          <span className="addr">&lt;noreply@hcp-studio.com&gt;</span>
        </div>
      </div>
      <div className="email-body">
        <div dangerouslySetInnerHTML={{ __html: email.body }} />
        <div style={{ marginTop: 16 }}>
          <a href="#" style={{ display: "inline-block", padding: "10px 24px", borderRadius: 999, background: toneColor, color: "white", fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
            {email.cta}
          </a>
        </div>
      </div>
      <div style={{ background: "var(--paper)", padding: "14px 28px", borderTop: "1px solid var(--line)" }}>
        <p style={{ fontSize: 10, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>
          HCP Campaign Studio · For healthcare professionals only.{" "}
          <a href="#" style={{ color: "var(--muted)" }}>Unsubscribe</a>.
        </p>
      </div>
    </div>
  );
}

// ─── Polished device frames ───────────────────────────────────────────────────

function DesktopFrame({ children, subject, toneColor, readTime, recipientName, audienceSize }: {
  children: React.ReactNode;
  subject?: string;
  toneColor?: string;
  readTime?: string;
  recipientName?: string;
  audienceSize?: string;
}) {
  const tone = toneColor ?? "#1D5874";
  const initials = "H";

  return (
    <div className="pvx-browser">
      {/* Row 1 — Window chrome (traffic lights + address bar) */}
      <div className="pvx-browser-chrome">
        <div className="pvx-traffic"><span /><span /><span /></div>
        <div style={{ display: "flex", gap: 6, marginLeft: 4 }}>
          {["←", "→"].map((a, i) => (
            <span key={i} style={{ fontSize: 13, color: "var(--muted-2)", cursor: "default", userSelect: "none" }}>{a}</span>
          ))}
        </div>
        <div className="pvx-omnibox">
          <span>🔒</span>
          <span>mail.hcpcampaign.com/inbox</span>
        </div>
        <div className="pvx-chrome-r" style={{ display: "flex", gap: 6, fontSize: 13, color: "var(--muted-2)" }}>
          <span>☆</span><span>⬆</span>
        </div>
      </div>

      {/* Row 2 — Inbox navigation bar */}
      <div className="pvx-inbox-nav">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="pvx-nav-icon">←</button>
          <button className="pvx-nav-icon">→</button>
          <span className="pvx-inbox-label">Inbox</span>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>· 1 of 248</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 6 }}>
          {["⎘", "🗑", "⚑", "⋯"].map((ic, i) => (
            <button key={i} className="pvx-nav-icon">{ic}</button>
          ))}
        </div>
      </div>

      {/* Row 3 — Subject heading */}
      <div className="pvx-subject-row">
        <div className="pvx-subject-title">{subject ?? "HCP Campaign Studio"}</div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {readTime && <span className="pvx-meta-chip"><span>⏱</span>{readTime}</span>}
          {audienceSize && <span className="pvx-meta-chip"><span>👥</span>{audienceSize}</span>}
        </div>
      </div>

      {/* Row 4 — Sender card */}
      <div className="pvx-sender-row">
        <div className="pvx-sender-ava">{initials}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>HCP Campaign Studio</span>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>&lt;noreply@hcpcampaign.com&gt;</span>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--muted)" }}>
            to {recipientName ?? "Dr. Aniya Park"} · Today at 7:42 AM
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, color: "var(--muted-2)", fontSize: 16, flexShrink: 0 }}>
          <span style={{ cursor: "pointer" }}>↩</span>
          <span style={{ cursor: "pointer" }}>⋯</span>
        </div>
      </div>

      <div className="pvx-scroll">{children}</div>
    </div>
  );
}

function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="pvx-phone">
      <div className="pvx-phone-screen">
        <div className="pvx-phone-status">
          <span>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4" /><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" /><rect x="9" y="0" width="3" height="12" rx="1" opacity="0.8" /><rect x="13.5" y="0" width="3" height="12" rx="1" /></svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4C5.2 2.4 2.7 3.6 1 5.6L0 4.4C2 2 4.8.8 8 .8s6 1.2 8 3.6l-1 1.2C13.3 3.6 10.8 2.4 8 2.4z" opacity="0.4" /><path d="M8 5.2c-1.8 0-3.4.7-4.6 1.9L2.4 6C3.8 4.5 5.8 3.6 8 3.6s4.2.9 5.6 2.4l-1 1.1C11.4 5.9 9.8 5.2 8 5.2z" opacity="0.7" /><path d="M8 8c-1 0-2 .4-2.7 1.1L4.2 7.9C5.2 6.7 6.5 6 8 6s2.8.7 3.8 1.9L10.7 9.1C10 8.4 9 8 8 8z" /><circle cx="8" cy="11" r="1.2" /></svg>
            <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
              <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid var(--ink)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "75%", background: "var(--ink)", borderRadius: 1 }} />
              </div>
              <div style={{ width: 2, height: 5, background: "var(--ink)", borderRadius: 1 }} />
            </div>
          </div>
        </div>
        <div className="pvx-phone-toolbar">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1D5874", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>H</div>
          <div>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>HCP Campaign Studio</span>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>to me</div>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--muted)" }}>now</span>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── Polish field component ───────────────────────────────────────────────────

function PolishField({
  label, value, onChange, pending, polishing, onPolish, onAccept, onRevert, multiline, rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  pending?: string;
  polishing?: boolean;
  onPolish: () => void;
  onAccept: () => void;
  onRevert: () => void;
  multiline?: boolean;
  rows?: number;
}) {
  const inputStyle = {
    flex: 1, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 6, padding: "6px 10px", color: "white", fontSize: 12.5, outline: 0,
    fontFamily: "inherit", lineHeight: 1.5, resize: "none" as const,
  };

  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>
        {label}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows ?? 2}
            style={inputStyle}
          />
        ) : (
          <input value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputStyle, height: 34 }} />
        )}
        <button
          onClick={onPolish}
          disabled={polishing}
          title={`Polish ${label} with AI`}
          style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", background: polishing ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: polishing ? "rgba(255,255,255,0.4)" : "white", fontSize: 11.5, cursor: polishing ? "default" : "pointer", whiteSpace: "nowrap", flexShrink: 0 }}
        >
          {polishing ? <Loader2 size={11} className="animate-spin" /> : <Sparkles size={11} />}
          {polishing ? "…" : "Polish"}
        </button>
      </div>

      {/* Pending suggestion */}
      {pending && (
        <div style={{ marginTop: 6, background: "rgba(29,88,116,0.25)", border: "1px solid rgba(29,88,116,0.5)", borderRadius: 6, padding: "8px 10px" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>✨ AI suggestion</div>
          <div style={{ fontSize: 12.5, color: "white", lineHeight: 1.5, marginBottom: 8 }}>{pending}</div>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={onAccept} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "var(--accent)", border: 0, borderRadius: 5, color: "white", fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}>
              <Check size={10} /> Accept
            </button>
            <button onClick={onRevert} style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 5, color: "rgba(255,255,255,0.7)", fontSize: 11.5, cursor: "pointer" }}>
              <RotateCcw size={10} /> Revert
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Device frames ────────────────────────────────────────────────────────────

function DeviceFrame({ device, children, subject, toneColor, readTime, recipientName, audienceSize }: {
  device: "desktop" | "mobile";
  children: React.ReactNode;
  subject?: string;
  toneColor?: string;
  readTime?: string;
  recipientName?: string;
  audienceSize?: string;
}) {
  if (device === "mobile") return <MobileFrame>{children}</MobileFrame>;
  return (
    <DesktopFrame
      subject={subject}
      toneColor={toneColor}
      readTime={readTime}
      recipientName={recipientName}
      audienceSize={audienceSize}
    >
      {children}
    </DesktopFrame>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PreviewRail() {
  const { selectedTemplate, generatedEmail, setGeneratedEmail, campaignCtx, previewExpanded, setPreviewExpanded } = useCampaignStore();
  const [device, setDevice] = useState<"desktop" | "mobile" | "both">("desktop");
  const [theaterDevice, setTheaterDevice] = useState<"desktop" | "mobile" | "both">("desktop");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [htmlCopied, setHtmlCopied] = useState(false);
  const [subject, setSubject] = useState(generatedEmail?.subject ?? "");
  const [brief, setBrief] = useState("");
  const [showHtmlModal, setShowHtmlModal] = useState(false);
  const [rawHtml, setRawHtml] = useState("");

  // Edit mode state
  const [editMode, setEditMode] = useState(false);
  const [editHeadline, setEditHeadline] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editCta, setEditCta] = useState("");
  const [polishing, setPolishing] = useState<Record<string, boolean>>({});
  const [polishedPending, setPolishedPending] = useState<Record<string, string>>({});
  const [originals, setOriginals] = useState<Record<string, string>>({});

  const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL ?? "your.email@example.com";

  // Look up the full template data
  const fullTemplate = selectedTemplate
    ? TEMPLATES.find((t) => t.id === selectedTemplate.id)
    : null;

  // Sync edit fields when generated email or template changes
  useEffect(() => {
    if (generatedEmail) {
      setSubject(generatedEmail.subject);
      setEditHeadline(generatedEmail.headline);
      setEditBody(generatedEmail.body);
      setEditCta(generatedEmail.cta);
    } else if (fullTemplate) {
      setSubject(fullTemplate.hero?.title ?? fullTemplate.title);
      setEditHeadline(fullTemplate.hero?.title ?? fullTemplate.title);
      setEditBody(fullTemplate.body_html);
      setEditCta(CTA_DEFAULTS[fullTemplate.body_type] ?? "Learn More");
    }
  }, [generatedEmail, fullTemplate]);

  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      if (showHtmlModal) setShowHtmlModal(false);
      else setPreviewExpanded(false);
    }
  }, [setPreviewExpanded, showHtmlModal]);
  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    setGenerating(true);
    try {
      const email = await generateEmail(
        selectedTemplate.id,
        campaignCtx.audience,
        campaignCtx.therapyArea,
        {
          brand: campaignCtx.brand,
          geo: campaignCtx.geo,
          campaignType: selectedTemplate.concept,
          tone: selectedTemplate.tone,
          brief: brief.trim() || undefined,
        }
      );
      setGeneratedEmail(email);
      setSubject(email.subject);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedEmail) return;
    await navigator.clipboard.writeText(
      `Subject: ${generatedEmail.subject}\n\n${generatedEmail.headline}\n\n${generatedEmail.preheader}\n\n${generatedEmail.body.replace(/<[^>]+>/g, "")}\n\n${generatedEmail.cta}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewHtml = () => {
    if (!emailData) return;
    const html = buildFullEmailHtml(emailData, toneColorHex, selectedTemplate?.concept ?? "", campaignCtx.therapyArea);
    setRawHtml(html);
    setShowHtmlModal(true);
  };

  // ── Polish handlers ──────────────────────────────────────────────────────

  const handlePolish = async (field: "headline" | "body" | "cta") => {
    const current = field === "headline" ? editHeadline : field === "body" ? editBody : editCta;
    if (!current.trim()) return;
    setPolishing((p) => ({ ...p, [field]: true }));
    // Store original before polishing
    setOriginals((o) => ({ ...o, [field]: current }));
    try {
      const polished = await polishContent({
        section: field,
        content: current.replace(/<[^>]+>/g, "").trim(),
        tone: generatedEmail?.tone ?? selectedTemplate?.tone ?? "Clinical",
        therapyArea: campaignCtx.therapyArea,
        audience: campaignCtx.audience,
        context: `${selectedTemplate?.concept ?? ""} email — ${selectedTemplate?.name ?? ""}`,
      });
      setPolishedPending((p) => ({ ...p, [field]: polished }));
    } catch (e) {
      toast.error("Polish failed. Check your API key.");
    } finally {
      setPolishing((p) => ({ ...p, [field]: false }));
    }
  };

  const handlePolishAll = async () => {
    await Promise.all([
      handlePolish("headline"),
      handlePolish("body"),
      handlePolish("cta"),
    ]);
  };

  const handleAcceptPolish = (field: "headline" | "body" | "cta") => {
    const v = polishedPending[field];
    if (!v) return;
    if (field === "headline") setEditHeadline(v);
    if (field === "body") setEditBody(`<p>${v}</p>`);
    if (field === "cta") setEditCta(v);
    setPolishedPending((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleRevertPolish = (field: string) => {
    setPolishedPending((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const handleSaveEdits = () => {
    if (generatedEmail) {
      setGeneratedEmail({
        ...generatedEmail,
        subject,
        headline: editHeadline,
        body: editBody,
        cta: editCta,
      });
    } else if (selectedTemplate && fullTemplate) {
      setGeneratedEmail({
        subject,
        headline: editHeadline,
        preheader: fullTemplate.hero?.sub ?? fullTemplate.desc,
        body: editBody,
        cta: editCta,
        tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone,
        templateId: selectedTemplate.id,
      });
    }
    toast.success("Changes saved");
    setEditMode(false);
  };

  const handleSendTest = () => {
    if (!emailData) return;
    const bodyText = [
      emailData.headline,
      "",
      emailData.preheader,
      "",
      emailData.body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 1200),
      "",
      emailData.cta,
      "",
      "—",
      "Sent via HCP Campaign Studio (test send)",
    ].join("\n");
    const mailto = `mailto:${userEmail}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailto;
  };

  const toneKey = generatedEmail?.tone ?? selectedTemplate?.tone ?? "";
  const toneColor = TONE_COLOR[toneKey] ?? "var(--accent)";
  const toneColorHex = TONE_COLOR_HEX[toneKey] ?? "#0095FF";
  const toneBg = TONE_BG[toneKey] ?? "var(--accent-soft)";

  const emailData = generatedEmail ?? (selectedTemplate && fullTemplate ? {
    subject: fullTemplate.hero?.title ?? fullTemplate.title,
    headline: fullTemplate.hero?.title ?? fullTemplate.title,
    preheader: fullTemplate.hero?.sub ?? fullTemplate.desc,
    body: fullTemplate.body_html,
    cta: CTA_DEFAULTS[fullTemplate.body_type] ?? "Learn More",
    tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone,
    templateId: selectedTemplate.id,
  } : null);

  return (
    <>
      {/* Rail */}
      <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

        {/* Rail header */}
        <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line-2)", background: "white", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
              {selectedTemplate?.name ?? "Select a template"}
            </div>
            <button onClick={() => setPreviewExpanded(true)} title="Expand"
              style={{ background: "none", border: 0, cursor: "pointer", color: "var(--muted)", padding: 2, marginLeft: 4 }}>
              <Maximize2 size={13} />
            </button>
          </div>
          {selectedTemplate && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 10.5, fontWeight: 600, padding: "1px 7px", borderRadius: 999, background: toneBg, color: toneColor }}>
                {selectedTemplate.tone}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10.5, color: "var(--muted)" }}>
                <Eye size={9} /> {selectedTemplate.opens}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10.5, color: "var(--muted)" }}>
                <Clock size={9} /> {selectedTemplate.duration}
              </span>
            </div>
          )}
        </div>

        {/* Campaign brief + Generate */}
        {selectedTemplate && !generatedEmail && (
          <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line-2)", background: "white", flexShrink: 0 }}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                Campaign brief <span style={{ fontWeight: 400, textTransform: "none" }}>(optional)</span>
              </div>
              <textarea
                value={brief} onChange={(e) => setBrief(e.target.value)}
                placeholder={`e.g. "ESMO 2026, Vienna Oct 18. Speaker: Prof. Chen. Key data: 38% reduction."`}
                rows={2}
                style={{ width: "100%", resize: "none", padding: "6px 8px", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: 11.5, color: "var(--ink)", background: "var(--paper)", outline: 0, lineHeight: 1.4, fontFamily: "inherit" }}
              />
            </div>
            <button onClick={handleGenerate} disabled={generating} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", padding: "8px 0", background: "var(--accent)", color: "white", border: 0, borderRadius: "var(--radius-sm)", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>
              {generating ? <><Loader2 size={12} className="animate-spin" /> Generating…</> : <><Sparkles size={12} /> Generate Email</>}
            </button>
          </div>
        )}

        {/* Action buttons row (after generation) */}
        {generatedEmail && (
          <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--line-2)", background: "white", flexShrink: 0, display: "flex", gap: 5 }}>
            <button onClick={handleGenerate} disabled={generating} title="Regenerate" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", background: "none", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: 11, color: "var(--muted)", cursor: "pointer" }}>
              {generating ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />} {generating ? "…" : "Regen"}
            </button>
            <button onClick={handleCopy} title="Copy text" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", background: "none", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: 11, color: "var(--muted)", cursor: "pointer" }}>
              {copied ? <CheckCheck size={10} style={{ color: "var(--leaf)" }} /> : <Copy size={10} />} Copy
            </button>
            <button onClick={handleViewHtml} title="View HTML" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 0", background: "none", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", fontSize: 11, color: "var(--muted)", cursor: "pointer" }}>
              <Code size={10} /> HTML
            </button>
          </div>
        )}

        {/* Device toggle — Desktop / Mobile / Both */}
        <div style={{ padding: "10px 12px", borderTop: "2px solid var(--line)", borderBottom: "1px solid var(--line-2)", background: "white", flexShrink: 0 }}>
          <div className="pvx-seg compact">
            {([
              { id: "desktop", icon: <Monitor size={11} />, label: "D" },
              { id: "mobile",  icon: <Smartphone size={11} />, label: "M" },
              { id: "both",    icon: null, label: "Both" },
            ] as const).map(({ id, icon, label }) => (
              <button key={id} className={device === id ? "on" : ""} onClick={() => setDevice(id)}>
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Inline preview */}
        {!selectedTemplate ? (
          <div className="muted-hint" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 16px", textAlign: "center" }}>
            <Eye size={20} style={{ marginBottom: 10, opacity: 0.4 }} />
            <p style={{ fontSize: 12.5, margin: 0 }}>Select a template to see a live preview here.</p>
          </div>
        ) : emailData && device !== "both" ? (
          <div className="pvx-rail-inbox" style={{ flex: 1, minHeight: 0, cursor: "pointer" }} onClick={() => setPreviewExpanded(true)}>
            <div className="pvx-rail-bar">
              <span>HCP Campaign Studio</span>
              <span style={{ flex: 1 }} />
              <button className="pvx-rail-expand" onClick={(e) => { e.stopPropagation(); setPreviewExpanded(true); }}>
                <Maximize2 size={12} />
              </button>
            </div>
            <div className={`pvx-rail-doc${device === "mobile" ? " mobile" : ""}`}>
              {device === "mobile" ? (
                <div className="pvx-rail-phone">
                  {!generatedEmail && fullTemplate && !editMode ? (
                    <EmailBody template={{ tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone, hero: fullTemplate.hero, body_type: fullTemplate.body_type }} />
                  ) : (
                    <EmailContent email={emailData} toneColor={toneColor} concept={selectedTemplate?.concept ?? ""} therapyArea={campaignCtx.therapyArea} width={375} />
                  )}
                </div>
              ) : (
                <>{!generatedEmail && fullTemplate && !editMode ? (
                  <EmailBody template={{ tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone, hero: fullTemplate.hero, body_type: fullTemplate.body_type }} />
                ) : (
                  <EmailContent email={emailData} toneColor={toneColor} concept={selectedTemplate?.concept ?? ""} therapyArea={campaignCtx.therapyArea} width={600} />
                )}</>
              )}
            </div>
            <div className="pvx-rail-fade" />
          </div>
        ) : emailData && device === "both" ? (
          <div className="pvx-rail-inbox" style={{ flex: 1, minHeight: 0, cursor: "pointer" }} onClick={() => setPreviewExpanded(true)}>
            <div className="pvx-rail-bar">
              <span>HCP Campaign Studio</span>
              <span style={{ flex: 1 }} />
              <button className="pvx-rail-expand" onClick={(e) => { e.stopPropagation(); setPreviewExpanded(true); }}>
                <Maximize2 size={12} />
              </button>
            </div>
            <div className="pvx-rail-doc" style={{ padding: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, textAlign: "center" }}>Desktop</div>
                  <div className="pvx-desktop-min">
                    {!generatedEmail && fullTemplate && !editMode ? (
                      <EmailBody template={{ tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone, hero: fullTemplate.hero, body_type: fullTemplate.body_type }} />
                    ) : (
                      <EmailContent email={emailData} toneColor={toneColor} concept={selectedTemplate?.concept ?? ""} therapyArea={campaignCtx.therapyArea} width={600} />
                    )}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4, textAlign: "center" }}>Mobile</div>
                  <div className="pvx-rail-phone" style={{ width: "100%", maxWidth: "100%" }}>
                    {!generatedEmail && fullTemplate && !editMode ? (
                      <EmailBody template={{ tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone, hero: fullTemplate.hero, body_type: fullTemplate.body_type }} />
                    ) : (
                      <EmailContent email={emailData} toneColor={toneColor} concept={selectedTemplate?.concept ?? ""} therapyArea={campaignCtx.therapyArea} width={375} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="pvx-rail-fade" />
          </div>
        ) : null}
      </div>

      {/* Theater overlay */}
      {previewExpanded && emailData && (
        <div className={`pvx-overlay ${theme === "dark" ? "theater" : "studio"}`}>
          {/* Theater topbar */}
          <div className="pvx-bar">
            <div className="pvx-bar-l">
              <button className="pvx-iconbtn" onClick={() => setPreviewExpanded(false)}>
                <X size={16} />
              </button>
              <div className="pvx-bar-title">
                <div className="pvx-bar-name">{selectedTemplate?.name}</div>
                <div className="pvx-bar-sub">{selectedTemplate?.concept} · {selectedTemplate?.duration}</div>
              </div>
              <span className="pvx-chip">
                <span className="dot" style={{ background: toneColor }} />
                {selectedTemplate?.tone}
              </span>
            </div>
            <div className="pvx-bar-c">
              {/* Device toggle */}
              <div className="pvx-seg compact">
                {(["desktop", "mobile", "both"] as const).map((d) => (
                  <button key={d} className={theaterDevice === d ? "on" : ""} onClick={() => setTheaterDevice(d)}>
                    {d === "desktop" ? <Monitor size={12} /> : d === "mobile" ? <Smartphone size={12} /> : null}
                    {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
              {/* Theme toggle */}
              <div className="pvx-seg compact">
                {(["light", "dark"] as const).map((t) => (
                  <button key={t} className={theme === t ? "on" : ""} onClick={() => setTheme(t)}>
                    {t === "light" ? <Sun size={13} /> : <Moon size={13} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="pvx-bar-r">
              <button
                onClick={() => {
                  if (!editMode && emailData) {
                    // Pre-populate edit fields from current email data (template or generated)
                    setEditHeadline(emailData.headline ?? "");
                    setEditBody(emailData.body ?? "");
                    setEditCta(emailData.cta ?? "");
                    setSubject(emailData.subject ?? "");
                  }
                  setEditMode((v) => !v);
                }}
                className="pvx-iconbtn"
                style={editMode ? { background: "rgba(29,88,116,0.6)", border: "1px solid rgba(29,88,116,0.8)", color: "white" } : {}}
              >
                <Pencil size={12} />
              </button>
              <button className="pvx-iconbtn" onClick={handleViewHtml}><Code size={12} /></button>
              <button className="pvx-iconbtn" onClick={handleCopy}>
                {copied ? <CheckCheck size={12} /> : <Copy size={12} />}
              </button>
              <button className="btn btn-sm" onClick={handleSendTest}><Send size={12} /> Send test</button>
            </div>
          </div>

          {/* Subject strip */}
          <div className="pvx-substrip">
            <div className="pvx-chips">
              <span className="pvx-chip">
                <span className="dot" style={{ background: toneColor }} />
                {emailData.tone}
              </span>
            </div>
            <span className="pvx-hint">
              <span style={{ opacity: 0.5, marginRight: 4 }}>Subject:</span>
              <input
                value={subject} onChange={(e) => setSubject(e.target.value)}
                style={{ background: "transparent", border: 0, outline: 0, fontSize: 12.5, color: "inherit", fontWeight: 500, width: 400 }}
              />
            </span>
          </div>

          {/* Device stage — uses live edit values when editMode is on */}
          <div className={`pvx-stage${editMode ? "" : ""}`} style={{ flex: editMode ? "none" : 1, overflowY: editMode ? "hidden" : "auto", maxHeight: editMode ? "45vh" : undefined, padding: editMode ? "20px 32px" : "28px" }}>
            <div className={`pvx-stage-row${theaterDevice === "both" ? " both" : theaterDevice === "desktop" ? " one-desktop" : " one-mobile"}`}>
              {(theaterDevice === "both" ? ["desktop", "mobile"] : [theaterDevice]).map((d) => {
                const liveEmail = {
                  ...emailData,
                  subject: subject || emailData.subject,
                  headline: editMode ? editHeadline || emailData.headline : emailData.headline,
                  body: editMode ? editBody || emailData.body : emailData.body,
                  cta: editMode ? editCta || emailData.cta : emailData.cta,
                };
                const templateForBody: EmailBodyTemplate | null = fullTemplate
                  ? { tone: TONE_MAP[fullTemplate.tone] ?? fullTemplate.tone, hero: { eyebrow: `${selectedTemplate?.concept ?? ""} · ${campaignCtx.therapyArea}`, title: liveEmail.headline, sub: liveEmail.preheader }, body_type: fullTemplate.body_type }
                  : null;
                return (
                <DeviceFrame
                  key={d}
                  device={d as "desktop" | "mobile"}
                  subject={liveEmail.subject}
                  toneColor={toneColor}
                  readTime={selectedTemplate?.duration}
                  recipientName={campaignCtx.audience === "HCP" ? "Dr. Aniya Park" : "Sarah Mitchell"}
                  audienceSize={campaignCtx.audience}
                >
                  {templateForBody && !editMode ? (
                    <EmailBody template={templateForBody} />
                  ) : (
                    <EmailContent
                      email={liveEmail}
                      toneColor={toneColor}
                      concept={selectedTemplate?.concept ?? ""}
                      therapyArea={campaignCtx.therapyArea}
                      width={d === "desktop" ? 600 : 375}
                    />
                  )}
                </DeviceFrame>
                );
              })}
            </div>
          </div>

          {/* Edit panel */}
          {editMode && (
            <div style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", flexShrink: 0, overflowY: "auto", maxHeight: "50vh" }}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                {/* Fields */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>

                  {/* Headline */}
                  <PolishField
                    label="Headline"
                    value={editHeadline}
                    onChange={setEditHeadline}
                    pending={polishedPending.headline}
                    polishing={polishing.headline}
                    onPolish={() => handlePolish("headline")}
                    onAccept={() => handleAcceptPolish("headline")}
                    onRevert={() => handleRevertPolish("headline")}
                    multiline
                  />

                  {/* Body */}
                  <PolishField
                    label="Body"
                    value={editBody.replace(/<[^>]+>/g, "")}
                    onChange={(v) => setEditBody(`<p>${v.replace(/\n\n/g, "</p><p>")}</p>`)}
                    pending={polishedPending.body}
                    polishing={polishing.body}
                    onPolish={() => handlePolish("body")}
                    onAccept={() => handleAcceptPolish("body")}
                    onRevert={() => handleRevertPolish("body")}
                    multiline
                    rows={4}
                  />

                  {/* CTA */}
                  <PolishField
                    label="CTA"
                    value={editCta}
                    onChange={setEditCta}
                    pending={polishedPending.cta}
                    polishing={polishing.cta}
                    onPolish={() => handlePolish("cta")}
                    onAccept={() => handleAcceptPolish("cta")}
                    onRevert={() => handleRevertPolish("cta")}
                  />
                </div>

                {/* Right actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 20, flexShrink: 0 }}>
                  <button
                    onClick={handlePolishAll}
                    disabled={Object.values(polishing).some(Boolean)}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "var(--radius-sm)", color: "white", fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <Sparkles size={13} /> Polish All
                  </button>
                  <button
                    onClick={handleSaveEdits}
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--accent)", border: 0, borderRadius: "var(--radius-sm)", color: "white", fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <Check size={13} /> Save
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* HTML Source Modal */}
      {showHtmlModal && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowHtmlModal(false); }}
        >
          <div style={{ background: "#1e1e1e", borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 780, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
            {/* Modal header */}
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, background: "#2d2d2d" }}>
              <Code size={14} style={{ color: "#8b949e" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#e6edf3", flex: 1 }}>Email HTML Source</span>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(rawHtml);
                  setHtmlCopied(true);
                  setTimeout(() => setHtmlCopied(false), 2000);
                }}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.15)", background: "transparent", color: htmlCopied ? "#3fb950" : "#8b949e", fontSize: 12, cursor: "pointer" }}
              >
                {htmlCopied ? <><CheckCheck size={12} /> Copied!</> : <><Copy size={12} /> Copy HTML</>}
              </button>
              <button
                onClick={() => setShowHtmlModal(false)}
                style={{ background: "none", border: 0, cursor: "pointer", color: "#8b949e", padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>
            {/* Raw HTML */}
            <pre style={{ flex: 1, overflowY: "auto", margin: 0, padding: "16px 20px", fontSize: 12, lineHeight: 1.6, color: "#e6edf3", fontFamily: "'SF Mono','Fira Code','Consolas',monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", background: "#1e1e1e" }}>
              {rawHtml}
            </pre>
          </div>
        </div>
      )}
    </>
  );
}
