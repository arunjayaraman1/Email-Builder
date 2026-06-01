import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL } from "@/lib/openrouter";

const FALLBACK: Record<string, { subject: string; headline: string; preheader: string; body: string; cta: string }> = {
  "congress-promotional": {
    subject: "Join us at the leading congress of 2026",
    headline: "Be among the first to see this year's most anticipated data.",
    preheader: "An exclusive invitation to join leading specialists at this year's congress.",
    body: "<p>This year's congress will feature first presentations from landmark trials, panel discussions with world-class faculty, and dedicated networking time for specialists.</p><p>Register now to secure your place. Seats are limited and filling quickly.</p>",
    cta: "Register Now",
  },
  "congress-empathetic": {
    subject: "We'd love to see you there",
    headline: "A gathering built around what matters most — your patients.",
    preheader: "Join colleagues who share your commitment to improving patient outcomes.",
    body: "<p>We understand that every hour away from your clinic is a decision. That's why this congress has been designed around the questions your patients are actually asking.</p><p>We'd be honoured to have you join us.</p>",
    cta: "Reserve My Place",
  },
  "guideline-empathetic": {
    subject: "How the new guidelines reflect what patients told us",
    headline: "The guidelines changed. Here's the patient story behind why.",
    preheader: "The 2026 update was informed by patient-reported outcomes.",
    body: "<p>When patients describe what treatment success means to them, they rarely lead with survival statistics. The 2026 guideline update incorporates patient-reported outcome measures for the first time.</p><p>This summary walks through the changes and the patient evidence that drove them.</p>",
    cta: "Read the Summary",
  },
  "patient-clinical": {
    subject: "A case worth reviewing — clinical perspective",
    headline: "What this case revealed about our current treatment approach.",
    preheader: "A detailed clinical review of an atypical presentation.",
    body: "<p>The patient presented with a clinical picture that didn't fit the standard decision tree. What followed highlights both the strengths and gaps in current guidance.</p><p>This case review is presented to stimulate clinical discussion and is not intended as prescribing guidance.</p>",
    cta: "Read the Full Case",
  },
  default: {
    subject: "New content tailored to your practice",
    headline: "Content created specifically for your therapy area and audience.",
    preheader: "AI-generated email content based on your campaign parameters.",
    body: "<p>This email has been generated based on your selected campaign parameters, designed for healthcare professionals reflecting current evidence and best practice.</p><p>You can edit any section directly in the editor before sending.</p>",
    cta: "Learn More",
  },
};

function getFallbackKey(campaignType: string, tone: string): string {
  const ct = campaignType.toLowerCase();
  const t = tone.toLowerCase();
  if (ct.includes("congress") || ct.includes("event")) {
    return t.includes("empathetic") ? "congress-empathetic" : "congress-promotional";
  }
  if (ct.includes("guideline") && t.includes("empathetic")) return "guideline-empathetic";
  if (ct.includes("patient") && t.includes("clinical")) return "patient-clinical";
  return "default";
}

export async function POST(req: NextRequest) {
  const { campaignType, tone, therapyArea, audience = "HCP" } = await req.json();

  const client = getClient();
  if (client) {
    try {
      const prompt = `Write an HCP email with these parameters:
- Campaign type: ${campaignType}
- Tone: ${tone}
- Therapy area: ${therapyArea}
- Audience: ${audience}

Return JSON: {"subject":"...","headline":"...","preheader":"...","body_html":"<p>...</p><p>...</p>","cta":"..."}
Rules: ${tone} tone, no invented drug names, body_html = 2 <p> tags.`;

      const response = await client.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an expert HCP email copywriter. Output valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const raw = response.choices[0]?.message?.content ?? "{}";
      const result = JSON.parse(raw);
      const required = ["subject", "headline", "preheader", "body_html", "cta"];
      if (required.every((k) => k in result)) {
        return NextResponse.json({
          subject: result.subject, headline: result.headline,
          preheader: result.preheader, body: result.body_html,
          cta: result.cta, tone, templateId: "ai-generated",
        });
      }
    } catch (e) {
      console.error("generate-from-filters failed:", e);
    }
  }

  const key = getFallbackKey(campaignType, tone);
  const fb = FALLBACK[key] ?? FALLBACK.default;
  return NextResponse.json({
    subject: fb.subject, headline: fb.headline,
    preheader: fb.preheader,
    body: fb.body.replace("the selected therapy area", therapyArea),
    cta: fb.cta, tone, templateId: "ai-generated",
  });
}
