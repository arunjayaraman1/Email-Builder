import { randomUUID } from "crypto";

export interface CampaignRecord {
  id: string;
  name: string;
  templateId: string;
  therapyArea: string;
  audience: string;
  campaignType: string;
  tone: string;
  subject: string;
  status: string;
  opens: string;
  createdAt: string;
  scheduledAt?: string;
}

// In-memory store — persists for dev server lifetime
export const CAMPAIGNS: CampaignRecord[] = [];

function opensForTemplate(templateId: string): string {
  const map: Record<string, string> = {
    "congress-rsvp": "47%", "congress-promo": "48%", "pivotal-data": "42%",
    "guideline-2026": "44%", "guideline-clinical": "43%", "case-file": "39%",
    "patient-voice": "41%", "topline-embargo": "55%", "cme-series": "33%",
    "newsletter-educational": "35%", "event-invitation": "52%", "monograph": "31%",
  };
  return map[templateId] ?? "—";
}

// Seed with 4 entries
const seedData = [
  { name: "ESMO Satellite Symposium Invite", templateId: "congress-rsvp",    therapyArea: "Oncology",    audience: "HCP", campaignType: "Congress Event",   tone: "Urgent",      subject: "Two seats left at the satellite symposium", status: "sent",      date: "2026-05-28T09:00:00" },
  { name: "Guideline Update — CV Algorithm", templateId: "guideline-2026",   therapyArea: "Cardiology",  audience: "HCP", campaignType: "Guideline Update", tone: "Educational", subject: "What changed in the algorithm — and what didn't", status: "sent",      date: "2026-05-22T09:00:00" },
  { name: "CME Series Q2 Enrollment",        templateId: "cme-series",       therapyArea: "Oncology",    audience: "HCP", campaignType: "Newsletter",       tone: "Educational", subject: "Twelve weeks, twelve cases, six credits", status: "scheduled", date: "2026-06-05T09:00:00" },
  { name: "RWE Snapshot — Cardiology",       templateId: "rwe-snapshot",     therapyArea: "Cardiology",  audience: "HCP", campaignType: "Guideline Update", tone: "Clinical",    subject: "What 11,402 patient-years tell us", status: "draft",     date: "2026-06-01T09:00:00" },
];

for (const d of seedData) {
  CAMPAIGNS.push({
    id: randomUUID(),
    name: d.name,
    templateId: d.templateId,
    therapyArea: d.therapyArea,
    audience: d.audience,
    campaignType: d.campaignType,
    tone: d.tone,
    subject: d.subject,
    status: d.status,
    opens: d.status === "sent" ? opensForTemplate(d.templateId) : "—",
    createdAt: d.date,
  });
}
