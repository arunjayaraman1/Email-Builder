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
  {
    id: "clinical-launch",
    title: "New therapy launch — clinical overview",
    tone: "clinical",
    concept: "launch",
    desc: "A clinical briefing on the newly approved therapy, with mechanism, dosing, and patient-selection criteria.",
    audiences: ["Oncology","Hematology"],
    seniority: ["Senior / Attending","KOL / Thought leader"],
    duration: "4 min read",
    stars: 4.5,
    opens: "38%",
    badge: "New",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"New approval","title":"A new option for relapsed/refractory patients.","sub":"Clinical data from the pivotal Phase III trial supporting the indication."},
    body_type: "approval",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The FDA has approved the new agent for relapsed/refractory disease following at least two prior lines of therapy. The approval is supported by the Phase III trial (N = 684).</p>
      <div class="email-callout" style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:20px;">
        <div class="label" style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.08em;color:#0369a1;margin-bottom:4px;">Key eligibility criteria</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Age ≥ 18 years</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• ECOG 0–2</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Measurable disease per RECIST 1.1</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• ≥ 2 prior systemic therapies</div>
      </div>
      <a class="email-cta">Full prescribing information</a> <a class="email-cta outline">Dosing & administration guide</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "clinical-congress",
    title: "Clinical highlights from ASCO 2026",
    tone: "clinical",
    concept: "congress",
    desc: "Key data presentations and poster highlights from this year’s annual meeting, curated for the oncology specialist.",
    audiences: ["Oncology","Cardiology","Neurology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "3 min read",
    stars: 4.6,
    opens: "41%",
    badge: "Conference recap",
    compliance: ["Standard"],
    hero: {"eyebrow":"ASCO 2026 · Chicago","title":"Three trials that could change first-line therapy.","sub":"A curated overview of the plenary and oral abstract sessions most relevant to your practice."},
    body_type: "rsvp",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>This year’s ASCO featured over 200 abstracts across the plenary, oral, and poster sessions. We’ve selected three trials with the greatest potential impact on first-line treatment decisions.</p>
      <div class="email-callout">
      <div class="label">Event details</div>
      <strong>Saturday, June 6 · 14:00–16:00 CDT</strong><br />
       McCormick Place · Hall B1<br />
       Featured sessions: MERIDIAN-3 final OS, the ADC non-inferiority readout, and the biomarker-driven platform update.
    </div>
      <a class="email-cta">View the session guide</a> <a class="email-cta outline">Download abstract summaries</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "clinical-cme",
    title: "CME — biomarker-driven therapy selection",
    tone: "clinical",
    concept: "cme",
    desc: "A case-based CME module on integrating biomarker data into treatment decisions for solid tumors.",
    audiences: ["Nephrology","Endocrinology","Oncology"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "5 min read",
    stars: 4.4,
    opens: "32%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"CME · 1.0 credit","title":"Biomarker-driven therapy: a clinical framework.","sub":"A practical, case-based approach to integrating genomic and proteomic data into treatment selection."},
    body_type: "digest",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Module 1 — When to test</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">Current guidelines recommend broad genomic profiling at diagnosis for all advanced solid tumors. Emerging data supports earlier testing in Stage II–III disease where adjuvant decisions may be affected.</p>
      </div>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Module 2 — Interpreting results</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">A stepwise framework for classifying variants by actionability, with attention to tissue-agnostic approvals and emerging resistance markers.</p>
      </div>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">Module 3 — Case applications</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">Three de-identified cases spanning NSCLC, colorectal, and breast cancer, with expert commentary on how biomarker data guided therapy selection.</p>
      </div>
      <a class="email-cta outline">Enroll in the CME module →</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "clinical-case",
    title: "Case study — managing resistant hypertension",
    tone: "clinical",
    concept: "case",
    desc: "A detailed case report on a patient with resistant hypertension, covering diagnostic workup and treatment escalation.",
    audiences: ["Cardiology","Nephrology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "6 min read",
    stars: 4.7,
    opens: "36%",
    badge: "Clinical pearl",
    compliance: ["Standard"],
    hero: {"eyebrow":"Case from the clinic","title":"When three agents aren’t enough.","sub":"A 58-year-old with resistant hypertension and declining renal function — a stepwise approach to escalation."},
    body_type: "case",
    body_html: `
    <div class="email-section">
      <p style="color:var(--muted);font-style:italic;font-size:12.5px">A case from the cardiology clinic. Identifying details have been changed.</p>
      <p>Mr. A, 58, presented with BP 168/102 despite adherence to three agents at optimal doses. His eGFR had declined from 72 to 48 over 18 months, and a spot urine albumin-to-creatinine ratio was 340 mg/g.</p>
      <p>The diagnostic workup included a renal artery duplex (negative), plasma aldosterone/renin ratio (elevated at 28), and a confirmatory saline infusion test consistent with primary aldosteronism.</p>
      <p>We initiated a mineralocorticoid receptor antagonist, uptitrated the ACE inhibitor, and saw BP fall to 134/84 at 8 weeks. His eGFR stabilized at 46. The case illustrates the importance of secondary hypertension screening in apparent treatment resistance.</p>
      <div class="email-quote">
        "The combination of MR antagonist and optimized ACE inhibition was the turning point — not just for BP but for renal trajectory."
        <div class="email-quote-attr">— Dr. H. Osei, Cardiology</div>
      </div>
      <p>What follows is the case, as documented by the clinical team.</p>
      <a class="email-cta outline">Read the full case report (6 min)</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "clinical-reengage",
    title: "Clinical update — you may have missed this",
    tone: "clinical",
    concept: "reengage",
    desc: "A concise update on three important clinical developments from the past quarter, for the busy specialist.",
    audiences: ["Primary Care","Nephrology","Cardiology"],
    seniority: ["Mid-career","Early-career"],
    duration: "2 min read",
    stars: 4.1,
    opens: "27%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "winback",
    body_html: `
    <div class="email-section" style="max-width:520px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>It’s been a few months since we last connected, and we don’t want to add to your inbox noise.</p>
      <p>Before we scale back, here’s a quick update on three developments from the past quarter: (1) the updated KDIGO guidelines for CKD management, (2) the SGLT2 inhibitor data in heart failure with preserved EF, and (3) a practical tip on managing statin intolerance. One paragraph each, no CTAs unless you want them.</p>
      <a class="email-cta">Send me the one-page summary</a> <a class="email-cta outline">No thanks — I’m all set</a>
      <p style="color:var(--muted);font-size:12.5px">Either way — thank you for the work you do.</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-launch",
    title: "A colleague’s note on the new option",
    tone: "conversational",
    concept: "launch",
    desc: "A physician-to-physician note about a newly approved therapy and where it might fit in practice.",
    audiences: ["Rheumatology","Dermatology"],
    seniority: ["Mid-career","Early-career"],
    duration: "2 min read",
    stars: 4.3,
    opens: "43%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "letter",
    body_html: `
    <div class="email-section" style="max-width:540px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>I wanted to share a quick thought about the new JAK inhibitor that just launched. I’ve been following the development program since the Phase IIb data, and I think it genuinely fills a gap for patients who are TNF-inadequate responders but hesitant about the step-up to combination therapy.</p>
      <p>The SELECT-2 data that earned the approval showed a pretty clean safety profile in the first 48 weeks — nothing that surprised us from the class, but the JAK1 selectivity does seem to translate into a better hemoglobin trajectory than we saw with the earlier pan-JAK agents.</p>
      <p>I’ll be at the regional rheumatology meeting in Boston next month if you want to chat about it in person.</p>
      <p>Warmly,<br /><strong>Dr. S. Chen</strong><br />Rheumatology · HCP Campaign Medical Center</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-data",
    title: "New data — what the numbers mean for your patients",
    tone: "conversational",
    concept: "data",
    desc: "A plain-language walk-through of recently published clinical data, written like a colleague explaining it over coffee.",
    audiences: ["Gastroenterology","Hematology"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "3 min read",
    stars: 4.5,
    opens: "44%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"Data, in context","title":"A 34% improvement — but what does that actually mean?","sub":"Let’s walk through the numbers from the recent Phase III trial and what they tell us about the number needed to treat."},
    body_type: "explainer",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      
      <h3>1. The headline figure</h3>
      <p>A 34% relative risk reduction sounds dramatic. But the absolute risk reduction was 6.2% — which gives us an NNT of 16. That’s comparable to other first-line biologics in this class, not a step-change. The real story is in the subgroup analysis.</p>
      
      <h3>2. Where the signal is strongest</h3>
      <p>Patients with baseline biomarker elevation (CRP > 10 mg/L) had an NNT of 9. Those without saw an NNT of 31. The FDA will include the biomarker-stratified analysis in the label, and I think that’s where the clinical utility lives.</p>
      
      <h3>3. What I’m doing in my practice</h3>
      <p>I’m reserving this agent for patients with elevated inflammatory markers and inadequate response to anti-TNF. The data supports that positioning, and the safety database at 48 weeks is reassuring enough to feel comfortable with it.</p>
      <a class="email-cta outline">Read the full analysis →</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-congress",
    title: "Were you at the symposium? A quick recap",
    tone: "conversational",
    concept: "congress",
    desc: "A personal note recapping a recent satellite symposium, with key takeaways for those who couldn’t attend.",
    audiences: ["Cardiology","Neurology"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "2 min read",
    stars: 4.4,
    opens: "46%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "rsvp",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>If you weren’t able to make the satellite, here’s what you missed: three fantastic case presentations, a lively Q&A about real-world switching patterns, and some early data from the ongoing registry that I think will influence how we think about first-line sequencing.</p>
      <div class="email-callout">
      <div class="label">Event details</div>
      <strong>Saturday, March 15 · 18:00–20:00</strong><br />
       Marriott Marquis · Pacific Room<br />
       Recording available on demand for registered attendees.
    </div>
      <a class="email-cta">Watch the recording</a> <a class="email-cta outline">Download the slide deck</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-case",
    title: "A patient story that changed my approach",
    tone: "conversational",
    concept: "case",
    desc: "A physician shares a patient case that reshaped how she thinks about treatment goals and shared decision-making.",
    audiences: ["Psychiatry","Primary Care"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "5 min read",
    stars: 4.8,
    opens: "40%",
    badge: "Editor’s pick",
    compliance: ["Standard"],
    hero: {"eyebrow":"A case that stayed with me","title":"\"I don’t need a cure. I need a life.\"","sub":"A conversation that reframed how I think about treatment goals in chronic illness."},
    body_type: "voice",
    body_html: `
    <div class="email-section">
      <div class="email-quote">
        "I don’t need a cure. I need a life. That’s what my patient told me six months into treatment, and it reframed everything."
        <div class="email-quote-attr">— Sarah T.</div>
      </div>
      <p>Sarah was two years into treatment for a chronic condition. By most objective measures, she was responding: lab values improving, symptom scores dropping. But her quality-of-life scores were flat. When I asked why, she said she felt like she was living in a waiting room — always waiting for the next test, the next result, the next “safe” milestone.</p>
      <p>We shifted the conversation from “Are your numbers better?” to “What matters to you this month?” Treatment goals changed. We prioritized one activity she wanted to return to, adjusted the timing of her infusions so she could plan around them, and deprioritized a monitoring test that added information but stress.</p>
      <p>Her adherence improved. Her satisfaction scores went up. And the labs stayed stable. It taught me that patient-defined goals aren’t a distraction from good medicine — they’re a precondition for it.</p>
      <h3>Key takeaways</h3>
      <p><strong>Ask what matters, not just what hurts.</strong> A single open-ended question at the start of each visit can reveal more than a checklist of symptoms.</p>
      <p><strong>Objective response ≠ subjective well-being.</strong> Track both. If they diverge, explore why.</p>
      <a class="email-cta outline">Read the full narrative (5 min)</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-guideline",
    title: "The new guideline — what I’m actually changing",
    tone: "conversational",
    concept: "guideline",
    desc: "A practicing physician shares which parts of the new guideline she’s adopting in her clinic and what she’s holding off on.",
    audiences: ["Endocrinology","Cardiology"],
    seniority: ["Mid-career","Early-career"],
    duration: "3 min read",
    stars: 4.5,
    opens: "47%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "letter",
    body_html: `
    <div class="email-section" style="max-width:540px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The new guidelines landed last week, and I’ve spent the weekend comparing them side by side with the 2024 version. A few things I’m adopting immediately, and a few I’m going to wait on.</p>
      <p>I’m changing my threshold for initiating combination therapy in patients with moderate disease — the evidence from the three-year follow-up of the landmark trial is compelling enough that I don’t see a reason to wait. But the new biomarker-driven algorithm? I’m going to wait until I see real-world data outside the trial population.</p>
      <p>Curious what you’re doing in your practice. Happy to compare notes over email or at the next regional meeting.</p>
      <p>Best,<br /><strong>Dr. K. Osei</strong><br />Endocrinology · University Medical Center</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "conversational-reengage",
    title: "Thinking of you — and a useful resource",
    tone: "conversational",
    concept: "reengage",
    desc: "A light-touch note checking in with a quick clinical pearl and an offer to send something useful.",
    audiences: ["Dermatology","Rheumatology"],
    seniority: ["Mid-career","Early-career"],
    duration: "1 min read",
    stars: 4,
    opens: "31%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "winback",
    body_html: `
    <div class="email-section" style="max-width:520px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>It’s been a while since we last connected. I know these mailings can blur together.</p>
      <p>Rather than send another update, I want to offer you something specific: a single-page quick-reference card on the updated biologic switching algorithm. It’s the thing I get asked about most in my clinic, and it might be useful to have on hand. Reply if you’d like me to send it.</p>
      <a class="email-cta">Yes, send me the reference card</a> <a class="email-cta outline">No thanks — I’m good</a>
      <p style="color:var(--muted);font-size:12.5px">Either way — thank you for the work you do.</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "urgent-launch",
    title: "Breaking: new treatment option now available",
    tone: "urgent",
    concept: "launch",
    desc: "Time-sensitive launch announcement with limited initial supply allocation and fast-track access details.",
    audiences: ["Oncology","Pulmonology"],
    seniority: ["Senior / Attending","KOL / Thought leader"],
    duration: "2 min read",
    stars: 4.4,
    opens: "51%",
    badge: "Breaking",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"Breaking · Now available","title":"First-in-class therapy launches today with limited initial supply.","sub":"Priority allocation for high-volume centers. See criteria for early access."},
    body_type: "embargo",
    body_html: `
    <div class="email-section">
      <div class="email-callout" style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
        <div class="label" style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.08em;color:#dc2626;margin-bottom:4px;">⚑ EMBARGOED</div>
        <strong>Priority access period opens today at 12:00 PM ET. Limited initial supply allocation applies.</strong> By reading this email you agree to honor the embargo.
      </div>
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The first-in-class therapy has received FDA approval and initial supply is being allocated to high-volume centers. Priority access criteria include a minimum of 50 eligible patients per year and existing multidisciplinary review board infrastructure.</p>
      <div class="email-stat-row">
        <div class="email-stat"><div class="v">Priority centers</div><div class="l">86 sites pre-qualified</div></div>
        <div class="email-stat"><div class="v">Initial supply</div><div class="l">2,400 patient courses first 90 days</div></div>
        <div class="email-stat"><div class="v">Turnaround</div><div class="l">48–72 hours from request to delivery</div></div>
      </div>
      <a class="email-cta">Check allocation status</a> <a class="email-cta outline">Apply for priority access</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "urgent-cme",
    title: "Last chance — CME deadline approaching",
    tone: "urgent",
    concept: "cme",
    desc: "Registration for the upcoming CME series closes in 48 hours. Limited seats available for the live session.",
    audiences: ["Cardiology","Primary Care"],
    seniority: ["Mid-career","Early-career"],
    duration: "1 min read",
    stars: 4.2,
    opens: "44%",
    badge: "Time-sensitive",
    compliance: ["Standard"],
    hero: {"eyebrow":"Registration closes in 48 hours","title":"CME series — 6.0 credits. Starts next week.","sub":"Live virtual sessions with expert faculty. Recordings available for registrants."},
    body_type: "rsvp",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>Registration for the 12-week CME series closes Friday at midnight. We’ve had an overwhelming response, and only a limited number of seats remain for the live interactive sessions.</p>
      <div class="email-callout">
      <div class="label">Event details</div>
      <strong>12 weeks · 6.0 AMA PRA Category 1 Credits™</strong><br />
       Live virtual sessions every Tuesday at 7:00 PM ET<br />
       Faculty: Drs. Osei, Chen, and Park. Co-sponsored by HCP Campaign and CHEST.
    </div>
      <a class="email-cta">Register now — secure your seat</a> <a class="email-cta outline">View the full syllabus</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "urgent-case",
    title: "Urgent case: rapid progression on first-line therapy",
    tone: "urgent",
    concept: "case",
    desc: "A high-acuity case of rapid disease progression, with an accelerated diagnostic and treatment timeline.",
    audiences: ["Neurology","Gastroenterology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "4 min read",
    stars: 4.6,
    opens: "48%",
    badge: "Urgent",
    compliance: ["Standard"],
    hero: {"eyebrow":"Rapid progression case","title":"8 weeks from diagnosis to escalation.","sub":"A case of aggressive disease requiring accelerated decision-making and multidisciplinary coordination."},
    body_type: "case",
    body_html: `
    <div class="email-section">
      <p style="color:var(--muted);font-style:italic;font-size:12.5px">A high-acuity case from the neurology service. Identifying details have been changed.</p>
      <p>Mr. J, 44, presented with new-onset symptoms and was diagnosed 8 weeks ago. Despite standard first-line therapy at optimal dosing, he progressed rapidly with new lesions on follow-up imaging at week 6.</p>
      <p>The multidisciplinary team convened urgently. Given the trajectory, we advanced to second-line therapy without waiting for the standard 12-week reassessment window. The decision was supported by emerging data on early switching in rapid progressors.</p>
      <p>At 4 weeks into second-line therapy, his symptoms stabilized and imaging showed no new lesions. The case highlights the importance of early recognition of treatment failure and the willingness to deviate from standard timelines when the clinical picture demands it.</p>
      <div class="email-quote">
        "Waiting for the scheduled reassessment would have cost us four weeks of disease progression."
        <div class="email-quote-attr">— Dr. L. Nakamura, Neurology</div>
      </div>
      <p>What follows is the case, as documented by the clinical team.</p>
      <a class="email-cta outline">Read the full case timeline (4 min)</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "urgent-guideline",
    title: "Urgent guideline change — effective immediately",
    tone: "urgent",
    concept: "guideline",
    desc: "A time-sensitive guideline update with immediate practice implications for prescribing and monitoring.",
    audiences: ["Endocrinology","Cardiology","Primary Care"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "2 min read",
    stars: 4.7,
    opens: "53%",
    badge: "Updated",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"Immediate · Practice change","title":"Dosing recommendations updated as of today.","sub":"Revised dosing intervals and monitoring requirements take effect immediately. Please review the changes."},
    body_type: "algorithm",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The updated recommendations reflect new safety data from the long-term extension study. Two changes affect prescribing decisions immediately.</p>
      <h3>What changed</h3>
      <ol style="margin:0;padding-left:18px">
        <li style="margin-bottom:6px"><strong>Dosing interval change:</strong> The recommended interval for patients with eGFR 30–45 has been extended from 8 to 12 weeks based on pharmacokinetic modeling and real-world safety data.</li>
        <li style="margin-bottom:6px"><strong>New monitoring requirement:</strong> Serum creatinine and potassium must be checked within 7 days of any dose adjustment, down from 14 days previously.</li>
      </ol>
      <div class="email-callout">
      <div class="label">What didn't change</div>
      Baseline screening recommendations, contraindications, and the patient-shared-decision step before initiation remain unchanged.
    </div>
      <a class="email-cta">View the updated algorithm</a> <a class="email-cta outline">Download the clinician summary</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "urgent-reengage",
    title: "We need your input — survey closes soon",
    tone: "urgent",
    concept: "reengage",
    desc: "A time-sensitive re-engagement with a brief clinical survey and an offer to share the aggregate results.",
    audiences: ["Primary Care","Cardiology","Nephrology"],
    seniority: ["Mid-career","Early-career"],
    duration: "1 min read",
    stars: 3.9,
    opens: "28%",
    badge: "Action needed",
    compliance: ["Standard"],
    hero: null,
    body_type: "winback",
    body_html: `
    <div class="email-section" style="max-width:520px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>We haven’t heard from you in a while, and we respect your inbox. But we’re closing our survey on Friday, and your voice matters.</p>
      <p>Three questions, 90 seconds. We’ll share the aggregate results — a fascinating look at how your peers are handling the new dosing guidelines. No follow-up unless you opt in.</p>
      <a class="email-cta">Take the 90-second survey</a> <a class="email-cta outline">Not now — but keep me on the list</a>
      <p style="color:var(--muted);font-size:12.5px">Either way — thank you for the work you do.</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "educational-launch",
    title: "New therapy — what you need to know",
    tone: "educational",
    concept: "launch",
    desc: "An educational overview of a newly approved therapy: mechanism, trial data, and place in the algorithm.",
    audiences: ["Pulmonology","Rheumatology","Primary Care"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "4 min read",
    stars: 4.3,
    opens: "36%",
    badge: "Educational",
    compliance: ["Standard"],
    hero: {"eyebrow":"New therapy · Educational brief","title":"A new option — where does it fit?","sub":"An evidence-based overview of the pivotal trial data, mechanism of action, and positioning relative to existing options."},
    body_type: "approval",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The newly approved therapy represents a novel mechanism in the treatment landscape. This educational brief summarizes the pivotal data, mechanism, and clinical considerations for appropriate patient selection.</p>
      <div class="email-callout" style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:20px;">
        <div class="label" style="font-size:10.5px;text-transform:uppercase;letter-spacing:0.08em;color:#0369a1;margin-bottom:4px;">Key eligibility criteria</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Mechanism: Selective JAK1 inhibition with sparing of JAK2/JAK3</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Pivotal trial: 1,024 patients, 52-week primary endpoint met</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Dosing: 100 mg daily, no titration required</div>
        <div style="font-size:13px;color:#333;margin-bottom:6px;">• Monitoring: CBC at baseline, 4 weeks, then every 12 weeks</div>
      </div>
      <a class="email-cta">Full prescribing information</a> <a class="email-cta outline">Comparison with existing options</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "educational-data",
    title: "Clinical data digest — Q2 2026",
    tone: "educational",
    concept: "data",
    desc: "A quarterly digest of important clinical data releases, with context and commentary on practice implications.",
    audiences: ["Oncology","Hematology","Cardiology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "5 min read",
    stars: 4.5,
    opens: "37%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"Data digest · Q2 2026","title":"Three trials that matter.","sub":"A guided tour through the quarter’s most practice-relevant data releases."},
    body_type: "rwe",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>This quarter’s digest covers three landmark publications with direct practice implications. Each summary includes the key figure, the study design, and our take on what it means for your patients.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr style="background:#f8f9fa;">
          <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;">METRIC</td>
          <td style="padding:10px 12px;font-size:12px;font-weight:600;color:#6b7280;text-align:right;">VALUE</td>
        </tr>
        
        <tr style="border-top:1px solid #e5e7eb;">
          <td style="padding:10px 12px;font-size:13px;color:#333;">PFS benefit at interim (HR)</td>
          <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">0.62 (p<0.001)</td>
        </tr>
        
        <tr style="border-top:1px solid #e5e7eb;background:#fafafa;">
          <td style="padding:10px 12px;font-size:13px;color:#333;">ORR difference vs. SOC</td>
          <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">+18% (95% CI 12–24)</td>
        </tr>
        
        <tr style="border-top:1px solid #e5e7eb;">
          <td style="padding:10px 12px;font-size:13px;color:#333;">Grade ≥ 3 AE rate</td>
          <td style="padding:10px 12px;font-size:13px;color:#333;text-align:right;font-weight:600;">24% vs. 21%</td>
        </tr>
      </table>
      <p style="font-size:13px;color:#666;line-height:1.6;margin:0;">Data from three Phase III trials published in NEJM, Lancet, and JCO, April–June 2026.</p>
      <a class="email-cta">Read full digest</a> <a class="email-cta outline">Download trial summaries</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "educational-congress",
    title: "Conference highlights — neurology edition",
    tone: "educational",
    concept: "congress",
    desc: "Key takeaways from the annual neurology congress, with expert commentary on practice-changing data.",
    audiences: ["Neurology","Psychiatry"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "3 min read",
    stars: 4.4,
    opens: "39%",
    badge: "Conference",
    compliance: ["Standard"],
    hero: {"eyebrow":"AAN 2026 · Philadelphia","title":"Practice-changing data in MS and headache medicine.","sub":"Expert-curated highlights from the plenary and concurrent sessions most relevant to your practice."},
    body_type: "rsvp",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>This year’s meeting featured over 1,200 abstracts. We’ve selected the sessions with the highest potential to change clinical practice, with expert commentary from our faculty.</p>
      <div class="email-callout">
      <div class="label">Event details</div>
      <strong>Wednesday, April 15 · 12:00–14:00 ET</strong><br />
       Pennsylvania Convention Center · Room 204<br />
       Featured: MS oral abstracts, headache medicine update, and the emerging biomarkers symposium.
    </div>
      <a class="email-cta">View the highlight reel</a> <a class="email-cta outline">Download the conference guide</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "educational-case",
    title: "Case-based learning — endocrine dilemmas",
    tone: "educational",
    concept: "case",
    desc: "A case-based educational module exploring three common but challenging endocrine clinical scenarios.",
    audiences: ["Endocrinology","Primary Care"],
    seniority: ["Early-career","Mid-career"],
    duration: "5 min read",
    stars: 4.6,
    opens: "34%",
    badge: "CME eligible",
    compliance: ["Standard"],
    hero: {"eyebrow":"Case-based learning","title":"Three endocrine cases that test your clinical reasoning.","sub":"Interactive case studies with expert commentary and evidence-based recommendations."},
    body_type: "voice",
    body_html: `
    <div class="email-section">
      <div class="email-quote">
        "I was managing three things at once, and I still almost missed it."
        <div class="email-quote-attr">— Dr. M. Torres, Endocrinology</div>
      </div>
      <p>Case 1: A 52-year-old with well-controlled T2D develops nocturnal hypoglycemia after a dose adjustment. The answer wasn’t reducing the dose further — it was recognizing the dawn phenomenon masking nocturnal lows.</p>
      <p>Case 2: A 38-year-old with new-onset hypertension and hypokalemia. Aldosterone-renin ratio was elevated, but the CT was negative. The diagnosis? Familial hyperaldosteronism Type I, confirmed by genetic testing.</p>
      <p>Case 3: A 65-year-old on stable levothyroxine develops tachycardia and weight loss. Her TSH is suppressed. The culprit wasn’t overtreatment — it was a new iodine-containing contrast exposure that interfered with her thyroid function.</p>
      <h3>Key takeaways</h3>
      <p><strong>Trust the pattern, not just the number.</strong> A single lab value can mislead without the full clinical picture.</p>
      <p><strong>When the unexpected happens, go back to first principles.</strong> The answer is often in the history you didn’t have time to take.</p>
      <a class="email-cta outline">Take the full CME module (5 min)</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "educational-reengage",
    title: "Quick refresher — three topics in ten minutes",
    tone: "educational",
    concept: "reengage",
    desc: "A low-effort re-engagement offering three concise educational topics for the busy clinician.",
    audiences: ["Nephrology","Cardiology","Primary Care"],
    seniority: ["Early-career","Mid-career"],
    duration: "10 min read",
    stars: 4,
    opens: "25%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "series",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>We know you’re busy, so we’ve put together three very short reads — each one a single clinical concept, no more than 3 minutes.</p>
      <div class="email-callout">
      <div class="label">Series at a glance</div>
      <strong>10 minutes total · 3 topics</strong><br />
       Topic 1: SGLT2 inhibitor update for CKD<br />
       Topic 2: Statin intolerance — what the new guidance says<br />
       Topic 3: Recognizing early heart failure with preserved EF
    </div>
      <a class="email-cta">Send me the refresher</a> <a class="email-cta outline">No thanks</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "promotional-data",
    title: "New data supports our therapy — key results",
    tone: "promotional",
    concept: "data",
    desc: "A brand-forward data announcement highlighting new clinical results that support the product’s efficacy and safety.",
    audiences: ["Oncology","Cardiology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "3 min read",
    stars: 4.5,
    opens: "42%",
    badge: "New data",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"New clinical data","title":"Our therapy demonstrates sustained benefit at 36 months.","sub":"New data from the long-term extension study reinforce the efficacy and safety profile."},
    body_type: "stats",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>Data from the long-term extension study demonstrate sustained efficacy and a consistent safety profile over three years of follow-up. Results were consistent across pre-specified subgroups including age, disease severity, and prior treatment history.</p>
      <div class="email-stat-row">
        <div class="email-stat"><div class="v">36%</div><div class="l">Relative risk reduction at 36 months (HR 0.64, p<0.001)</div></div>
        <div class="email-stat"><div class="v">82%</div><div class="l">Persistence on therapy at 24 months</div></div>
        <div class="email-stat"><div class="v">4.2</div><div class="l">Years median exposure in the safety database</div></div>
      </div>
      <p><a class="email-cta">View the full data summary</a> <a class="email-cta outline">Download the one-pager</a></p>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "promotional-cme",
    title: "CME program sponsored by our therapy area",
    tone: "promotional",
    concept: "cme",
    desc: "A sponsored CME program covering emerging topics in the therapeutic area, with expert faculty.",
    audiences: ["Dermatology","Rheumatology"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "3 min read",
    stars: 4.2,
    opens: "34%",
    badge: "Sponsored",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"Sponsored CME","title":"Emerging concepts in immunology — 4.0 credits available.","sub":"An accredited CME program developed in collaboration with leading academic institutions."},
    body_type: "series",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>We are proud to support this accredited CME program developed in collaboration with leading academic institutions. The curriculum covers emerging concepts in immunology with practical clinical applications.</p>
      <div class="email-callout">
      <div class="label">Series at a glance</div>
      <strong>4.0 AMA PRA Category 1 Credits™</strong><br />
       Available on demand · 4 modules · 60 minutes each<br />
       Faculty: Drs. Park, Osei, and Chen. Supported by an independent educational grant.
    </div>
      <a class="email-cta">Enroll in the CME program</a> <a class="email-cta outline">View the faculty and curriculum</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "promotional-case",
    title: "Patient success story — a remarkable outcome",
    tone: "promotional",
    concept: "case",
    desc: "A brand-referenced patient success story highlighting a remarkable treatment outcome with the therapy.",
    audiences: ["Gastroenterology","Primary Care"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "4 min read",
    stars: 4.6,
    opens: "37%",
    badge: "Patient story",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"Patient story","title":"\"I got my life back.\"","sub":"A patient’s journey with our therapy and the clinical team’s perspective on what made the difference."},
    body_type: "voice",
    body_html: `
    <div class="email-section">
      <div class="email-quote">
        "I was scheduled for a third surgery. Instead, I went hiking in the Andes."
        <div class="email-quote-attr">— Carlos R.</div>
      </div>
      <p>Carlos was diagnosed six years ago and had tried three prior therapies with limited success. When he started our therapy, his expectations were modest — “I just want to stop the progression.”</p>
      <p>At 12 weeks, he reported his first symptom-free day in over a year. At 24 weeks, his objective response scores showed significant improvement. At one year, he sent his doctor a photo from a trek in Peru.</p>
      <p>“I didn’t think I would ever travel again. This therapy didn’t just treat my disease — it gave me back my future.” His physician notes that Carlos’s case, while remarkable, is consistent with the outcomes seen in the pivotal trial’s responder analysis.</p>
      <h3>Key takeaways</h3>
      <p><strong>Individual results may vary.</strong> In the pivotal trial, 68% of patients achieved the primary endpoint at 24 weeks.</p>
      <p><strong>Early response predicts long-term outcomes.</strong> Patients with response at 12 weeks were 3x more likely to maintain benefit at 2 years.</p>
      <a class="email-cta outline">Read Carlos’s full story</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "promotional-guideline",
    title: "Our therapy recommended in new guidelines",
    tone: "promotional",
    concept: "guideline",
    desc: "Brand-forward announcement that the therapy has been included in the updated treatment guidelines.",
    audiences: ["Pulmonology","Endocrinology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "2 min read",
    stars: 4.4,
    opens: "40%",
    badge: "Guideline inclusion",
    compliance: ["MLR Approved"],
    hero: {"eyebrow":"Guideline update","title":"Our therapy is now recommended as a first-line option.","sub":"Updated clinical guidelines now include our therapy as a recommended treatment option for appropriate patients."},
    body_type: "algorithm",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The updated treatment guidelines now include our therapy as a recommended option. Here’s where it fits in the new algorithm.</p>
      <h3>What changed</h3>
      <ol style="margin:0;padding-left:18px">
        <li style="margin-bottom:6px"><strong>First-line recommendation:</strong> Our therapy is now recommended as a first-line option for patients with moderate-to-severe disease and no contraindications to the class.</li>
        <li style="margin-bottom:6px"><strong>Step-up therapy:</strong> For patients with inadequate response to standard induction, our therapy is recommended as the preferred step-up option (Grade 2A).</li>
      </ol>
      <div class="email-callout">
      <div class="label">What didn't change</div>
      Baseline screening, monitoring intervals, and shared decision-making requirements remain unchanged from the 2024 guideline.
    </div>
      <a class="email-cta">View the guideline excerpt</a> <a class="email-cta outline">Download the algorithm card</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "promotional-reengage",
    title: "We have something new for you",
    tone: "promotional",
    concept: "reengage",
    desc: "A re-engagement campaign highlighting new resources and support offerings for prescribers.",
    audiences: ["Cardiology","Nephrology","Primary Care"],
    seniority: ["Mid-career","Early-career"],
    duration: "1 min read",
    stars: 3.8,
    opens: "24%",
    badge: null,
    compliance: ["Standard"],
    hero: null,
    body_type: "rep",
    body_html: `
    <div class="email-section" style="max-width:540px">
      <p>Dr. <strong>Park</strong>,</p>
      <p>I hope this note finds you well. I know it’s been a while since we last connected.</p>
      <p>We’ve launched two new resources that I think you’ll find genuinely useful: a patient-friendly dosing card (available in English and Spanish) and a prior auth pre-check tool that can save your staff up to 15 minutes per case. No sales pitch — just resources. Would it be helpful if I dropped them off next week?</p>
      <a class="email-cta">Yes — please stop by</a> <a class="email-cta outline">Send them digitally</a> <a class="email-cta outline">No thanks</a>
      <p>— <strong>Sam Okeke, Field Account Manager, HCP Campaign Studio<br /><span style="color:var(--muted);font-size:12px">(415) 555-2104 · sam.okeke@hcpcampaign.example</span></strong></p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "empathetic-launch",
    title: "A new option for your patients who need one more choice",
    tone: "empathetic",
    concept: "launch",
    desc: "An empathetic launch announcement framed around expanding options for patients who have limited alternatives.",
    audiences: ["Oncology","Hematology"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "3 min read",
    stars: 4.5,
    opens: "39%",
    badge: "New option",
    compliance: ["Standard"],
    hero: {"eyebrow":"A new choice","title":"For patients who need one more option.","sub":"We know how hard it is when options run out. A new therapy is now available for appropriate patients."},
    body_type: "letter",
    body_html: `
    <div class="email-section" style="max-width:540px">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>I wanted to share something personal before the formal announcement. When I was in training, I had a patient — a young mother of two — who ran out of options. We had nothing left to offer. That memory has stayed with me through every clinical development program I’ve worked on.</p>
      <p>The therapy that launches today won’t help every patient. But for the ones who fit the profile — who’ve tried two prior therapies and are running out of time — it represents something we didn’t have before: another chance.</p>
      <p>I’m sharing the prescribing information below. If it’s right for one of your patients, that’s enough.</p>
      <p>With gratitude,<br /><strong>Dr. A. Park</strong><br />Clinical Development · HCP Campaign Studio</p>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "empathetic-data",
    title: "What the data means for the patients we serve",
    tone: "empathetic",
    concept: "data",
    desc: "An empathetic framing of clinical trial results, focused on what the numbers mean for real patients.",
    audiences: ["Cardiology","Neurology"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "4 min read",
    stars: 4.6,
    opens: "38%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"Data with context","title":"Beyond the hazard ratio — what changed for patients.","sub":"New trial data presented through the lens of patient-reported outcomes and quality of life."},
    body_type: "stats",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>These patient-reported outcomes come from the prespecified PRO analysis of the Phase III trial. While the primary endpoint was met with a hazard ratio of 0.62 (p<0.001), these numbers tell the story of what that statistical benefit meant for patients’ daily lives.</p>
      <div class="email-stat-row">
        <div class="email-stat"><div class="v">67%</div><div class="l">Reported improved quality of life at 12 months (vs. 41% control)</div></div>
        <div class="email-stat"><div class="v">2.4×</div><div class="l">More patients returned to work or regular activities</div></div>
        <div class="email-stat"><div class="v">82%</div><div class="l">Would recommend the therapy to a friend with the same condition</div></div>
      </div>
      <p><a class="email-cta">Read the PRO analysis</a> <a class="email-cta outline">View patient stories</a></p>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "empathetic-congress",
    title: "A different kind of conference recap",
    tone: "empathetic",
    concept: "congress",
    desc: "A conference recap focused on the patient narratives and human moments behind the data presentations.",
    audiences: ["Rheumatology","Primary Care"],
    seniority: ["Mid-career","Senior / Attending"],
    duration: "3 min read",
    stars: 4.5,
    opens: "36%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"Beyond the abstracts","title":"The stories behind the data at this year’s congress.","sub":"What the patient speakers taught us about living with the conditions we treat."},
    body_type: "rsvp",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      <p>The data presentations were impressive. But what stayed with me longest was the patient panel — three individuals living with chronic disease who shared their stories. One said something I keep coming back to: “I don’t need you to cure me. I need you to see me.”</p>
      <div class="email-callout">
      <div class="label">Event details</div>
      <strong>Patient perspectives session</strong><br />
       Recorded at the annual congress · 45 minutes<br />
       Three patient narratives with clinical commentary from their treating physicians.
    </div>
      <a class="email-cta">Watch the recording</a> <a class="email-cta outline">Read the highlights</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "empathetic-cme",
    title: "CME with a human lens — the patient experience",
    tone: "empathetic",
    concept: "cme",
    desc: "A CME module integrating patient experience narratives with clinical best practices.",
    audiences: ["Psychiatry","Neurology"],
    seniority: ["Early-career","Mid-career"],
    duration: "5 min read",
    stars: 4.5,
    opens: "33%",
    badge: "CME",
    compliance: ["Standard"],
    hero: {"eyebrow":"CME · 1.5 credits","title":"Clinical excellence through patient partnership.","sub":"A CME module that integrates patient experience narratives with evidence-based practice."},
    body_type: "explainer",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      
      <h3>1. Why the patient story matters for outcomes</h3>
      <p>Patients who feel heard have better adherence, better satisfaction, and better clinical outcomes. This isn’t soft science — it’s supported by a growing evidence base linking shared decision-making to reduced hospitalizations and improved medication persistence.</p>
      
      <h3>2. Practical tools for patient-centered visits</h3>
      <p>Three techniques you can use in your next clinic: the “What matters most?” opening question, the teach-back method for treatment plans, and the 30-second pause after the patient finishes speaking.</p>
      
      <h3>3. Real-world application — a case example</h3>
      <p>A 45-year-old with newly diagnosed chronic illness who was initially non-adherent. The turning point came when the clinician asked, “What are you most afraid of?” The answer changed the treatment plan and saved the therapeutic relationship.</p>
      <a class="email-cta outline">Take the CME module (1.5 credits)</a>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  },
  {
    id: "empathetic-guideline",
    title: "New guidelines — a patient-centered perspective",
    tone: "empathetic",
    concept: "guideline",
    desc: "A thoughtful walk-through of new guidelines, framed around what the changes mean for the patient experience.",
    audiences: ["Endocrinology","Nephrology","Primary Care"],
    seniority: ["Senior / Attending","Mid-career"],
    duration: "4 min read",
    stars: 4.5,
    opens: "35%",
    badge: null,
    compliance: ["Standard"],
    hero: {"eyebrow":"Guidelines through patients’ eyes","title":"What the new recommendations mean for the people we treat.","sub":"A practical, patient-centered interpretation of the updated clinical practice guidelines."},
    body_type: "digest",
    body_html: `
    <div class="email-section">
      <p>Dear Dr. <strong>Park</strong></p>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">What changes for patients</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">The new guidelines recommend earlier initiation of combination therapy. For patients, this means potentially fewer clinic visits for dose adjustments and more time feeling well. The evidence suggests that patients who start combination therapy earlier have better long-term functional outcomes.</p>
      </div>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">What stays the same</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">Shared decision-making remains the foundation. The guidelines emphasize that treatment goals should be co-developed with patients, incorporating their preferences, values, and life circumstances. No algorithm can replace that conversation.</p>
      </div>
      
      <div style="border-left:3px solid #1D5874;padding-left:16px;margin-bottom:16px;">
        <div style="font-size:12px;font-weight:700;color:#1D5874;text-transform:uppercase;margin-bottom:6px;">What we’re hearing from patients</div>
        <p style="font-size:14px;color:#333;line-height:1.6;margin:0;">In focus groups conducted during the guideline development process, patients consistently ranked “having my doctor listen to me” above “having access to the newest therapy.” The new guidelines reflect this by embedding shared decision-making language throughout the recommendations.</p>
      </div>
      <a class="email-cta outline">Read the patient-centered guideline summary →</a>
      <div class="isi-block">
      <div class="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection. Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient. In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo. Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
      <div class="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio · <a style="color:var(--accent)">Manage preferences</a> · <a style="color:var(--accent)">Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
    </div>`,
  }
];