import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES, TONE_MAP, CONCEPT_MAP } from "@/data/templates";

// Reverse maps
const CONCEPT_REVERSE: Record<string, string> = {
  "Congress Event": "congress", "Guideline Update": "guideline",
  "Patient Case Study": "case", "Newsletter": "cme",
  "Event Invitation": "congress", "Clinical Data": "data",
  "Product Launch": "launch", "CME Series": "cme", "Re-engagement": "reengage",
  ...Object.fromEntries(Object.entries(CONCEPT_MAP).map(([k, v]) => [v, k])),
};
const TONE_REVERSE: Record<string, string> = {
  "Clinical": "clinical", "Educational": "educational",
  "Promotional": "promotional", "Empathetic": "empathetic",
  "Conversational": "conversational", "Urgent": "urgent",
};

function toCard(t: typeof TEMPLATES[0]) {
  return {
    id: t.id, name: t.title, description: t.desc,
    tone: TONE_MAP[t.tone] ?? t.tone,
    concept: CONCEPT_MAP[t.concept] ?? t.concept,
    opens: t.opens, stars: t.stars, badge: t.badge,
    duration: t.duration, audiences: t.audiences,
  };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { campaignType, tone, audience } = body as { campaignType: string; tone: string; audience?: string };

  const conceptId = CONCEPT_REVERSE[campaignType];
  const toneId = TONE_REVERSE[tone];

  const scored: [number, number, typeof TEMPLATES[0]][] = [];
  for (const t of TEMPLATES) {
    let score = 0;
    if (conceptId && t.concept === conceptId) score += 2;
    if (toneId && t.tone === toneId) score += 1;
    if (audience === "Patient" && t.audiences.includes("Patient")) score += 1;
    if (score > 0) scored.push([score, t.stars, t]);
  }
  scored.sort((a, b) => b[0] - a[0] || b[1] - a[1]);

  const top = scored.slice(0, 4).map(([, , t]) => t);
  const result = top.length > 0
    ? top
    : [...TEMPLATES].sort((a, b) => b.stars - a.stars).slice(0, 4);

  return NextResponse.json(result.map(toCard));
}
