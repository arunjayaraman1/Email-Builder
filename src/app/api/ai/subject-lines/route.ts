import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES, TONE_MAP } from "@/data/templates";
import { getClient, MODEL } from "@/lib/openrouter";

const FALLBACK: Record<string, string[]> = {
  clinical:       ["New data on {ta} — see the numbers", "Evidence update: {ta} outcomes", "Phase III results you should review"],
  conversational: ["Quick update — {ta}", "What's changing in {ta} practice", "A few things worth knowing this week"],
  urgent:         ["Last chance — register before midnight", "Seats filling fast — {ta} symposium", "Don't miss this — closes tonight"],
  educational:    ["5-minute explainer: {ta} algorithm", "What the new guidelines mean for you", "Updated {ta} pathway — annotated"],
  promotional:    ["Now approved: expanded {ta} indication", "Your {ta} patients may be eligible now", "New option for your {ta} practice"],
  empathetic:     ["A case from the {ta} clinic", "One patient's story — and what it changed", "From the field: {ta} in real practice"],
};

export async function POST(req: NextRequest) {
  const { templateId, therapyArea, audience } = await req.json();

  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const client = getClient();
  if (client) {
    try {
      const tone = TONE_MAP[template.tone] ?? template.tone;
      const prompt = `Generate 3 subject line variations for this HCP email:
- Template: ${template.title} (${tone} tone, ${template.concept} concept)
- Therapy area: ${therapyArea}, Audience: ${audience}

Return JSON: {"subject_lines":["...","...","..."]}
Each under 60 chars, different angles (urgency/curiosity/evidence). HCP-appropriate.`;

      const response = await client.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an HCP email copywriter. Output valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 200,
      });

      const raw = response.choices[0]?.message?.content ?? "{}";
      const result = JSON.parse(raw);
      if (Array.isArray(result.subject_lines) && result.subject_lines.length > 0) {
        return NextResponse.json({ subjectLines: result.subject_lines.slice(0, 3) });
      }
    } catch (e) {
      console.error("subject-lines AI failed:", e);
    }
  }

  const fallback = (FALLBACK[template.tone] ?? FALLBACK.clinical)
    .map((s) => s.replace("{ta}", therapyArea));
  return NextResponse.json({ subjectLines: fallback });
}
