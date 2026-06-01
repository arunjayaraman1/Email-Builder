"use client";

import { useState, useEffect } from "react";
import { Check, Loader2, CheckCircle, XCircle } from "lucide-react";

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
        {title}
      </div>
      <div style={{ background: "white", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

function SettingsRow({
  label, sublabel, children,
}: { label: string; sublabel?: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
      padding: "14px 20px", borderBottom: "1px solid var(--line-2)",
    }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{sublabel}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function EditableField({ defaultValue, onSave, readOnly }: { defaultValue: string; onSave?: (v: string) => void; readOnly?: boolean }) {
  const [value, setValue] = useState(defaultValue);
  const [saved, setSaved] = useState(false);

  const handleBlur = () => {
    if (onSave && value !== defaultValue) {
      onSave(value);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        readOnly={readOnly}
        style={{
          padding: "6px 10px",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-sm)",
          fontSize: 13,
          color: "var(--ink)",
          background: readOnly ? "var(--paper)" : "white",
          width: 200,
          outline: 0,
          cursor: readOnly ? "default" : "text",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
        onFocus={(e) => {
          if (!readOnly) {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-soft)";
          }
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      {/* Fixed-size container prevents layout shift */}
      <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Check size={13} style={{ color: "var(--leaf)", opacity: saved ? 1 : 0, transition: "opacity 0.2s" }} />
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [apiStatus, setApiStatus] = useState<"loading" | "connected" | "error">("loading");
  const [userName, setUserName] = useState(
    typeof window !== "undefined" ? localStorage.getItem("hcp_user_name") || (process.env.NEXT_PUBLIC_USER_NAME ?? "Arun") : "Arun"
  );
  const [userInitials, setUserInitials] = useState(
    typeof window !== "undefined" ? localStorage.getItem("hcp_user_initials") || (process.env.NEXT_PUBLIC_USER_INITIALS ?? "AP") : "AP"
  );

  const userEmail = process.env.NEXT_PUBLIC_USER_EMAIL ?? "arun.jayaraman@newpage.io";

  useEffect(() => {
    fetch("/api/options")
      .then((r) => r.ok ? setApiStatus("connected") : setApiStatus("error"))
      .catch(() => setApiStatus("error"));
  }, []);

  const saveUserName = (v: string) => {
    setUserName(v);
    localStorage.setItem("hcp_user_name", v);
  };

  const saveUserInitials = (v: string) => {
    setUserInitials(v);
    localStorage.setItem("hcp_user_initials", v);
  };

  return (
    <div style={{ padding: "28px 32px", maxWidth: 680 }}>

      <SettingsSection title="User Profile">
        <SettingsRow label="Display name" sublabel="Shown in the sidebar and dashboard greeting">
          <EditableField defaultValue={userName} onSave={saveUserName} />
        </SettingsRow>
        <SettingsRow label="Initials" sublabel="Shown in avatars">
          <EditableField defaultValue={userInitials} onSave={saveUserInitials} />
        </SettingsRow>
        <SettingsRow label="Email" sublabel="Used for test email notifications">
          <EditableField defaultValue={userEmail} readOnly />
        </SettingsRow>
        <div style={{ padding: "14px 20px" }}>
          <SettingsRow label="Role" sublabel="Access level within the studio">
            <span style={{
              fontSize: 12, fontWeight: 600, padding: "3px 10px",
              borderRadius: 999, background: "var(--accent-soft)", color: "var(--accent)",
            }}>
              {process.env.NEXT_PUBLIC_USER_ROLE ?? "Admin"}
            </span>
          </SettingsRow>
        </div>
      </SettingsSection>

      <SettingsSection title="API Configuration">
        <SettingsRow
          label="OpenRouter API"
          sublabel="Powers AI email generation and recommendations"
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {apiStatus === "loading" && <Loader2 size={14} className="animate-spin" style={{ color: "var(--muted)" }} />}
            {apiStatus === "connected" && <CheckCircle size={15} style={{ color: "var(--leaf)" }} />}
            {apiStatus === "error" && <XCircle size={15} style={{ color: "var(--rose)" }} />}
            <span style={{
              fontSize: 12, fontWeight: 600,
              color: apiStatus === "connected" ? "var(--leaf)" : apiStatus === "error" ? "var(--rose)" : "var(--muted)",
            }}>
              {apiStatus === "loading" ? "Checking…" : apiStatus === "connected" ? "Connected" : "Not reachable"}
            </span>
          </div>
        </SettingsRow>
        <SettingsRow label="AI Model" sublabel="Set via OPENROUTER_MODEL in .env.local">
          <span style={{ fontSize: 13, color: "var(--ink)", fontFamily: "monospace" }}>
            {process.env.NEXT_PUBLIC_OPENROUTER_MODEL ?? "stepfun/step-3.7-flash"}
          </span>
        </SettingsRow>
        <SettingsRow label="API Routes" sublabel="Built into Next.js (single service)">
          <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "monospace" }}>
            /api/*
          </span>
        </SettingsRow>
      </SettingsSection>

      <SettingsSection title="About">
        <SettingsRow label="Application" sublabel="HCP email campaign builder">
          <span style={{ fontSize: 13, color: "var(--muted)" }}>HCP Campaign Studio</span>
        </SettingsRow>
        <SettingsRow label="Version" sublabel="">
          <span style={{
            fontSize: 11.5, fontWeight: 600, padding: "2px 9px", borderRadius: 999,
            background: "var(--indigo-soft)", color: "var(--indigo)",
          }}>
            Phase 1 Prototype
          </span>
        </SettingsRow>
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--line-2)" }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
            Built with Next.js 14 + FastAPI. Templates are predefined for the demo phase.
            Phase 2 adds real AI generation. Phase 3 adds database, auth, and collaboration.
          </p>
        </div>
      </SettingsSection>

    </div>
  );
}
