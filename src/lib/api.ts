import type { Options, TemplateCard, GeneratedEmail } from "./types";

// Relative URL — works for both dev and production (single Next.js service)
const API = "";

export async function getOptions(): Promise<Options> {
  const res = await fetch(`${API}/api/options`);
  if (!res.ok) throw new Error("Failed to load options");
  return res.json();
}

export async function getTemplates(): Promise<TemplateCard[]> {
  const res = await fetch(`${API}/api/templates`);
  if (!res.ok) throw new Error("Failed to load templates");
  return res.json();
}

export async function recommendTemplates(
  campaignType: string,
  tone: string,
  audience?: string
): Promise<TemplateCard[]> {
  const res = await fetch(`${API}/api/templates/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ campaignType, tone, audience }),
  });
  if (!res.ok) throw new Error("Failed to get recommendations");
  return res.json();
}

export async function generateEmail(
  templateId: string,
  audience: string,
  therapyArea: string,
  options?: {
    subject?: string;
    brand?: string;
    geo?: string;
    tone?: string;
    campaignType?: string;
    brief?: string;
  }
): Promise<GeneratedEmail> {
  const res = await fetch(`${API}/api/email/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, audience, therapyArea, ...options }),
  });
  if (!res.ok) throw new Error("Failed to generate email");
  return res.json();
}

export async function getSubjectLines(
  templateId: string,
  therapyArea: string,
  audience: string
): Promise<string[]> {
  const res = await fetch(`${API}/api/ai/subject-lines`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ templateId, therapyArea, audience }),
  });
  if (!res.ok) throw new Error("Failed to get subject lines");
  const data = await res.json();
  return data.subjectLines ?? [];
}

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

export async function getCampaigns(): Promise<CampaignRecord[]> {
  const res = await fetch(`${API}/api/campaigns`);
  if (!res.ok) throw new Error("Failed to load campaigns");
  return res.json();
}

export async function saveCampaign(body: {
  name: string;
  templateId: string;
  therapyArea: string;
  audience: string;
  campaignType: string;
  tone: string;
  subject: string;
  status: "draft" | "scheduled";
  scheduledAt?: string;
}): Promise<CampaignRecord> {
  const res = await fetch(`${API}/api/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to save campaign");
  return res.json();
}

export interface ChatRec {
  id: string;
  name: string;
  tone: string;
  concept: string;
  stars: number;
  opens: string;
  score: number;
  reason: string;
}

export interface ChatResponse {
  text: string;
  audience: string;
  recs: ChatRec[];
}

export async function aiChat(
  message: string,
  therapyArea: string,
  audience: string
): Promise<ChatResponse> {
  const res = await fetch(`${API}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, therapyArea, audience }),
  });
  if (!res.ok) throw new Error("Failed to get AI response");
  return res.json();
}

export async function generateFromFilters(params: {
  campaignType: string;
  tone: string;
  therapyArea: string;
  audience: string;
}): Promise<GeneratedEmail> {
  const res = await fetch(`${API}/api/ai/generate-from-filters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error("Failed to generate from filters");
  return res.json();
}

export async function polishContent(params: {
  section: string;
  content: string;
  tone: string;
  therapyArea: string;
  audience: string;
  context?: string;
}): Promise<string> {
  const res = await fetch(`${API}/api/ai/polish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) return params.content; // silent fallback
  const data = await res.json();
  return data.polished ?? params.content;
}
