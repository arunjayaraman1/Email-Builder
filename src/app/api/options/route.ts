import { NextResponse } from "next/server";
import data from "@/temp.json";

export function GET() {
  const { meta } = data;
  return NextResponse.json({
    therapyAreas: meta.therapyAreas.map((ta: { label: string }) => ta.label),
    audiences: ["HCP", "Patient"],
    geographies: ["US", "Europe", "APAC"],
    campaignTypes: meta.concepts.map((c: { label: string }) => c.label),
    tones: meta.tones.map((t: { label: string }) => t.label),
    compliance: ["Standard", "MLR Approved"],
    specialties: meta.specialties,
    geos: meta.geos,
    brands: meta.brands.map((b: { id: string; label: string; area: string | null; generic?: string }) => ({
      id: b.id,
      label: b.label,
      therapyArea: b.area,
      generic: b.generic,
    })),
    audiencesWithSizes: meta.audiencePresets.map((ap: { id: string; title: string; size: number; area?: string }) => ({
      id: ap.id,
      label: ap.title,
      size: ap.size,
      area: ap.area,
    })),
    assetTypes: meta.assetTypes,
  });
}
