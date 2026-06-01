import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES, TONE_MAP, CONCEPT_MAP } from "@/data/templates";
import { getClient, MODEL } from "@/lib/openrouter";

const FALLBACK: Record<string, { text: string; audience: string; recs: object[] }> = {
  "phase iii": {
    text: "For a Phase III readout targeting senior oncologists, I'd recommend a **Clinical** tone — your audience wants data upfront with methods below.",
    audience: "Oncology · Senior / KOL · 4,280 HCPs",
    recs: [
      { id: "pivotal-data",    name: "Pivotal data, plainly stated",   tone: "Clinical",  concept: "Clinical Data",  stars: 4.8, opens: "42%", score: 97, reason: "Phase III data focus, clinical tone" },
      { id: "topline-embargo", name: "Topline embargoed — 8 AM ET",    tone: "Urgent",    concept: "Clinical Data",  stars: 4.6, opens: "55%", score: 88, reason: "High open rate, embargo-ready format" },
    ],
  },
  "re-engage": {
    text: "Re-engagement works best when low-pressure. Use an **Empathetic** tone — acknowledge the silence, offer something useful.",
    audience: "Cardiology · Mid-career · 9,120 HCPs",
    recs: [
      { id: "miss-you",     name: "We missed you at grand rounds", tone: "Empathetic",     concept: "Re-engagement",    stars: 4.2, opens: "29%", score: 96, reason: "Purpose-built for lapsed HCPs" },
      { id: "peer-letter",  name: "A letter from a colleague",    tone: "Conversational", concept: "CME Series",        stars: 4.6, opens: "51%", score: 84, reason: "Peer-to-peer feel, high open rate" },
    ],
  },
  "cme": {
    text: "CME series emails need to be **Educational** but concise — lead with credit value and a clear content preview.",
    audience: "Endocrine & Metabolic · CME-active · 2,840 HCPs",
    recs: [
      { id: "cme-series",    name: "CME series — 12 weeks, 12 cases",    tone: "Educational", concept: "CME Series",      stars: 4.4, opens: "33%", score: 98, reason: "Exact fit for CME enrollment" },
      { id: "moa-five",      name: "The new MOA in five minutes",         tone: "Conversational", concept: "CME Series",  stars: 4.7, opens: "46%", score: 85, reason: "High engagement, bite-sized format" },
    ],
  },
  "congress": {
    text: "For a congress invite, go **Promotional** — excitement and benefit-forward messaging drives RSVPs.",
    audience: "Oncology · Senior KOL · 4,280 HCPs",
    recs: [
      { id: "congress-promo",  name: "Congress Announcement — Join Us",    tone: "Promotional", concept: "Congress Event", stars: 4.6, opens: "48%", score: 97, reason: "Built for promotional congress invites" },
      { id: "event-invitation",name: "You're Invited — Exclusive Symposium",tone: "Promotional", concept: "Congress Event", stars: 4.5, opens: "52%", score: 90, reason: "Premium invitation format" },
    ],
  },
  "guideline": {
    text: "A guideline update needs a side-by-side visual comparison. **Clinical** or **Educational** tone with annotated before/after algorithm.",
    audience: "Cardiovascular · Mid-career · 9,120 HCPs",
    recs: [
      { id: "guideline-clinical", name: "Updated Clinical Guidelines — Key Changes", tone: "Clinical",    concept: "Guideline Update", stars: 4.7, opens: "43%", score: 96, reason: "Clinical depth + key updates format" },
      { id: "guideline-2026",     name: "Guideline update — 2026 algorithm",         tone: "Educational", concept: "Guideline Update", stars: 4.7, opens: "44%", score: 88, reason: "Visual algorithm comparison" },
    ],
  },
  "patient": {
    text: "Patient case studies resonate most with an **Empathetic** tone — let the patient's voice carry the narrative.",
    audience: "Cardiology · Senior / Attending · 4,280 HCPs",
    recs: [
      { id: "patient-voice", name: "Patient voice — living with HFrEF",  tone: "Empathetic", concept: "Patient Case Study", stars: 4.8, opens: "41%", score: 98, reason: "Patient narrative + clinical view" },
      { id: "case-file",     name: "From the case files",                 tone: "Empathetic", concept: "Patient Case Study", stars: 4.9, opens: "39%", score: 93, reason: "Editorial-style, highest star rating" },
    ],
  },
};

function getFallbackKey(message: string): string {
  const t = message.toLowerCase();
  if (/phase iii|phase3|readout|pivotal|trial data/.test(t)) return "phase iii";
  if (/re-engage|lapsed|reactivat|missed|winback/.test(t)) return "re-engage";
  if (/cme|credit|education/.test(t)) return "cme";
  if (/congress|satellite|rsvp|invite|esmo|asco/.test(t)) return "congress";
  if (/guideline|algorithm|protocol/.test(t)) return "guideline";
  if (/patient|case study|empathetic/.test(t)) return "patient";
  return "congress";
}

function buildTemplateList(): string {
  return TEMPLATES.map((t) =>
    `- id:${t.id} | "${t.title}" | tone:${TONE_MAP[t.tone] ?? t.tone} | concept:${CONCEPT_MAP[t.concept] ?? t.concept} | opens:${t.opens} | stars:${t.stars}`
  ).join("\n");
}

export async function POST(req: NextRequest) {
  const { message, therapyArea = "Oncology", audience = "HCP" } = await req.json();

  const client = getClient();
  if (client) {
    try {
      const prompt = `Campaign context:
- Therapy area: ${therapyArea}
- Audience: ${audience}
- User message: "${message}"

Available templates:
${buildTemplateList()}

Respond with JSON:
{
  "text": "2-3 sentence recommendation (use **bold** for emphasis)",
  "audience": "suggested audience description with size estimate",
  "recs": [{"id":"...","name":"...","tone":"...","concept":"...","stars":4.5,"opens":"42%","score":92,"reason":"one sentence why"}]
}
Include 2-3 best-matching templates. Score 0-100.`;

      const response = await client.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an HCP campaign strategist. Output valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.6,
        max_tokens: 600,
      });

      const raw = response.choices[0]?.message?.content ?? "{}";
      const result = JSON.parse(raw);
      return NextResponse.json({
        text: result.text ?? "Here are my recommendations.",
        audience: result.audience ?? "",
        recs: result.recs ?? [],
      });
    } catch (e) {
      console.error("ai/chat failed:", e);
    }
  }

  const key = getFallbackKey(message);
  const fb = FALLBACK[key] ?? FALLBACK.congress;
  return NextResponse.json(fb);
}
