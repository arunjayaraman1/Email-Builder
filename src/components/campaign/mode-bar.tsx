"use client";

import { useRouter } from "next/navigation";
import { LayoutGrid, Compass, Sparkles, Bookmark, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCampaignStore } from "@/lib/store";
import { saveCampaign } from "@/lib/api";
import type { CampaignMode } from "@/lib/types";
import { useState } from "react";

const TABS: { id: CampaignMode; icon: React.ElementType; label: string; badge?: string; badgeKind?: "new" }[] = [
  { id: "library", icon: LayoutGrid,  label: "Library",       badge: "14" },
  { id: "wizard",  icon: Compass,     label: "Guided wizard" },
  { id: "ai",      icon: Sparkles,    label: "AI assistant",  badge: "Beta", badgeKind: "new" },
];

export default function ModeBar() {
  const { mode, setMode, selectedTemplate, generatedEmail, campaignCtx } = useCampaignStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const buildPayload = (status: "draft" | "scheduled") => ({
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

  const handleSchedule = async () => {
    if (!selectedTemplate && !generatedEmail) {
      toast.error("Select a template first");
      return;
    }
    setSaving(true);
    try {
      await saveCampaign(buildPayload("scheduled"));
      toast.success("Campaign scheduled!");
      router.push("/campaigns");
    } catch {
      toast.error("Failed to schedule campaign");
    } finally {
      setSaving(false);
    }
  };

  return (
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

          <button onClick={handleSchedule} disabled={saving} className="btn btn-sm primary">
            {saving ? <Loader2 size={11} className="animate-spin" /> : <Send size={12} />}
            Schedule send
          </button>
      </div>
    </div>
  );
}
