"use client";

import { TONE_COLOR } from "@/lib/tones";

export interface EmailBodyTemplate {
  tone: string;
  hero?: { eyebrow: string; title: string; sub: string } | null;
  body_type: string;
}

export function HeroBand({ t, full = true }: { t: EmailBodyTemplate; full?: boolean }) {
  if (!t.hero) return null;
  return (
    <div className={`email-hero${full ? " full" : ""}`}>
      <div className="eh-band" style={{ background: TONE_COLOR[t.tone] ?? "var(--accent)" }}>
        <div className="eh-eyebrow">{t.hero.eyebrow}</div>
        <div className="eh-title">{t.hero.title}</div>
        <div className="eh-sub">{t.hero.sub}</div>
      </div>
    </div>
  );
}

export function ISIBlock() {
  return (
    <div className="isi-block">
      <div className="h">Important safety information</div>
      Selected adverse reactions (≥5% and greater than placebo) include injection-site reactions, headache, and upper respiratory infection.
      Contraindicated in patients with known hypersensitivity to the active ingredient or any excipient.
      In clinical trials, serious infections occurred in 1.7% of treated patients vs. 1.1% of placebo.
      Please see Full Prescribing Information, including Boxed Warning, at example-hcp.com/pi.
    </div>
  );
}

export function EmailFoot() {
  return (
    <div className="email-foot">
      You're receiving this email because you opted in to clinical updates from HCP Campaign Studio ·{" "}
      <a style={{ color: "var(--accent)" }}>Manage preferences</a> · <a style={{ color: "var(--accent)" }}>Unsubscribe</a><br />
      Intended for US healthcare professionals only. 200 Powell St, San Francisco, CA 94102.
    </div>
  );
}

type BodyRenderer = (t: EmailBodyTemplate) => React.ReactNode;

const Bodies: Record<string, BodyRenderer> = {
  stats: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>Dear Dr. <strong>Park</strong>,</p>
      <p>The ASCEND-7 investigators present pre-specified analyses of the primary and key secondary endpoints. Results were consistent across the pre-specified subgroups, including patients with prior platinum exposure.</p>
      <div className="email-stat-row">
        <div className="email-stat"><div className="v">38<span style={{ fontSize: 14 }}>%</span></div><div className="l">Reduction in disease progression (HR 0.62, 95% CI 0.51–0.75)</div></div>
        <div className="email-stat"><div className="v">24<span style={{ fontSize: 14 }}>mo</span></div><div className="l">Median follow-up across the ITT population</div></div>
        <div className="email-stat"><div className="v">81<span style={{ fontSize: 14 }}>%</span></div><div className="l">Disease-control rate, vs. 64% with standard of care</div></div>
      </div>
      <a className="email-cta">Read the full readout</a>{" "}<a className="email-cta outline">Download the methods</a>
      <h3>What the investigators are saying</h3>
      <p>&ldquo;The magnitude of the progression-free survival benefit is consistent with what we observed in the Phase IIb expansion cohort, and the safety profile remains manageable.&rdquo; — Dr. R. Mehta, study chair.</p>
      <ISIBlock />
      <EmailFoot />
    </div>
  ),

  letter: (t) => (
    <div className="email-section" style={{ maxWidth: 540 }}>
      <HeroBand t={t} />
      <p>Dear Dr. <strong>Park</strong>,</p>
      <p>I wanted to write you directly about something I've been thinking about since I last saw the data at AHA. For years we've been hedging on dose escalation in patients with baseline eGFR between 30 and 45 — and the new GUIDE-HF subgroup analysis is, I think, the first time we've had clean evidence that we were probably being too cautious.</p>
      <p>The signal isn't subtle: in the 412 patients in that strata, titration to target was associated with a 17% lower rate of HF hospitalization at 12 months. The renal endpoints are reassuring. I'd encourage you to look at Table 3 yourself — I'm linking the supplement below.</p>
      <a className="email-cta outline">Read the GUIDE-HF supplement</a>
      <p>Happy to talk it through. I'll be at the regional VAD meeting in November if you'll be there.</p>
      <p>Warmly,<br /><strong>Dr. Aniya Park, MD</strong><br />Cardiovascular Disease · HCP Campaign Institute</p>
      <EmailFoot />
    </div>
  ),

  rsvp: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>Reserved seating is limited and we'd hate for you to miss this one. The Madrid satellite will feature investigator commentary on the ASCEND-7 readout and a moderated Q&amp;A.</p>
      <div className="email-callout">
        <div className="label">Event details</div>
        <strong>Saturday, October 19 · 18:00–20:30 CET</strong><br />
        Hotel Riu Plaza España · Gran Via 84 · Madrid, ES<br />
        Dinner and reception included. Travel honorarium applies for invited faculty.
      </div>
      <a className="email-cta">Reserve my seat →</a> <a className="email-cta outline">Add to calendar</a>
      <h3>Confirmed speakers</h3>
      <p><strong>Dr. Aniya Park</strong> — Memorial Sloan Kettering<br /><strong>Dr. Marcus Reyes</strong> — MD Anderson<br /><strong>Dr. Lena Schultz</strong> — Charité-Berlin</p>
      <EmailFoot />
    </div>
  ),

  case: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p style={{ color: "var(--muted)", fontStyle: "italic", fontSize: 12.5 }}>A case from Dr. Vivian Lin's clinic. Names and identifying details have been changed.</p>
      <p>Maria came to my office in March of 2024 with a tablet full of clinical-trial bookmarks and a single question: &ldquo;If I had three months to decide, what would <em>you</em> do?&rdquo;</p>
      <p>She had read the ASCEND-7 inclusion criteria, ranked the comparator arms by ECOG, and brought a list of seven questions for the consent visit. The decision in front of her was difficult — but the conversation we had wasn't.</p>
      <div className="email-quote">
        &ldquo;Once I understood the trade-offs in my own words, the decision stopped feeling like a gamble and started feeling like a plan.&rdquo;
        <div className="email-quote-attr">— Maria, 58, after 14 months on therapy</div>
      </div>
      <p>What follows is the case, told mostly in her words, with my clinical commentary in the margins.</p>
      <a className="email-cta outline">Read Maria's full case (5 min)</a>
      <ISIBlock />
      <EmailFoot />
    </div>
  ),

  algorithm: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>The 2026 algorithm is mostly a clarification of 2024 — but with two meaningful changes that we want to flag before you see them in practice.</p>
      <h3>What changed</h3>
      <ol style={{ margin: 0, paddingLeft: 18 }}>
        <li style={{ marginBottom: 6 }}><strong>Step-1 therapy</strong> now permits the JAK-inhibitor class for patients with documented intolerance to anti-TNF agents.</li>
        <li style={{ marginBottom: 6 }}><strong>Step-3 escalation</strong> requires only one inadequate response before considering combination therapy (down from two).</li>
      </ol>
      <div className="email-callout">
        <div className="label">What didn't change</div>
        Baseline screening recommendations, vaccination requirements, and the patient-shared-decision step before any biologic remain unchanged.
      </div>
      <a className="email-cta">View the side-by-side</a> <a className="email-cta outline">Download the PDF (1 page)</a>
      <EmailFoot />
    </div>
  ),

  series: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>Each Monday at 7:00 AM ET, you'll receive a single complex case — 5 minutes to read, 10 minutes of discussion, 0.5 CME credits.</p>
      <div className="email-callout">
        <div className="label">Series at a glance</div>
        <strong>12 weeks</strong> · <strong>0.5 credit/week</strong> · <strong>6.0 credits total</strong><br />
        Faculty: Drs. Sayed, Han, and Okafor. Co-sponsored by HCP Campaign Studio and CHEST.
      </div>
      <a className="email-cta">Enroll for free</a> <a className="email-cta outline">See the case list</a>
      <h3>Week 1 — a 64-year-old with refractory T2DM</h3>
      <p>Your first case lands next Monday. Want to see a sample first? <a style={{ color: "var(--accent)" }}>Preview week 1 →</a></p>
      <EmailFoot />
    </div>
  ),

  approval: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>The U.S. Food and Drug Administration has approved <strong>ZENVERA (mepolitixab-rztu)</strong> for an expanded indication in adults with severe eosinophilic asthma. The approval is supported by the BREATHE-3 and BREATHE-4 studies (combined N = 1,402).</p>
      <h3>Prescribing essentials</h3>
      <p><strong>Dosing</strong> — 100 mg subcutaneously every 4 weeks.<br /><strong>Patient selection</strong> — Adults ≥ 18 with eosinophil counts ≥ 300 cells/µL in the prior 12 months.<br /><strong>Setting</strong> — Self-administered after first dose in clinic.</p>
      <a className="email-cta">Full prescribing information</a> <a className="email-cta outline">Patient eligibility guide</a>
      <ISIBlock />
      <EmailFoot />
    </div>
  ),

  winback: (t) => (
    <div className="email-section" style={{ maxWidth: 520 }}>
      <HeroBand t={t} />
      <p>Dear Dr. <strong>Park</strong>,</p>
      <p>It's been a while — we noticed you haven't opened any of our updates in the last quarter, and we don't want to keep landing in your inbox if it's not useful.</p>
      <p>Before we slow things down, one offer: a single, no-spin summary of the three things in cardiology that actually changed this year. Three paragraphs, no CTAs at the bottom, no follow-up unless you ask.</p>
      <a className="email-cta">Send me the summary</a> <a className="email-cta outline">Unsubscribe from updates</a>
      <p style={{ color: "var(--muted)", fontSize: 12.5 }}>Either way — thank you for the work you do.</p>
      <EmailFoot />
    </div>
  ),

  embargo: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <div className="email-callout" style={{ background: "var(--rose-soft)", color: "var(--rose)" }}>
        <div className="label" style={{ color: "var(--rose)" }}>⚑ EMBARGOED</div>
        <strong>Do not share or publish before October 14, 2026, 8:00 AM ET.</strong> By reading this email you agree to honor the embargo.
      </div>
      <p>MERIDIAN-2 met its primary endpoint of progression-free survival at the pre-specified interim analysis. The independent Data Monitoring Committee recommended stopping the study for efficacy.</p>
      <div className="email-stat-row">
        <div className="email-stat"><div className="v">0.58</div><div className="l">Hazard ratio for PFS (95% CI 0.46–0.73)</div></div>
        <div className="email-stat"><div className="v">p&lt;.001</div><div className="l">Statistical significance vs. comparator</div></div>
        <div className="email-stat"><div className="v">N=842</div><div className="l">Intent-to-treat population</div></div>
      </div>
      <a className="email-cta">View the embargoed release</a>
      <EmailFoot />
    </div>
  ),

  explainer: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>You probably know the JAK-STAT pathway better than most podcasters. So we'll skip the intro and get to the part that matters for prescribing decisions.</p>
      <h3>1. Where in the cascade does it act?</h3>
      <p>Selectively at JAK-1 over JAK-2 (≈ 50× selectivity in cell-free assays). The downstream effect: blunted IL-6 and IFN-γ signaling without the erythropoietic effects you see with pan-JAK inhibition.</p>
      <h3>2. Why does that matter clinically?</h3>
      <p>Less anemia. Less neutropenia. The same disease-modifying activity in moderate-to-severe RA in the SELECT-COMPARE comparison.</p>
      <h3>3. Where does it sit in your algorithm?</h3>
      <p>For most clinicians, after MTX failure and as a step-down from anti-TNF when patients prefer an oral. The new guideline supports it as a Step-1 option in TNF-intolerant patients.</p>
      <a className="email-cta outline">See the full explainer →</a>
      <EmailFoot />
    </div>
  ),

  rwe: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <p>The Q1 2026 RWE snapshot pulls from the Optum Clinformatics® DataMart and covers 11,402 patient-years across 12 sites. Methods and code are linked at the bottom.</p>
      <div className="email-stat-row">
        <div className="email-stat"><div className="v">76<span style={{ fontSize: 14 }}>%</span></div><div className="l">12-month persistence on initial therapy</div></div>
        <div className="email-stat"><div className="v">61<span style={{ fontSize: 14 }}>%</span></div><div className="l">24-month persistence, with a single switch allowed</div></div>
        <div className="email-stat"><div className="v">1.4<span style={{ fontSize: 14 }}>×</span></div><div className="l">Adherence in patients on once-daily vs. BID</div></div>
      </div>
      <h3>Notable, not surprising</h3>
      <p>Patients enrolled in a manufacturer-sponsored adherence program had 12-month persistence of 84% — a 9-point absolute improvement over those not enrolled. The effect held after adjusting for baseline severity.</p>
      <a className="email-cta">View the dashboard</a> <a className="email-cta outline">Download dataset (.csv)</a>
      <EmailFoot />
    </div>
  ),

  voice: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <div className="email-quote">
        &ldquo;For the first year, the device on my wrist told me more about my heart than I told it. I learned to listen to my body again.&rdquo;
        <div className="email-quote-attr">— Renata, 62, two years post-implantation</div>
      </div>
      <p>Renata is one of 320 patients in the GUIDE-HF community whose post-implantation journeys we follow. Her cardiologist, Dr. Lin, joined us for a clinical commentary on the case — what she'd do differently, and what she wouldn't.</p>
      <h3>Two lessons from year one</h3>
      <p><strong>Adherence is a conversation, not a setting.</strong> The patients who do best after implantation are the ones whose clinicians check in at 30, 60, and 90 days — not the ones with the most aggressive titration schedules.</p>
      <p><strong>The device data doesn't replace the patient narrative.</strong> Renata's first major change in symptoms was caught by her partner, not her CardioMEMS.</p>
      <a className="email-cta outline">Read the full piece (7 min)</a>
      <EmailFoot />
    </div>
  ),

  rep: (t) => (
    <div className="email-section" style={{ maxWidth: 540 }}>
      <HeroBand t={t} />
      <p>Dr. <strong>Park</strong>,</p>
      <p>Thanks for the time this morning — and for the candor about where the formulary committee sits on prior auth. As promised, I've attached the one-page eligibility flow and the savings card you can leave at the front desk.</p>
      <p>If it's useful, I can swing by next Thursday afternoon with the patient-counseling deck for your NPs. No pressure either way.</p>
      <a className="email-cta">Confirm Thursday at 2:30 PM</a> <a className="email-cta outline">Reschedule</a>
      <p>— <strong>Sam Okeke</strong>, Field Account Manager, HCP Campaign Studio<br /><span style={{ color: "var(--muted)", fontSize: 12 }}>(415) 555-2104 · sam.okeke@hcpcampaign.example</span></p>
      <EmailFoot />
    </div>
  ),

  digest: (t) => (
    <div className="email-section">
      <HeroBand t={t} />
      <h3>What's new in chapter 7</h3>
      <p>The eosinophilic asthma chapter has been substantially rewritten. The structure is preserved; the evidence behind each recommendation has moved up a grade in three places.</p>
      <p><strong>§7.2 Diagnosis</strong> — Now recommends a 2-point eosinophil threshold (sputum ≥ 3% and blood ≥ 300 cells/µL). Previously sputum-only.</p>
      <p><strong>§7.4 First-line maintenance</strong> — High-dose ICS plus LABA remains first-line; the dose threshold for &ldquo;high&rdquo; has been clarified.</p>
      <p><strong>§7.6 Biologic selection</strong> — A new decision table maps eosinophil count and exacerbation history to anti-IL-5 vs. anti-IgE.</p>
      <a className="email-cta outline">Open chapter 7 →</a>
      <ISIBlock />
      <EmailFoot />
    </div>
  ),
};

export function EmailBody({ template }: { template: EmailBodyTemplate }) {
  const renderer = Bodies[template.body_type] ?? Bodies.letter;
  return <div className="email-body">{renderer(template)}</div>;
}
