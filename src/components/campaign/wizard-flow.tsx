"use client";

import { useCampaignStore } from "@/lib/store";
import CampaignSetup from "@/components/steps/campaign-setup";
import TemplatePicker from "@/components/steps/template-picker";
import EmailEditor from "@/components/steps/email-editor";
import EmailPreview from "@/components/steps/email-preview";

export default function WizardFlow() {
  const { step } = useCampaignStore();

  return (
    <div className="wizard">
      {step === 1 && <CampaignSetup />}
      {step === 2 && <TemplatePicker />}
      {step === 3 && <EmailEditor />}
      {step === 4 && <EmailPreview />}
    </div>
  );
}
