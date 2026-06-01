import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { CAMPAIGNS } from "@/data/campaigns-store";
import type { CampaignRecord } from "@/data/campaigns-store";

const OPENS_MAP: Record<string, string> = {
  "congress-rsvp": "47%", "congress-promo": "48%", "pivotal-data": "42%",
  "guideline-2026": "44%", "guideline-clinical": "43%", "case-file": "39%",
  "patient-voice": "41%", "topline-embargo": "55%", "cme-series": "33%",
  "newsletter-educational": "35%", "event-invitation": "52%", "monograph": "31%",
};

export function GET() {
  return NextResponse.json([...CAMPAIGNS].reverse());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const record: CampaignRecord = {
    id: randomUUID(),
    name: body.name,
    templateId: body.templateId,
    therapyArea: body.therapyArea,
    audience: body.audience,
    campaignType: body.campaignType,
    tone: body.tone,
    subject: body.subject,
    status: body.status,
    opens: body.status === "sent" ? (OPENS_MAP[body.templateId] ?? "—") : "—",
    createdAt: new Date().toISOString(),
    scheduledAt: body.scheduledAt ?? undefined,
  };
  CAMPAIGNS.push(record);
  return NextResponse.json(record);
}
