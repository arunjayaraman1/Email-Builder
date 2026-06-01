"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ArrowLeft, Monitor, Smartphone, Copy, Send, CheckCheck, Code, X } from "lucide-react";
import { useCampaignStore } from "@/lib/store";
import { TONE_COLOR_HEX } from "@/lib/tones";

// ─── Email HTML builder ───────────────────────────────────────────────────────

function buildEmailHtml(props: {
  headline: string; preheader: string; body: string; cta: string;
  toneColor: string; concept: string; therapyArea: string;
  isDesktop: boolean;
}): string {
  const { headline, preheader, body, cta, toneColor, concept, therapyArea, isDesktop } = props;
  const pad = isDesktop ? "32px 40px" : "24px 20px";
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:white;">
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
  <div style="background:#0F1B2D;padding:16px 24px;display:flex;align-items:center;gap:10px;">
    <div style="width:28px;height:28px;border-radius:6px;background:${toneColor};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white;">H</div>
    <span style="color:rgba(255,255,255,0.75);font-size:13px;font-weight:500;">HCP Campaign Studio</span>
  </div>
  <div style="background:${toneColor};padding:${pad};">
    <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;">${concept} · ${therapyArea}</div>
    <h1 style="font-size:${isDesktop ? "24px" : "20px"};font-weight:700;color:white;margin:0 0 12px;line-height:1.3;">${headline}</h1>
    <p style="font-size:14px;color:rgba(255,255,255,0.8);margin:0;line-height:1.6;">${preheader}</p>
  </div>
  <div style="padding:${pad};font-size:14px;color:#333;line-height:1.7;">${body}</div>
  <div style="padding:0 40px 32px;">
    <a href="#" style="display:inline-block;padding:12px 28px;border-radius:999px;background:${toneColor};color:white;font-weight:600;font-size:14px;text-decoration:none;">${cta}</a>
  </div>
  <div style="background:#F5F5F5;padding:${isDesktop ? "20px 40px" : "16px 20px"};border-top:1px solid #E5E5E5;">
    <p style="font-size:11px;color:#6A7787;margin:0;line-height:1.6;">HCP Campaign Studio · For healthcare professionals only. <a href="#" style="color:#6A7787;">Unsubscribe</a>.</p>
  </div>
</div>`;
}

// ─── Polished device frames ───────────────────────────────────────────────────

function DesktopFrame({ subject, emailHtml }: { subject: string; emailHtml: string }) {
  return (
    <div style={{ width: 680, borderRadius: 12, overflow: "hidden", boxShadow: "0 32px 80px -20px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.1)", background: "white", margin: "0 auto" }}>
      {/* Window chrome */}
      <div style={{ background: "#1e1e1e", padding: "9px 14px", display: "flex", alignItems: "center", gap: 6 }}>
        {[["#ff5f57"], ["#febc2e"], ["#28c840"]].map(([bg], i) => (
          <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: bg }} />
        ))}
        <div style={{ marginLeft: 10, background: "#2d2d2d", borderRadius: "6px 6px 0 0", padding: "4px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#ccc", maxWidth: 220 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#1D5874", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "white", flexShrink: 0 }}>H</div>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{subject}</span>
          <span style={{ color: "#666" }}>✕</span>
        </div>
      </div>
      {/* Address bar */}
      <div style={{ background: "#f1f1f1", padding: "6px 12px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #ddd" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["←", "→", "↻"].map((s, i) => (
            <div key={i} style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#666" }}>{s}</div>
          ))}
        </div>
        <div style={{ flex: 1, background: "white", border: "1px solid #ccc", borderRadius: 20, padding: "3px 12px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 11, color: "#3c8043" }}>🔒</span>
          <span style={{ fontSize: 11.5, color: "#444" }}>hcp-campaign-studio.local</span>
        </div>
        <span style={{ fontSize: 13, color: "#888" }}>☆</span>
      </div>
      {/* Inbox tabs */}
      <div style={{ background: "white", borderBottom: "1px solid #e8e8e8", padding: "0 16px", display: "flex", alignItems: "center" }}>
        {["Inbox (3)", "Drafts", "Sent"].map((label, i) => (
          <div key={i} style={{ padding: "8px 14px", fontSize: 12.5, borderBottom: i === 0 ? "2px solid #1a73e8" : "none", color: i === 0 ? "#1a73e8" : "#666", fontWeight: i === 0 ? 600 : 400, cursor: "pointer" }}>
            {label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ background: "#f1f3f4", borderRadius: 20, padding: "5px 14px", fontSize: 12, color: "#666" }}>🔍 Search mail</div>
      </div>
      {/* Email meta */}
      <div style={{ background: "#fafafa", borderBottom: "1px solid #e8e8e8", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#1D5874", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>H</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#202124" }}>HCP Campaign Studio <span style={{ fontWeight: 400, color: "#5f6368" }}>&lt;noreply@hcp-studio.com&gt;</span></div>
          <div style={{ fontSize: 12, color: "#5f6368" }}>to me · just now</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ color: "#5f6368", fontSize: 18, display: "flex", gap: 8 }}>
          <span style={{ cursor: "pointer" }}>↩</span>
          <span style={{ cursor: "pointer" }}>⋯</span>
        </div>
      </div>
      {/* Email body */}
      <div style={{ overflowY: "auto", maxHeight: 460 }} dangerouslySetInnerHTML={{ __html: emailHtml }} />
    </div>
  );
}

function MobileFrame({ emailHtml }: { emailHtml: string }) {
  return (
    <div style={{ width: 393, borderRadius: 50, overflow: "hidden", border: "10px solid #1a1a1a", boxShadow: "0 40px 80px -20px rgba(0,0,0,0.55), inset 0 0 0 2px #333", background: "#1a1a1a", margin: "0 auto" }}>
      {/* Status bar */}
      <div style={{ background: "#000", padding: "12px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>9:41</span>
        <div style={{ width: 120, height: 34, borderRadius: 22, background: "#000", border: "2px solid #1a1a1a", position: "absolute", left: "50%", transform: "translateX(-50%)", top: 10 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white"><rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4"/><rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6"/><rect x="9" y="0" width="3" height="12" rx="1" opacity="0.8"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="white"><path d="M8 2.4C5.2 2.4 2.7 3.6 1 5.6L0 4.4C2 2 4.8.8 8 .8s6 1.2 8 3.6l-1 1.2C13.3 3.6 10.8 2.4 8 2.4z" opacity="0.4"/><path d="M8 5.2c-1.8 0-3.4.7-4.6 1.9L2.4 6C3.8 4.5 5.8 3.6 8 3.6s4.2.9 5.6 2.4l-1 1.1C11.4 5.9 9.8 5.2 8 5.2z" opacity="0.7"/><path d="M8 8c-1 0-2 .4-2.7 1.1L4.2 7.9C5.2 6.7 6.5 6 8 6s2.8.7 3.8 1.9L10.7 9.1C10 8.4 9 8 8 8z"/><circle cx="8" cy="11" r="1.2"/></svg>
          <div style={{ display: "flex", alignItems: "center", gap: 1 }}>
            <div style={{ width: 22, height: 11, borderRadius: 3, border: "1.5px solid white", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "75%", background: "white", borderRadius: 1 }} />
            </div>
            <div style={{ width: 2, height: 5, background: "white", borderRadius: 1 }} />
          </div>
        </div>
      </div>
      {/* Mail header */}
      <div style={{ background: "white", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #e5e5ea" }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#1D5874", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>H</div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600 }}>HCP Campaign Studio</div>
          <div style={{ fontSize: 11, color: "#8e8e93" }}>to me · now</div>
        </div>
      </div>
      {/* Email body */}
      <div style={{ background: "#f2f2f7", overflowY: "auto", maxHeight: 540 }} dangerouslySetInnerHTML={{ __html: emailHtml }} />
      {/* Home indicator */}
      <div style={{ background: "#000", padding: "8px 0 10px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 134, height: 5, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EmailPreview() {
  const { setup, selectedTemplate, generatedEmail, previewDevice, setPreviewDevice, setStep, reset } = useCampaignStore();
  const [copied, setCopied] = useState(false);
  const [showHtmlModal, setShowHtmlModal] = useState(false);
  const [rawHtml, setRawHtml] = useState("");
  const [htmlCopied, setHtmlCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setShowHtmlModal(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  if (!generatedEmail) return null;

  const toneColor = TONE_COLOR_HEX[generatedEmail.tone] ?? "#0095FF";
  const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL ?? "your.email@example.com";

  const handleCopy = async () => {
    const text = `Subject: ${generatedEmail.subject}\n\n${generatedEmail.headline}\n\n${generatedEmail.preheader}\n\n${generatedEmail.body.replace(/<[^>]+>/g, "")}\n\n${generatedEmail.cta}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewHtml = () => {
    const emailHtml = buildEmailHtml({
      headline: generatedEmail.headline, preheader: generatedEmail.preheader,
      body: generatedEmail.body, cta: generatedEmail.cta, toneColor,
      concept: selectedTemplate?.concept ?? setup.campaignType,
      therapyArea: setup.therapyArea, isDesktop: true,
    });
    const full = `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width,initial-scale=1">\n  <title>${generatedEmail.subject}</title>\n  <style>*{box-sizing:border-box;}body{margin:0;padding:16px;background:#f5f5f0;font-family:-apple-system,sans-serif;}.wrapper{max-width:600px;margin:0 auto;background:white;border-radius:8px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);}</style>\n</head>\n<body>\n  <div class="wrapper">\n${emailHtml}\n  </div>\n</body>\n</html>`;
    setRawHtml(full);
    setShowHtmlModal(true);
  };

  const handleSendTest = () => {
    const plainBody = [
      generatedEmail.headline, "",
      generatedEmail.preheader, "",
      generatedEmail.body.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 1200), "",
      generatedEmail.cta, "", "—", "Sent via HCP Campaign Studio (test send)",
    ].join("\n");
    window.location.href = `mailto:${userEmail}?subject=${encodeURIComponent(generatedEmail.subject)}&body=${encodeURIComponent(plainBody)}`;
  };

  const concept = selectedTemplate?.concept ?? setup.campaignType;
  const therapyArea = setup.therapyArea;

  const desktopHtml = buildEmailHtml({ headline: generatedEmail.headline, preheader: generatedEmail.preheader, body: generatedEmail.body, cta: generatedEmail.cta, toneColor, concept, therapyArea, isDesktop: true });
  const mobileHtml = buildEmailHtml({ headline: generatedEmail.headline, preheader: generatedEmail.preheader, body: generatedEmail.body, cta: generatedEmail.cta, toneColor, concept, therapyArea, isDesktop: false });

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <p style={{ color: "var(--muted)", fontSize: 12.5, marginBottom: 4, fontWeight: 500 }}>Step 4 of 4</p>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>Preview your email</h1>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>
            Subject: <strong style={{ color: "var(--ink)" }}>{generatedEmail.subject}</strong>
          </p>
        </div>
        <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
          <button onClick={handleViewHtml} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "white", fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
            <Code size={13} /> View HTML
          </button>
          <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "white", fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
            {copied ? <><CheckCheck size={13} style={{ color: "var(--leaf)" }} /> Copied!</> : <><Copy size={13} /> Copy</>}
          </button>
          <button onClick={handleSendTest} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--line)", background: "white", fontSize: 13, color: "var(--ink)", cursor: "pointer" }}>
            <Send size={13} /> Send test
          </button>
          <button onClick={reset} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: "var(--radius-sm)", border: 0, background: "var(--accent)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            New campaign
          </button>
        </div>
      </div>

      {/* Device toggle — Desktop / Mobile / Both */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
        <div style={{ display: "inline-flex", background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius-sm)", padding: 3 }}>
          {([
            { id: "desktop", icon: <Monitor size={13} />, label: "Desktop" },
            { id: "mobile",  icon: <Smartphone size={13} />, label: "Mobile" },
            { id: "both",    icon: null, label: "Both" },
          ] as const).map(({ id, icon, label }) => (
            <button key={id} onClick={() => setPreviewDevice(id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 6, border: 0, background: previewDevice === id ? "var(--accent)" : "transparent", color: previewDevice === id ? "white" : "var(--muted)", fontSize: 13, fontWeight: previewDevice === id ? 600 : 400, cursor: "pointer", transition: "all 0.15s" }}>
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Email frame */}
      <div style={{
        background: previewDevice === "mobile" ? "#0d0d0d" : "#e8e4dc",
        borderRadius: "var(--radius-lg)",
        padding: previewDevice === "mobile" ? "28px 16px" : previewDevice === "both" ? "32px 24px" : "32px 24px",
        minHeight: 480,
      }}>
        {previewDevice === "desktop" && <DesktopFrame subject={generatedEmail.subject} emailHtml={desktopHtml} />}
        {previewDevice === "mobile" && <MobileFrame emailHtml={mobileHtml} />}
        {previewDevice === "both" && (
          <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "flex-start" }}>
            <DesktopFrame subject={generatedEmail.subject} emailHtml={desktopHtml} />
            <MobileFrame emailHtml={mobileHtml} />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: 20 }}>
        <button onClick={() => setStep(3)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", background: "none", border: 0, cursor: "pointer" }}>
          <ArrowLeft size={14} /> Back to editor
        </button>
      </div>

      {/* HTML Source Modal */}
      {showHtmlModal && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowHtmlModal(false); }}
        >
          <div style={{ background: "#1e1e1e", borderRadius: 10, overflow: "hidden", width: "100%", maxWidth: 780, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
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
              <button onClick={() => setShowHtmlModal(false)} style={{ background: "none", border: 0, cursor: "pointer", color: "#8b949e", padding: 4 }}>
                <X size={16} />
              </button>
            </div>
            <pre style={{ flex: 1, overflowY: "auto", margin: 0, padding: "16px 20px", fontSize: 12, lineHeight: 1.6, color: "#e6edf3", fontFamily: "'SF Mono','Fira Code','Consolas',monospace", whiteSpace: "pre-wrap", wordBreak: "break-all", background: "#1e1e1e" }}>
              {rawHtml}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
