"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight, RefreshCw, Loader2, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateEmail, getSubjectLines } from "@/lib/api";
import { useCampaignStore } from "@/lib/store";
import { TONE_COLOR } from "@/lib/tones";

export default function EmailEditor() {
  const { setup, selectedTemplate, generatedEmail, setGeneratedEmail, setStep } = useCampaignStore();
  const [regenerating, setRegenerating] = useState(false);

  const [subject, setSubject] = useState(generatedEmail?.subject ?? "");
  const [headline, setHeadline] = useState(generatedEmail?.headline ?? "");
  const [body, setBody] = useState(generatedEmail?.body ?? "");
  const [cta, setCta] = useState(generatedEmail?.cta ?? "");

  // Subject variations state
  const [subjectLines, setSubjectLines] = useState<string[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSubjectDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toneColor = TONE_COLOR[generatedEmail?.tone ?? ""] ?? "var(--accent)";

  const handleRegenerate = async () => {
    if (!selectedTemplate) return;
    setRegenerating(true);
    try {
      const email = await generateEmail(
        selectedTemplate.id,
        setup.audience,
        setup.therapyArea,
        { subject }
      );
      setGeneratedEmail(email);
      setSubject(email.subject);
      setHeadline(email.headline);
      setBody(email.body);
      setCta(email.cta);
    } catch (err) {
      console.error(err);
    } finally {
      setRegenerating(false);
    }
  };

  const handleSubjectVariations = async () => {
    if (!selectedTemplate) return;
    if (subjectLines.length > 0) {
      setShowSubjectDropdown((v) => !v);
      return;
    }
    setLoadingSubjects(true);
    setShowSubjectDropdown(true);
    try {
      const lines = await getSubjectLines(
        selectedTemplate.id,
        setup.therapyArea,
        setup.audience
      );
      setSubjectLines(lines);
    } catch (err) {
      console.error(err);
      setShowSubjectDropdown(false);
    } finally {
      setLoadingSubjects(false);
    }
  };

  const handlePreview = () => {
    setGeneratedEmail({
      ...generatedEmail!,
      subject,
      headline,
      body,
      cta,
    });
    setStep(4);
  };

  if (!generatedEmail) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 6 }}>Step 3 of 4</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
              Edit your email
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              Click any field to edit inline. Changes are saved when you hit Preview.
            </p>
          </div>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, color: "var(--muted)",
              padding: "6px 12px",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius-sm)",
              background: "white",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {regenerating
              ? <><Loader2 size={13} className="animate-spin" /> Regenerating…</>
              : <><RefreshCw size={13} /> Regenerate</>
            }
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
        {/* Email canvas */}
        <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-2)" }}>

          {/* Subject with AI variations */}
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--line-2)", background: "var(--paper)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Subject
              </div>
              {/* Subject variations button */}
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  onClick={handleSubjectVariations}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 11, color: "var(--accent)",
                    background: "var(--accent-soft)",
                    border: "1px solid rgba(29,88,116,0.15)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontWeight: 500,
                  }}
                >
                  {loadingSubjects
                    ? <Loader2 size={10} className="animate-spin" />
                    : <Sparkles size={10} />
                  }
                  {loadingSubjects ? "Loading…" : "Variations"}
                  {!loadingSubjects && <ChevronDown size={10} />}
                </button>

                {showSubjectDropdown && !loadingSubjects && subjectLines.length > 0 && (
                  <div style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 6px)",
                    background: "white",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-sm)",
                    boxShadow: "var(--shadow-3)",
                    zIndex: 50,
                    minWidth: 300,
                    maxHeight: "min(240px, 50vh)",
                    overflowY: "auto",
                  }}>
                    <div style={{ padding: "8px 12px 6px", fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: "1px solid var(--line-2)" }}>
                      AI-generated variations
                    </div>
                    {subjectLines.map((line, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSubject(line);
                          setShowSubjectDropdown(false);
                        }}
                        style={{
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          padding: "10px 12px",
                          fontSize: 13,
                          color: "var(--ink)",
                          background: "none",
                          border: 0,
                          borderTop: i === 0 ? 0 : "1px solid var(--line-2)",
                          cursor: "pointer",
                          lineHeight: 1.4,
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                      >
                        {line}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={{
                width: "100%",
                border: 0,
                outline: 0,
                background: "transparent",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--ink)",
              }}
              placeholder="Email subject line…"
            />
          </div>

          {/* Hero band */}
          <div style={{ background: toneColor, padding: "24px 28px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              {selectedTemplate?.concept} · {setup.therapyArea}
            </div>
            <textarea
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              style={{
                width: "100%",
                border: 0,
                outline: 0,
                background: "transparent",
                color: "white",
                fontSize: 20,
                fontWeight: 700,
                lineHeight: 1.35,
                resize: "none",
                minHeight: 60,
              }}
              placeholder="Email headline…"
            />
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px" }}>
            <div
              style={{
                fontSize: 14,
                color: "var(--ink)",
                lineHeight: 1.7,
                minHeight: 120,
                outline: "none",
              }}
              contentEditable
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: body }}
              onBlur={(e) => {
                const raw = e.currentTarget.innerHTML;
                const sanitized = raw
                  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                  .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
                  .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
                  .replace(/javascript\s*:/gi, "");
                setBody(sanitized);
              }}
            />
          </div>

          {/* CTA */}
          <div style={{ padding: "0 28px 28px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <input
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 999,
                  border: 0,
                  outline: 0,
                  background: toneColor,
                  color: "white",
                  fontWeight: 600,
                  fontSize: 14,
                  textAlign: "center",
                  minWidth: 160,
                }}
                placeholder="CTA label…"
              />
            </div>
          </div>

          {/* Footer */}
          <div style={{ padding: "16px 28px", borderTop: "1px solid var(--line-2)", background: "var(--paper)" }}>
            <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
              HCP Campaign Studio · This communication is intended for healthcare professionals only.
              <br />To unsubscribe, update your preferences.
            </p>
          </div>
        </div>

        {/* Context panel */}
        <div className="flex flex-col gap-4">
          <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              Campaign context
            </div>
            {[
              ["Therapy Area", setup.therapyArea],
              ["Audience", setup.audience],
              ["Geography", setup.geography],
              ["Campaign Type", setup.campaignType],
              ["Tone", setup.tone],
            ].map(([label, value]) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{value}</div>
              </div>
            ))}
            {setup.compliance.length > 0 && (
              <div style={{ marginTop: 4 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>Compliance</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {setup.compliance.map((c) => (
                    <span key={c} style={{
                      fontSize: 11, fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "var(--leaf-soft)",
                      color: "var(--leaf)",
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
              Template
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>
              {selectedTemplate?.name}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>
                <b style={{ color: "var(--ink)" }}>{selectedTemplate?.opens}</b> open rate
              </span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>
                ★ <b style={{ color: "var(--ink)" }}>{selectedTemplate?.stars}</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28 }}>
        <button
          onClick={() => { setGeneratedEmail(null); setStep(2); }}
          style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--muted)", background: "none", border: 0, cursor: "pointer" }}
        >
          <ArrowLeft size={14} /> Back to templates
        </button>
        <Button
          onClick={handlePreview}
          style={{
            background: "var(--accent)",
            color: "white",
            padding: "10px 24px",
            borderRadius: "var(--radius-sm)",
            fontSize: 14,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          Preview Email <ArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}
