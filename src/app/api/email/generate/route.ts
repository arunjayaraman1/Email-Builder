import { NextRequest, NextResponse } from "next/server";
import { TEMPLATES, TONE_MAP } from "@/data/templates";
import { getClient, MODEL } from "@/lib/openrouter";

const CTA_MAP: Record<string, string> = {
  rsvp: "Reserve My Seat", stats: "View Full Data", letter: "Read the Full Letter",
  case: "Read the Full Case", algorithm: "See the Full Algorithm",
  series: "Enroll Now — Free", approval: "View Prescribing Information",
  winback: "Watch the Recording", embargo: "Access the Full Data",
  explainer: "Read the Full Explainer", rwe: "Download the RWE Report",
  voice: "Read the Full Story", rep: "Download the Resources",
  digest: "Read the Full Monograph Update",
};

function personalize(text: string, therapyArea: string, audience: string): string {
  return text
    .replace(/oncology specialists/gi, `${therapyArea} specialists`)
    .replace(/Oncology/g, therapyArea)
    .replace(/Senior \/ Attending/g, audience)
    
    .replace(/KOL \/ Thought leader/g, audience);
}

export async function POST(req: NextRequest) {
  const {
    templateId, audience, therapyArea,
    subject: subjectHint,
    brand, geo, tone: reqTone, campaignType,
    brief,  // free-text campaign brief from the user
  } = await req.json();

  const template = TEMPLATES.find((t) => t.id === templateId);
  if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

  const toneLabel = TONE_MAP[template.tone] ?? template.tone;

  // Try AI generation
  const client = getClient();
  if (client) {
    try {
      const heroContext = template.hero
        ? `Hero eyebrow: ${template.hero.eyebrow}\nHero sub: ${template.hero.sub}`
        : "";

      // Build rich context section
      const contextLines = [
        `- Template: ${template.title} (${toneLabel} tone, ${template.concept} concept)`,
        `- Therapy area: ${therapyArea}`,
        `- Audience: ${audience}`,
        brand        ? `- Brand / product: ${brand}` : null,
        geo          ? `- Geography: ${geo}` : null,
        campaignType ? `- Campaign type: ${campaignType}` : null,
        `- Description: ${template.desc}`,
        heroContext || null,
        brief        ? `- Campaign brief (key context from user): "${brief}"` : null,
        subjectHint  ? `- Preferred subject line: ${subjectHint}` : null,
      ].filter(Boolean).join("\n");

      const prompt = `Generate an HCP email with this context:
${contextLines}

Return JSON: {"subject":"...","headline":"...","preheader":"...","body_html":"<p>...</p><p>...</p>","cta":"..."}
Rules:
- Tone must be ${toneLabel} throughout
- Use any specific details from the campaign brief (event name, drug, data, speaker, etc.) directly in the copy
- Do NOT invent drug names or statistics unless they appear in the brief
- body_html: 2-3 <p> tags, medically accurate, HCP-appropriate
- Subject under 60 characters`;

      const response = await client.chat.completions.create({
        model: MODEL,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an expert HCP email copywriter. Output valid JSON only." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 900,
      });

      const raw = response.choices[0]?.message?.content ?? "{}";
      const result = JSON.parse(raw);
      const required = ["subject", "headline", "preheader", "body_html", "cta"];
      if (required.every((k) => k in result)) {
        return NextResponse.json({
          subject: result.subject, headline: result.headline,
          preheader: result.preheader, body: result.body_html,
          cta: result.cta, tone: toneLabel, templateId,
        });
      }
    } catch (e) {
      console.error("AI generate failed:", e);
    }
  }

  // Fallback: static template content with simple personalization
  const hero = template.hero;
  const subject = subjectHint ?? personalize(hero?.title ?? template.title, therapyArea, audience);
  const headline = personalize(hero?.title ?? template.title, therapyArea, audience);
  const preheader = personalize(hero?.sub ?? template.desc, therapyArea, audience);
  const body = personalize(template.body_html, therapyArea, audience);
  const cta = CTA_MAP[template.body_type] ?? "Learn More";

  return NextResponse.json({ subject, headline, preheader, body, cta, tone: toneLabel, templateId });
}
