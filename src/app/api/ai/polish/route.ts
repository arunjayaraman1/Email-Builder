import { NextRequest, NextResponse } from "next/server";
import { generateText, MODEL } from "@/lib/cloudflare-ai";

const SECTION_PROMPTS: Record<string, string> = {
  headline: "Make this headline more compelling and action-oriented. Keep it under 15 words.",
  body: "Polish this body copy to be clearer, more engaging, and medically accurate. Keep 2-3 short paragraphs.",
  cta: "Rewrite this call-to-action to be more direct and compelling. Keep it under 5 words.",
  subject: "Rewrite this email subject line to improve open rates. Keep it under 60 characters.",
};

export async function POST(req: NextRequest) {
  const body = await req.json() as { section: string; content: string; tone: string; therapyArea: string; audience: string; context?: string };
  const { section, content, tone, therapyArea, audience, context } = body;

  if (!content?.trim()) {
    return NextResponse.json({ polished: content });
  }

  const sectionInstruction = SECTION_PROMPTS[section] ?? "Polish this text to be more professional and engaging.";

  const raw = await generateText({
    messages: [
      { role: "system", content: "You are an expert HCP email copywriter. Output valid JSON only." },
      {
        role: "user",
        content: `You are an expert HCP email copywriter. Polish the following email ${section} for a healthcare professional audience.

Context:
- Email tone: ${tone}
- Therapy area: ${therapyArea}
- Audience: ${audience}${context ? `\n- Campaign context: ${context}` : ""}

Instruction: ${sectionInstruction}
Keep the ${tone} tone throughout. Do NOT invent drug names, statistics, or clinical claims.

Current ${section}:
"${content}"

Return JSON only: {"polished": "improved text here"}`,
      },
    ],
    temperature: 0.6,
    max_tokens: 300,
    response_format: { type: "json_object" },
  });

  if (raw) {
    try {
      const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
      const result = JSON.parse(cleaned);
      const polished = result.polished?.trim() || content;
      return NextResponse.json({ polished });
    } catch (e) {
      console.error("Polish parse failed:", e);
    }
  }

  return NextResponse.json({ polished: content });
}
