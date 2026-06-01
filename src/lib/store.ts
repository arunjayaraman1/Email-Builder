import { create } from "zustand";
import type {
  CampaignSetup, TemplateCard, GeneratedEmail, Step,
  CampaignContext, TemplateFilters, CampaignMode, SortBy, Density,
} from "./types";

interface CampaignStore {
  // Wizard state (steps 1-4)
  step: Step;
  setup: CampaignSetup;
  recommendedTemplates: TemplateCard[];
  selectedTemplate: TemplateCard | null;
  generatedEmail: GeneratedEmail | null;
  previewDevice: "desktop" | "mobile" | "both";

  // Campaign workspace mode
  mode: CampaignMode;

  // Campaign context bar
  campaignCtx: CampaignContext;

  // Template library filters
  filters: TemplateFilters;
  sortBy: SortBy;
  density: Density;

  // Preview
  previewExpanded: boolean;

  // Actions
  setStep: (s: Step) => void;
  setSetup: (s: CampaignSetup) => void;
  setRecommendedTemplates: (t: TemplateCard[]) => void;
  setSelectedTemplate: (t: TemplateCard | null) => void;
  setGeneratedEmail: (e: GeneratedEmail | null) => void;
  setPreviewDevice: (d: "desktop" | "mobile" | "both") => void;
  setMode: (m: CampaignMode) => void;
  setCampaignCtx: (ctx: Partial<CampaignContext>) => void;
  setFilters: (f: Partial<TemplateFilters>) => void;
  setSortBy: (s: SortBy) => void;
  setDensity: (d: Density) => void;
  setPreviewExpanded: (v: boolean) => void;
  reset: () => void;
}

const DEFAULT_SETUP: CampaignSetup = {
  therapyArea: "",
  audience: "",
  geography: "",
  campaignType: "",
  tone: "",
  compliance: [],
};

const DEFAULT_CTX: CampaignContext = {
  geo: "United States",
  therapyArea: "Oncology",
  brand: "Brand A",
  audience: "Senior HCP / KOL",
  assetType: "HCP Email",
};

const DEFAULT_FILTERS: TemplateFilters = {
  concepts: [],
  tones: [],
  specialties: [],
  compliance: [],
  readTimeRange: [1, 8],
};

export const useCampaignStore = create<CampaignStore>((set) => ({
  step: 1,
  setup: DEFAULT_SETUP,
  recommendedTemplates: [],
  selectedTemplate: null,
  generatedEmail: null,
  previewDevice: "desktop",
  mode: "library",
  campaignCtx: DEFAULT_CTX,
  filters: DEFAULT_FILTERS,
  sortBy: "featured",
  density: "comfy",
  previewExpanded: false,

  setStep: (step) => set({ step }),
  setSetup: (setup) => set({ setup }),
  setRecommendedTemplates: (recommendedTemplates) => set({ recommendedTemplates }),
  setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
  setGeneratedEmail: (generatedEmail) => set({ generatedEmail }),
  setPreviewDevice: (previewDevice) => set({ previewDevice }),
  setMode: (mode) => set({ mode }),
  setCampaignCtx: (ctx) =>
    set((s) => ({ campaignCtx: { ...s.campaignCtx, ...ctx } })),
  setFilters: (f) =>
    set((s) => ({ filters: { ...s.filters, ...f } })),
  setSortBy: (sortBy) => set({ sortBy }),
  setDensity: (density) => set({ density }),
  setPreviewExpanded: (previewExpanded) => set({ previewExpanded }),
  reset: () =>
    set({
      step: 1,
      setup: DEFAULT_SETUP,
      recommendedTemplates: [],
      selectedTemplate: null,
      generatedEmail: null,
      previewDevice: "desktop",
      mode: "library",
      filters: DEFAULT_FILTERS,
      sortBy: "featured",
      density: "comfy",
      previewExpanded: false,
    }),
}));
