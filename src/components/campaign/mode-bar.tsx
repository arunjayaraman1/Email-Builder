"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, Compass, Sparkles, Bookmark, Send, Loader2, Calendar, X } from "lucide-react";
import { toast } from "sonner";
import { useCampaignStore } from "@/lib/store";
import { saveCampaign } from "@/lib/api";
import type { CampaignMode } from "@/lib/types";
import { useState } from "react";

const TABS: { id: CampaignMode; icon: React.ElementType; label: string; badge?: string; badgeKind?: "new" }[] = [
  { id: "library", icon: LayoutGrid,  label: "Library" },
  { id: "wizard",  icon: Compass,     label: "Guided wizard" },
  { id: "ai",      icon: Sparkles,    label: "AI assistant",  badge: "Beta", badgeKind: "new" },
];

function defaultScheduleTime(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  // Format as YYYY-MM-DDTHH:MM for datetime-local input
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T09:00`;
}

export default function ModeBar() {
  const { mode, setMode, selectedTemplate, generatedEmail, campaignCtx } = useCampaignStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState(defaultScheduleTime);

  const buildPayload = (status: "draft" | "scheduled", scheduledAt?: string) => ({
    name: generatedEmail
      ? generatedEmail.subject.slice(0, 60)
      : selectedTemplate
        ? selectedTemplate.name
        : "Untitled campaign",
    templateId: selectedTemplate?.id ?? generatedEmail?.templateId ?? "",
    therapyArea: campaignCtx.therapyArea,
    audience: campaignCtx.audience,
    campaignType: selectedTemplate?.concept ?? "",
    tone: selectedTemplate?.tone ?? generatedEmail?.tone ?? "",
    subject: generatedEmail?.subject ?? selectedTemplate?.name ?? "",
    status,
    scheduledAt,
  });

  const handleSaveBrief = async () => {
    if (!selectedTemplate && !generatedEmail) {
      toast.error("Select a template first");
      return;
    }
    setSaving(true);
    try {
      await saveCampaign(buildPayload("draft"));
      toast.success("Brief saved as draft");
    } catch {
      toast.error("Failed to save brief");
    } finally {
      setSaving(false);
    }
  };

  const handleScheduleConfirm = async () => {
    if (!scheduleDateTime) {
      toast.error("Please pick a date and time");
      return;
    }
    setSaving(true);
    setShowScheduleModal(false);
    try {
      await saveCampaign(buildPayload("scheduled", new Date(scheduleDateTime).toISOString()));
      toast.success("Campaign scheduled!");
      router.push("/campaigns");
    } catch {
      toast.error("Failed to schedule campaign");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="modebar">
        {TABS.map(({ id, icon: Icon, label, badge, badgeKind }) => {
          const active = mode === id;
          return (
            <button key={id} className="mode-tab" aria-selected={active} onClick={() => setMode(id)}>
              <Icon size={13} />
              {label}
              {badge && (
                <span className={"badge " + (badgeKind === "new" ? "new" : "")}>{badge}</span>
              )}
            </button>
          );
        })}

        <div className="right">
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--leaf)", display: "inline-block" }} />
            Live preview synced
          </span>

          <button onClick={handleSaveBrief} disabled={saving} className="btn btn-sm">
            {saving ? <Loader2 size={11} className="animate-spin" /> : <Bookmark size={12} />}
            Save brief
          </button>

          <button
            onClick={() => {
              if (!selectedTemplate && !generatedEmail) {
                toast.error("Select a template first");
                return;
              }
              setScheduleDateTime(defaultScheduleTime());
              setShowScheduleModal(true);
            }}
            disabled={saving}
            className="btn btn-sm primary"
          >
            {saving ? <Loader2 size={11} className="animate-spin" /> : <Send size={12} />}
            Schedule send
          </button>
        </div>
      </div>

      {/* Schedule date/time modal */}
      {showScheduleModal && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 400,
            background: "rgba(0,4,133,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowScheduleModal(false); }}
        >
          <div style={{
            background: "white", borderRadius: "var(--radius-lg)",
            padding: "24px 28px", width: 380,
            boxShadow: "var(--shadow-3), 0 0 0 1px var(--line)",
          }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Calendar size={16} style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Schedule campaign</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>Choose when to send this email</div>
                </div>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                style={{ color: "var(--muted)", padding: 4, borderRadius: 6 }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Campaign name preview */}
            <div style={{ background: "var(--paper-2)", borderRadius: "var(--radius-sm)", padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
              {generatedEmail?.subject.slice(0, 55) ?? selectedTemplate?.name ?? "Untitled campaign"}
            </div>

            {/* Date/time picker */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                Send date &amp; time
              </label>
              <input
                type="datetime-local"
                value={scheduleDateTime}
                onChange={(e) => setScheduleDateTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                style={{
                  width: "100%", padding: "9px 12px",
                  border: "1.5px solid var(--line)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: 14, color: "var(--ink)",
                  background: "white",
                  outline: 0,
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="btn"
                style={{ fontSize: 13 }}
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleConfirm}
                disabled={!scheduleDateTime || saving}
                className="btn primary"
                style={{ fontSize: 13 }}
              >
                {saving ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
