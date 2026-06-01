"use client";

import { useCampaignStore } from "@/lib/store";
import ContextBar from "@/components/campaign/context-bar";
import ModeBar from "@/components/campaign/mode-bar";
import TemplateLibrary from "@/components/campaign/template-library";
import PreviewRail from "@/components/campaign/preview-rail";
import AIChat from "@/components/campaign/ai-chat";
import WizardFlow from "@/components/campaign/wizard-flow";

export default function CampaignPage() {
  const { mode } = useCampaignStore();

  return (
    <div className="app">
      <ContextBar />
      <ModeBar />
      <div className="main">
        <div className="col col-content">
          {mode === "library" && <TemplateLibrary />}
          {mode === "wizard" && <WizardFlow />}
          {mode === "ai" && <AIChat />}
        </div>
        <div className="col col-preview">
          <PreviewRail />
        </div>
      </div>
    </div>
  );
}
