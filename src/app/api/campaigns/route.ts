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
  const data = await req.json() as Record<string, unknown>;
  const record: CampaignRecord = {
    id: randomUUID(),
    name: data.name as string,
    templateId: data.templateId as string,
    therapyArea: data.therapyArea as string,
    audience: data.audience as string,
    campaignType: data.campaignType as string,
    tone: data.tone as string,
    subject: data.subject as string,
    status: data.status as string,
    opens: data.status === "sent" ? (OPENS_MAP[data.templateId as string] ?? "—") : "—",
    createdAt: new Date().toISOString(),
    scheduledAt: data.scheduledAt as string | undefined,
  };
  CAMPAIGNS.push(record);
  return NextResponse.json(record);
}
