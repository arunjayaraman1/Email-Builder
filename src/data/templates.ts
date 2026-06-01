export interface Template {
  id: string;
  title: string;
  tone: string;
  concept: string;
  desc: string;
  audiences: string[];
  seniority: string[];
  duration: string;
  stars: number;
  opens: string;
  badge: string | null;
  hero: { eyebrow: string; title: string; sub: string } | null;
  body_type: string;
  body_html: string;
  compliance: string[];
}

export const CONCEPT_MAP: Record<string, string> = {
  "launch": "Product Launch",
  "data": "Clinical Data",
  "congress": "Congress Event",
  "cme": "CME Series",
  "case": "Patient Case Study",
  "guideline": "Guideline Update",
  "reengage": "Re-engagement",
  "newsletter": "Newsletter",
  "invite": "Event Invitation"
};

export const TONE_MAP: Record<string, string> = {
  "clinical": "Clinical",
  "conversational": "Conversational",
  "urgent": "Urgent",
  "educational": "Educational",
  "promotional": "Promotional",
  "empathetic": "Empathetic"
};

export const TEMPLATES: Template[] = [
  {
    id: "pivotal-data",
    title: "Pivotal data, plainly stated",
    tone: "clinical",
    concept: "data",
    desc: "A no-nonsense Phase III readout for specialists \u2014 stats up top, methods below.",
    audiences: ["Oncology", "Hematology", "Cardiology", "Neurology"],
    seniority: ["Senior / Attending", "KOL / Thought leader"],
    duration: "5\u20137 min read",
    stars: 4.8,
    opens: "42%",
    badge: "Top performer",
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Phase III · Study-7", "title": "A 38% reduction in disease progression at 24 months.", "sub": "Primary endpoint met across all pre-specified subgroups (N = 1,184)."},
    body_type: "stats",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="padding:24px 0 8px;border-top:2px solid #1D5874;">
    <div style="font-size:28px;font-weight:700;color:#1D5874;">38%</div>
    <div style="font-size:13px;color:#555;margin-top:4px;">Reduction in disease progression at 24 months</div>
  </td></tr>
  <tr><td style="padding:16px 0 8px;border-top:1px solid #e5e7eb;">
    <div style="font-size:24px;font-weight:700;color:#1D5874;">62%</div>
    <div style="font-size:13px;color:#555;margin-top:4px;">Overall survival benefit at 36 months (HR 0.61, 95% CI 0.48–0.78)</div>
  </td></tr>
  <tr><td style="padding:16px 0 8px;border-top:1px solid #e5e7eb;">
    <div style="font-size:24px;font-weight:700;color:#1D5874;">1,184</div>
    <div style="font-size:13px;color:#555;margin-top:4px;">Patients enrolled across 112 sites in 18 countries</div>
  </td></tr>
  <tr><td style="padding:20px 0 0;">
    <p style="font-size:14px;color:#333;line-height:1.6;">
      The study met its primary endpoint of progression-free survival and all key secondary endpoints,
      including overall survival and quality-of-life measures. Results were consistent across
      pre-specified subgroups including age, prior therapy, and biomarker status.
    </p>
  </td></tr>
</table>`,
  },
  {
    id: "peer-letter",
    title: "A letter from a colleague",
    tone: "conversational",
    concept: "cme",
    desc: "Plain-text feel. A physician-to-physician note about what's changing in practice.",
    audiences: ["Cardiology", "Primary Care"],
    seniority: ["Mid-career", "Early-career"],
    duration: "2 min read",
    stars: 4.6,
    opens: "51%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "letter",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  I've been seeing this pattern in my clinic for the past 18 months, and I suspect you have too.
  The patients who would have been most likely to benefit from earlier intervention are the ones
  we're still catching late — not because we don't know better, but because the referral pathways
  haven't caught up with what the evidence is telling us.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  That's why the updated algorithm matters. It's not a dramatic departure — it's a refinement
  that aligns with what high-volume centers have been doing informally for a couple of years.
  The data finally gives us the language to make it standard.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  I'll walk through the three specific changes and what they mean for your patient population
  in the CME module below.
</p>
<p style="font-size:14px;color:#666;font-style:italic;margin:0;">— Dr. A. Park, Cardiology, UCSF Medical Center</p>`,
  },
  {
    id: "congress-rsvp",
    title: "Reserve your seat \u2014 congress RSVP",
    tone: "urgent",
    concept: "congress",
    desc: "Time-sensitive event invite with one-click RSVP. High-conversion layout.",
    audiences: ["Oncology", "Rheumatology", "Hematology", "Cardiology", "Neurology"],
    seniority: ["Senior / Attending", "Mid-career"],
    duration: "1 min read",
    stars: 4.5,
    opens: "47%",
    badge: "Time-sensitive",
    compliance: ["Standard"],
    hero: {"eyebrow": "Satellite Symposium · Madrid · Oct 19", "title": "Two seats left at the satellite symposium.", "sub": "Join a panel of investigators for early subgroup data."},
    body_type: "rsvp",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="background:#fff3cd;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
    <div style="font-size:13px;font-weight:600;color:#856404;">⏰ Registration closes in 48 hours</div>
  </td></tr>
  <tr><td style="padding:20px 0 0;">
    <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
      <strong>Saturday, October 19 · 7:30–9:00 AM CET</strong><br>
      Hall B3, Convention Centre Madrid
    </p>
    <p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
      The session will feature first presentation of ASCEND-7 subgroup data
      stratified by biomarker status, followed by a panel discussion with
      three of the study's principal investigators.
    </p>
    <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-top:8px;">
      <div style="font-size:13px;font-weight:600;color:#333;margin-bottom:10px;">Confirmed speakers</div>
      <div style="font-size:13px;color:#555;margin-bottom:6px;">• Dr. Aniya Park — Memorial Cancer Center</div>
      <div style="font-size:13px;color:#555;margin-bottom:6px;">• Prof. Marcus Reeves — Institut Gustave Roussy</div>
      <div style="font-size:13px;color:#555;">• Dr. Yuki Tanaka — National Cancer Centre Japan</div>
    </div>
  </td></tr>
</table>`,
  },
  {
    id: "case-file",
    title: "From the case files",
    tone: "empathetic",
    concept: "case",
    desc: "Editorial-style patient case study. Lets the patient's voice carry the narrative.",
    audiences: ["Cardiology", "Hematology"],
    seniority: ["Mid-career", "Senior / Attending"],
    duration: "6 min read",
    stars: 4.9,
    opens: "39%",
    badge: "Editor's pick",
    compliance: ["Standard", "MLR Approved"],
    hero: {"eyebrow": "A case from the field", "title": "Maria's 14 months — and the choice that changed them.", "sub": "Dr. Lin shares a case from her clinic, told in the patient's own words."},
    body_type: "case",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;font-style:italic;">
  "I was 52 when they told me. I had a meeting on Tuesday, and by Thursday I was in an oncologist's office
  looking at scans I couldn't read but somehow already knew were bad."
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  Maria came to Dr. Lin's clinic fourteen months ago with a confirmed diagnosis and a lot of questions.
  The standard first-line regimen was appropriate on paper, but her ECOG performance status had been
  declining faster than expected, and her preference — stated clearly — was to prioritize functional
  quality over aggressive intervention.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  "We talked about the data for a long time. She wanted to understand the tradeoffs, not just the
  survival numbers. That conversation changed how I approach shared decision-making with all my patients."
</p>
<p style="font-size:14px;color:#666;margin:0;">— Dr. S. Lin, Medical Oncology</p>`,
  },
  {
    id: "guideline-2026",
    title: "Guideline update \u2014 2026 algorithm",
    tone: "educational",
    concept: "guideline",
    desc: "Side-by-side visual of the old vs. new treatment algorithm with clear annotations.",
    audiences: ["Cardiology", "Endocrinology", "Primary Care"],
    seniority: ["Mid-career", "Senior / Attending", "Early-career"],
    duration: "4 min read",
    stars: 4.7,
    opens: "44%",
    badge: null,
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Guideline update · January 2026", "title": "What changed in the algorithm — and what didn't.", "sub": "A side-by-side of the 2024 vs. 2026 treatment pathway, annotated."},
    body_type: "algorithm",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td width="48%" style="vertical-align:top;padding-right:12px;">
      <div style="background:#f8f9fa;border-radius:8px;padding:16px;">
        <div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">2024 Pathway</div>
        <div style="font-size:13px;color:#555;margin-bottom:8px;padding:8px;background:white;border-radius:4px;border-left:3px solid #e5e7eb;">Step 1: Risk stratification</div>
        <div style="font-size:13px;color:#555;margin-bottom:8px;padding:8px;background:white;border-radius:4px;border-left:3px solid #e5e7eb;">Step 2: First-line monotherapy</div>
        <div style="font-size:13px;color:#555;padding:8px;background:white;border-radius:4px;border-left:3px solid #e5e7eb;">Step 3: Reassess at 12 weeks</div>
      </div>
    </td>
    <td width="4%" style="text-align:center;vertical-align:middle;font-size:18px;color:#9ca3af;">→</td>
    <td width="48%" style="vertical-align:top;padding-left:12px;">
      <div style="background:#eef7f0;border-radius:8px;padding:16px;">
        <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">2026 Pathway (Updated)</div>
        <div style="font-size:13px;color:#555;margin-bottom:8px;padding:8px;background:white;border-radius:4px;border-left:3px solid #16a34a;">Step 1: Biomarker panel first ✦ new</div>
        <div style="font-size:13px;color:#555;margin-bottom:8px;padding:8px;background:white;border-radius:4px;border-left:3px solid #16a34a;">Step 2: Stratified combination Rx ✦ new</div>
        <div style="font-size:13px;color:#555;padding:8px;background:white;border-radius:4px;border-left:3px solid #e5e7eb;">Step 3: Reassess at 8 weeks ✦ earlier</div>
      </div>
    </td>
  </tr>
</table>
<p style="font-size:14px;color:#555;line-height:1.6;margin:20px 0 0;">
  The key change is the front-loading of biomarker testing — a shift driven by real-world evidence
  showing that early stratification reduces time-to-optimal-therapy by an average of 6.2 weeks.
</p>`,
  },
  {
    id: "cme-series",
    title: "CME series \u2014 12 weeks, 12 cases",
    tone: "educational",
    concept: "cme",
    desc: "Drip-style CME enrollment with weekly cadence and 0.5 credits per case.",
    audiences: ["Endocrinology", "Primary Care", "Nephrology"],
    seniority: ["Early-career", "Resident / Fellow"],
    duration: "3 min read",
    stars: 4.4,
    opens: "33%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow": "CME · 6.0 credits", "title": "Twelve weeks, twelve cases, six credits.", "sub": "A weekly case series in real-world endocrinology."},
    body_type: "series",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 20px;">
  Starting the week of October 7, you'll receive one case per week for 12 weeks.
  Each case takes approximately 30 minutes and awards 0.5 AMA PRA Category 1 Credit™.
</p>
<table width="100%" cellpadding="0" cellspacing="0">
  <tr style="background:#f8f9fa;">
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;">WEEK</td>
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;">CASE</td>
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;">CREDITS</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:10px 12px;font-size:13px;color:#333;">1</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;">Newly diagnosed T2D with CKD</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;">0.5</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;background:#fafafa;">
    <td style="padding:10px 12px;font-size:13px;color:#333;">2</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;">Resistant hypertension + metabolic syndrome</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;">0.5</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:10px 12px;font-size:13px;color:#555;font-style:italic;" colspan="3">+ 10 more cases · full syllabus available on enrollment</td>
  </tr>
</table>`,
  },
  {
    id: "now-approved",
    title: "Now approved \u2014 indication expanded",
    tone: "promotional",
    concept: "launch",
    desc: "Brand-forward approval announcement with the headline indication and prescribing essentials.",
    audiences: ["Pulmonology", "Rheumatology"],
    seniority: ["Senior / Attending", "Mid-career"],
    duration: "3 min read",
    stars: 4.3,
    opens: "38%",
    badge: "New",
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Now approved", "title": "Indication expanded for adults with severe eosinophilic asthma.", "sub": "Brand A is now indicated as add-on maintenance in patients ≥ 18 with eosinophil counts ≥ 300 cells/µL."},
    body_type: "approval",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  The FDA has approved the expanded indication for Brand A (investigational compound)
  as add-on maintenance therapy for adults with severe eosinophilic asthma.
</p>
<div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:20px;">
  <div style="font-size:13px;font-weight:700;color:#0369a1;margin-bottom:8px;">Key eligibility criteria</div>
  <div style="font-size:13px;color:#333;margin-bottom:6px;">• Age ≥ 18 years</div>
  <div style="font-size:13px;color:#333;margin-bottom:6px;">• Blood eosinophil count ≥ 300 cells/µL</div>
  <div style="font-size:13px;color:#333;margin-bottom:6px;">• On background ICS/LABA therapy</div>
  <div style="font-size:13px;color:#333;">• ≥ 2 severe exacerbations in prior 12 months</div>
</div>
<p style="font-size:13px;color:#666;line-height:1.6;margin:0;">
  Please see full Prescribing Information including Boxed Warning and Medication Guide.
</p>`,
  },
  {
    id: "miss-you",
    title: "We missed you at grand rounds",
    tone: "empathetic",
    concept: "reengage",
    desc: "Light-touch re-engagement. Acknowledges silence, offers a single useful thing.",
    audiences: ["Primary Care", "Cardiology"],
    seniority: ["Mid-career", "Early-career"],
    duration: "1 min read",
    stars: 4.2,
    opens: "29%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "winback",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  It's been a while, and we understand — your schedule doesn't slow down.
  We saved the session recording from last month's grand rounds in case you'd like to catch up
  on your own time.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  The 40-minute session covers the updated HFrEF management algorithm and includes
  three patient cases presented by Dr. Osei from the Mount Sinai Heart Failure clinic.
</p>
<p style="font-size:14px;color:#666;margin:0;">
  No forms, no accreditation — just the recording. Available for 30 days.
</p>`,
  },
  {
    id: "topline-embargo",
    title: "Topline embargoed \u2014 8 AM ET",
    tone: "urgent",
    concept: "data",
    desc: "Embargoed data drop. Big headline figure, locked-down framing, single CTA.",
    audiences: ["Oncology", "Hematology", "Neurology", "Cardiology"],
    seniority: ["KOL / Thought leader", "Senior / Attending"],
    duration: "2 min read",
    stars: 4.6,
    opens: "55%",
    badge: "Embargoed",
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Embargoed until Oct 14 · 8:00 AM ET", "title": "MERIDIAN-2 met its primary endpoint.", "sub": "Topline data ahead of full presentation. For your eyes only — please honor the embargo."},
    body_type: "embargo",
    body_html: `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
  <div style="font-size:13px;font-weight:700;color:#dc2626;margin-bottom:4px;">🔒 Embargoed until October 14, 2026 · 8:00 AM ET</div>
  <div style="font-size:13px;color:#7f1d1d;">This communication is intended solely for the named recipient. Do not share, publish, or discuss prior to the embargo lift.</div>
</div>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  MERIDIAN-2 met its primary endpoint of progression-free survival (HR 0.54, 95% CI 0.42–0.70; p&lt;0.0001).
  Full data, including overall survival trends and safety profile, will be presented at the full
  plenary session on October 15.
</p>
<p style="font-size:14px;color:#666;margin:0;">
  The full press release and data tables are available in the secure portal below.
</p>`,
  },
  {
    id: "moa-five",
    title: "The new MOA in five minutes",
    tone: "conversational",
    concept: "cme",
    desc: "An explainer that respects the reader's time. Diagrammatic, but written like a colleague.",
    audiences: ["Rheumatology", "Dermatology"],
    seniority: ["Mid-career", "Early-career"],
    duration: "5 min read",
    stars: 4.7,
    opens: "46%",
    badge: "High engagement",
    compliance: ["Standard"],
    hero: {"eyebrow": "Mechanism, in plain English", "title": "How does it actually work? A 5-minute read.", "sub": "An illustrated walk-through of the signaling pathway and where the new agent sits."},
    body_type: "explainer",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  You've seen the pathway diagrams. You've heard "selective inhibitor of JAK1/JAK2" enough
  times that it's stopped meaning anything. Let me try a different angle.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  Think of the JAK-STAT pathway as a relay. A cytokine (IL-6, say) lands on a receptor.
  The receptor calls JAK. JAK passes the signal to STAT. STAT goes to the nucleus and
  turns on inflammatory genes. The new agent blocks the handoff from JAK to STAT —
  specifically at JAK1, which handles most of the pro-inflammatory cytokines, and JAK2,
  which handles erythropoietin and some myeloid signals.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  The selectivity matters because it spares JAK3 — the pathway that handles T-cell
  development — which is where some of the infection risk with older agents came from.
</p>`,
  },
  {
    id: "rwe-snapshot",
    title: "Real-world evidence snapshot",
    tone: "clinical",
    concept: "data",
    desc: "Quarterly RWE digest. Charts up top, methods linked, no spin.",
    audiences: ["Nephrology", "Endocrinology", "Cardiology"],
    seniority: ["Senior / Attending", "Mid-career"],
    duration: "4 min read",
    stars: 4.5,
    opens: "36%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow": "RWE Q1 · 2026", "title": "What 11,402 patient-years tell us about real-world adherence.", "sub": "A snapshot from the claims cohort, with adherence and persistence at 12 and 24 months."},
    body_type: "rwe",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
  <tr style="background:#f8f9fa;">
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;">METRIC</td>
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;text-align:right;">12 MONTHS</td>
    <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;text-align:right;">24 MONTHS</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:10px 12px;font-size:13px;color:#333;">Medication adherence (PDC ≥ 80%)</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">73.4%</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">61.2%</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;background:#fafafa;">
    <td style="padding:10px 12px;font-size:13px;color:#333;">Persistence (no gap &gt; 60 days)</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">68.9%</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">54.7%</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:10px 12px;font-size:13px;color:#333;">Hospitalization rate (per 100 PY)</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">12.3</td>
    <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">10.8</td>
  </tr>
</table>
<p style="font-size:13px;color:#666;line-height:1.6;margin:0;">
  n = 11,402 patient-years. Claims data from a commercially insured population.
  PDC = proportion of days covered. Results may not generalize to Medicare or Medicaid populations.
</p>`,
  },
  {
    id: "patient-voice",
    title: "Patient voice \u2014 living with HFrEF",
    tone: "empathetic",
    concept: "case",
    desc: "A patient-narrated journey paired with the clinical view from her cardiologist.",
    audiences: ["Cardiology", "Primary Care"],
    seniority: ["Mid-career", "Senior / Attending"],
    duration: "7 min read",
    stars: 4.8,
    opens: "41%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow": "Living with HFrEF", "title": "\"I learned to listen to my body again.\"", "sub": "A patient narrative from the GUIDE-HF community, paired with clinical commentary."},
    body_type: "voice",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;font-style:italic;">
  "The first six months after diagnosis, I was terrified every time I climbed stairs.
  I'd stop at the landing and wait, counting my heartbeats. My cardiologist told me
  that was normal. But it didn't feel normal."
</p>
<p style="font-size:14px;font-weight:600;color:#333;margin:0 0 8px;">Clinical commentary — Dr. T. Osei, Heart Failure Clinic</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  What you're hearing is the gap between EF numbers and lived experience. Her EF was 32% —
  reduced but not critically low — but her functional status was worse than the echocardiogram
  predicted. The stair-climbing anxiety she describes is a common under-reported symptom
  that often signals undertreated congestion rather than structural worsening.
</p>
<p style="font-size:14px;color:#666;margin:0;">
  Read the full narrative and clinical case discussion →
</p>`,
  },
  {
    id: "field-rep",
    title: "Field rep follow-up",
    tone: "promotional",
    concept: "launch",
    desc: "Personalized post-visit email from a rep. Light branding, clear next step.",
    audiences: ["Primary Care", "Endocrinology"],
    seniority: ["Mid-career", "Early-career"],
    duration: "1 min read",
    stars: 4.1,
    opens: "32%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "rep",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  Thank you for your time yesterday — I know your schedule is demanding,
  and I appreciate the 15 minutes.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  As promised, I've attached the two-page summary of the pivotal trial data
  and the dosing guide. The patient support program information is on the
  last page — there's a free 90-day starter program for newly initiated patients
  that a few of your colleagues have found helpful for adherence.
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  I'll follow up next week, but please don't hesitate to call or text if
  you have questions before then.
</p>
<p style="font-size:14px;color:#666;margin:0;">
  Best,<br>Jordan M. · Territory Manager · HCP Campaign Studio
</p>`,
  },
  {
    id: "monograph",
    title: "Monograph digest",
    tone: "clinical",
    concept: "guideline",
    desc: "Dense, scannable summary of a new monograph entry. For the reader who skims.",
    audiences: ["Pulmonology", "Nephrology"],
    seniority: ["Senior / Attending", "KOL / Thought leader"],
    duration: "8 min read",
    stars: 4.4,
    opens: "31%",
    badge: null,
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Monograph · 2026 edition", "title": "What's new in the severe asthma chapter.", "sub": "A scannable digest of edits to chapter 7, with margin notes from the editors."},
    body_type: "digest",
    body_html: `<div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
  <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Section 7.2 — Updated</div>
  <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
    Biologic selection criteria now include a stepwise biomarker decision tree
    (blood eosinophil count → FeNO → IgE), replacing the previous parallel
    assessment framework. <span style="background:#fef3c7;padding:0 2px;">Editor note: aligns with GINA 2026 addendum.</span>
  </p>
</div>
<div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
  <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Section 7.4 — New</div>
  <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
    Added section on switching biologics: criteria, washout periods, and monitoring
    requirements. Includes a comparative table of approved biologics with indication-specific notes.
  </p>
</div>
<div style="border-left:3px solid #e5e7eb;padding-left:16px;">
  <div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;margin-bottom:6px;">Section 7.1, 7.3, 7.5 — Unchanged</div>
  <p style="font-size:14px;color:#666;line-height:1.6;margin:0;">
    Inhaled corticosteroid dosing, maintenance regimens, and emergency protocols
    remain as published in the 2024 edition.
  </p>
</div>`,
  },
  {
    id: "congress-promo",
    title: "Congress Announcement \u2014 Join Us",
    tone: "promotional",
    concept: "congress",
    desc: "A brand-forward congress invitation that drives registrations with speaker highlights and agenda.",
    audiences: ["Oncology", "Cardiology", "Neurology"],
    seniority: ["Senior / Attending", "Mid-career"],
    duration: "2 min read",
    stars: 4.6,
    opens: "48%",
    badge: "Featured",
    compliance: ["Standard"],
    hero: {"eyebrow": "Congress Invitation", "title": "Join us at the leading symposium of the year.", "sub": "Hear from world-class faculty and be the first to see emerging data."},
    body_type: "rsvp",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td style="padding:0 0 20px;">
    <h2 style="font-size:18px;font-weight:700;color:#333;margin:0 0 8px;">Event Highlights</h2>
    <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 16px;">
      This year's symposium brings together leading specialists for two days of data presentations,
      panel discussions, and networking. Early registration is now open.
    </p>
  </td></tr>
  <tr><td style="border-top:1px solid #e5e7eb;padding:16px 0 0;">
    <div style="font-size:13px;font-weight:700;color:#333;margin-bottom:10px;">Confirmed Faculty</div>
    <div style="font-size:13px;color:#555;margin-bottom:6px;">• Prof. Sarah Chen — University Medical Center</div>
    <div style="font-size:13px;color:#555;margin-bottom:6px;">• Dr. James Okafor — Royal College of Physicians</div>
    <div style="font-size:13px;color:#555;margin-bottom:16px;">• Dr. Priya Nair — National Institute of Oncology</div>
    <div style="background:#fff3cd;border-radius:8px;padding:14px 18px;">
      <div style="font-size:13px;font-weight:600;color:#856404;">Limited seats available — register before the deadline.</div>
    </div>
  </td></tr>
</table>`,
  },
  {
    id: "guideline-clinical",
    title: "Updated Clinical Guidelines \u2014 Key Changes",
    tone: "clinical",
    concept: "guideline",
    desc: "A concise clinical summary of the latest guideline update with annotated key changes for practice.",
    audiences: ["Cardiology", "Oncology", "Neurology"],
    seniority: ["Senior / Attending", "Mid-career"],
    duration: "4 min read",
    stars: 4.7,
    opens: "43%",
    badge: "Clinical",
    compliance: ["MLR Approved"],
    hero: {"eyebrow": "Guideline Update · 2026", "title": "What the new guidelines mean for your practice.", "sub": "A clinical summary of the key changes and their evidence base."},
    body_type: "algorithm",
    body_html: `<div style="margin-bottom:20px;">
  <h3 style="font-size:15px;font-weight:700;color:#1D5874;margin:0 0 10px;">Guideline Summary</h3>
  <p style="font-size:14px;color:#333;line-height:1.7;margin:0 0 16px;">
    The updated guidelines reflect new evidence from three landmark trials published in the past 18 months.
    The primary recommendation changes affect first-line treatment selection and monitoring intervals.
  </p>
</div>
<div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
  <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Key Update 1</div>
  <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
    First-line therapy selection now stratified by biomarker status. Testing recommended prior to initiation.
  </p>
</div>
<div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
  <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Key Update 2</div>
  <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
    Monitoring intervals shortened from 12 to 8 weeks for high-risk patients in the first year of therapy.
  </p>
</div>
<div style="border-left:3px solid #1D5874;padding-left:16px;">
  <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Key Update 3</div>
  <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">
    Combination therapy now recommended as standard of care for moderate-to-severe presentation (Grade 2+).
  </p>
</div>`,
  },
  {
    id: "newsletter-educational",
    title: "HCP Monthly Digest \u2014 Key Updates",
    tone: "educational",
    concept: "cme",
    desc: "A structured monthly newsletter covering clinical updates, upcoming events, and educational resources.",
    audiences: ["Oncology", "Cardiology", "Neurology"],
    seniority: ["Mid-career", "Senior / Attending"],
    duration: "5 min read",
    stars: 4.3,
    opens: "35%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow": "Monthly Digest · June 2026", "title": "This month in clinical practice.", "sub": "Key updates, new data, and educational resources curated for you."},
    body_type: "series",
    body_html: `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
  <tr style="background:#f8f9fa;">
    <td style="padding:10px 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;">SECTION</td>
    <td style="padding:10px 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;">HIGHLIGHTS</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:12px;font-size:13px;font-weight:600;color:#333;vertical-align:top;">Clinical Data</td>
    <td style="padding:12px;font-size:13px;color:#555;">Three new Phase III results published this month. Key findings summarised.</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;background:#fafafa;">
    <td style="padding:12px;font-size:13px;font-weight:600;color:#333;vertical-align:top;">Education</td>
    <td style="padding:12px;font-size:13px;color:#555;">New CME module available: 1.0 credit, 45 min. Topic: updated treatment algorithm.</td>
  </tr>
  <tr style="border-top:1px solid #e5e7eb;">
    <td style="padding:12px;font-size:13px;font-weight:600;color:#333;vertical-align:top;">Upcoming Events</td>
    <td style="padding:12px;font-size:13px;color:#555;">Regional symposium — July 12. Annual congress — September 3–5. Early registration open.</td>
  </tr>
</table>`,
  },
  {
    id: "event-invitation",
    title: "You're Invited \u2014 Exclusive Symposium",
    tone: "promotional",
    concept: "congress",
    desc: "A premium event invitation for an exclusive specialist symposium with early-access data.",
    audiences: ["Oncology", "Cardiology", "Neurology"],
    seniority: ["KOL / Thought leader", "Senior / Attending"],
    duration: "1 min read",
    stars: 4.5,
    opens: "52%",
    badge: "Exclusive",
    compliance: ["Standard"],
    hero: {"eyebrow": "Invitation · By Appointment Only", "title": "You have been personally selected to attend.", "sub": "An exclusive gathering of 40 specialists for early data and peer exchange."},
    body_type: "rsvp",
    body_html: `<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  Dear Colleague,
</p>
<p style="font-size:15px;color:#333;line-height:1.7;margin:0 0 16px;">
  You have been personally selected to join a small group of leading specialists at our upcoming
  invitation-only symposium. This exclusive event will provide early access to data before wider publication,
  with dedicated time for expert discussion.
</p>
<div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:14px 18px;border-radius:0 6px 6px 0;margin-bottom:16px;">
  <div style="font-size:13px;font-weight:700;color:#0369a1;margin-bottom:6px;">Event Details</div>
  <div style="font-size:13px;color:#333;margin-bottom:4px;">Date: October 24, 2026</div>
  <div style="font-size:13px;color:#333;margin-bottom:4px;">Location: The Mandarin Oriental, London</div>
  <div style="font-size:13px;color:#333;">Capacity: 40 attendees only</div>
</div>`,
  },
];