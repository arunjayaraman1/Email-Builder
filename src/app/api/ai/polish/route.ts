import { NextRequest, NextResponse } from "next/server";
import { getClient, MODEL } from "@/lib/openrouter";

const SECTION_PROMPTS: Record<string, string> = {
  headline: "Make this headline more compelling and action-oriented. Keep it under 15 words.",
  body: "Polish this body copy to be clearer, more engaging, and medically accurate. Keep 2-3 short paragraphs.",
  cta: "Rewrite this call-to-action to be more direct and compelling. Keep it under 5 words.",
  subject: "Rewrite this email subject line to improve open rates. Keep it under 60 characters.",
};

export async function POST(req: NextRequest) {
  const { section, content, tone, therapyArea, audience, context } = await req.json();

  if (!content?.trim()) {
    return NextResponse.json({ polished: content });
  }

  const client = getClient();

  if (!client) {
    return NextResponse.json(
      { error: "AI polish requires an API key", polished: content },
      { status: 503 }
    );
  }

  const sectionInstruction = SECTION_PROMPTS[section] ?? "Polish this text to be more professional and engaging.";

  const prompt = `You are an expert HCP email copywriter. Polish the following email ${section} for a healthcare professional audience.

Context:
- Email tone: ${tone}
- Therapy area: ${therapyArea}
- Audience: ${audience}${context ? `\n- Campaign context: ${context}` : ""}

Instruction: ${sectionInstruction}
Keep the ${tone} tone throughout. Do NOT invent drug names, statistics, or clinical claims.

Current ${section}:
"${content}"

Return JSON only: {"polished": "improved text here"}`;

  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an expert HCP email copywriter. Output valid JSON only." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 300,
    });

    const raw = response.choices[0]?.message?.content ?? "{}";
    // Strip markdown fences if the model wraps JSON in ```json ... ```
    const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    const result = JSON.parse(cleaned);
    const polished = result.polished?.trim() || content;

    return NextResponse.json({ polished });
  } catch (e) {
    console.error("Polish failed:", e);
    return NextResponse.json({ polished: content });
  }
}
