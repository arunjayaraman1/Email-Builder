export interface GeoOption { id: string; label: string; sub: string; flag: string; }
export interface BrandOption { id: string; label: string; therapyArea: string | null; generic?: string; }
export interface AudienceOption { id: string; label: string; size: number; area?: string; }
export interface AssetTypeOption { id: string; label: string; sub: string; icon: string; }

export interface Options {
  therapyAreas: string[];
  audiences: string[];
  geographies: string[];
  campaignTypes: string[];
  tones: string[];
  compliance: string[];
  specialties?: string[];
  geos?: GeoOption[];
  brands?: BrandOption[];
  audiencesWithSizes?: AudienceOption[];
  assetTypes?: AssetTypeOption[];
}

export interface TemplateCard {
  id: string;
  name: string;
  description: string;
  tone: string;
  concept: string;
  opens: string;
  stars: number;
  badge?: string | null;
  duration: string;
  audiences?: string[];
  compliance?: string[];
}

export interface GeneratedEmail {
  subject: string;
  headline: string;
  preheader: string;
  body: string;
  cta: string;
  tone: string;
  templateId: string;
}

export interface CampaignSetup {
  therapyArea: string;
  audience: string;
  geography: string;
  campaignType: string;
  tone: string;
  compliance: string[];
}

export interface CampaignContext {
  geo: string;
  therapyArea: string;
  brand: string;
  audience: string;
  assetType: string;
}

export interface TemplateFilters {
  concepts: string[];
  tones: string[];
  specialties: string[];
  compliance: string[];
  readTimeRange: [number, number];
}

export type Step = 1 | 2 | 3 | 4;
export type CampaignMode = "library" | "wizard" | "ai";
export type SortBy = "featured" | "stars" | "opens" | "new";
export type Density = "comfy" | "dense";
