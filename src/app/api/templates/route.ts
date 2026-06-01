import { NextResponse } from "next/server";
import data from "@/temp.json";

export function GET() {
  const { meta, templates } = data;
  const cards = templates.map((t) => ({
    id: t.id,
    name: t.title,
    description: t.desc,
    tone: (meta.toneMap as Record<string, string>)[t.tone] ?? t.tone,
    concept: (meta.conceptMap as Record<string, string>)[t.concept] ?? t.concept,
    opens: t.opens,
    stars: t.stars,
    badge: t.badge,
    duration: t.duration,
    audiences: t.audiences,
    compliance: t.compliance,
  }));
  return NextResponse.json(cards);
}
