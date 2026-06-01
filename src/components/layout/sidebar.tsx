"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, Mail, LayoutGrid, Shield, Check, Loader2 } from "lucide-react";
import { useCampaignStore } from "@/lib/store";
import { getOptions } from "@/lib/api";
import { TONE_COLOR } from "@/lib/tones";

const NAV_ITEMS = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/campaigns", icon: Mail, label: "Campaigns" },
  { href: "/templates", icon: LayoutGrid, label: "Templates" },
];

const userName = process.env.NEXT_PUBLIC_USER_NAME ?? "User";

export default function Sidebar() {
  const pathname = usePathname();
  const { filters, setFilters } = useCampaignStore();
  const inCampaign = pathname === "/campaign";

  const [concepts, setConcepts] = useState<string[]>([]);
  const [tones, setTones] = useState<string[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [compliance, setCompliance] = useState<string[]>([]);
  const [loading, setLoading] = useState(inCampaign);
  const [range, setRange] = useState<[number, number]>(filters.readTimeRange);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);

  useEffect(() => {
    if (!inCampaign) return;
    getOptions()
      .then((o) => {
        setConcepts(o.campaignTypes ?? []);
        setTones(o.tones ?? []);
        setSpecialties((o as { specialties?: string[] }).specialties ?? []);
        setCompliance(o.compliance ?? []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [inCampaign]);

  useEffect(() => {
    setFilters({ readTimeRange: range });
  }, [range, setFilters]);

  const toggle = (key: "concepts" | "tones" | "specialties" | "compliance", value: string) => {
    const current = filters[key] as string[];
    const next = current.includes(value) ? current.filter((x) => x !== value) : [...current, value];
    setFilters({ [key]: next });
  };

  const getPercent = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(1, (clientX - left) / width));
  }, []);

  const handleMouseDown = (thumb: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = thumb;
    const onMove = (ev: MouseEvent) => {
      const pct = getPercent(ev.clientX);
      const val = Math.round(1 + pct * 7);
      setRange((r) => {
        if (dragging.current === "min") return [Math.min(val, r[1]), r[1]];
        return [r[0], Math.max(val, r[0])];
      });
    };
    const onUp = () => {
      dragging.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const hasAny = Object.entries(filters).some(([k, v]) => {
    if (k === "readTimeRange") return (v as [number, number])[0] > 1 || (v as [number, number])[1] < 8;
    return (v as string[]).length > 0;
  });

  const minPct = ((range[0] - 1) / 7) * 100;
  const maxPct = ((range[1] - 1) / 7) * 100;

  return (
    <aside className="app-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">H</div>
        <div>
          <div className="sidebar-logo-title">HCP Campaign</div>
          <div className="sidebar-logo-sub">Studio</div>
        </div>
      </div>

      {/* New Campaign CTA */}
      <div className="sidebar-new">
        <Link
          href="/campaign"
          className={`nav-item primary${pathname === "/campaign" ? " active" : ""}`}
        >
          <PlusCircle size={15} />
          New Campaign
        </Link>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`nav-item${active ? " active" : ""}`}>
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Campaign Filters */}
      {inCampaign && (
        <div className="sidebar-filters">
          {loading ? (
            <div className="sidebar-loading">
              <Loader2 size={14} className="animate-spin" style={{ color: "var(--accent)" }} />
            </div>
          ) : (
            <>
              <div className="filter-header">
                <span>Filters</span>
                {hasAny && (
                  <button onClick={() => { setFilters({ concepts: [], tones: [], specialties: [], compliance: [], readTimeRange: [1, 8] }); setRange([1, 8]); }}>
                    Clear all
                  </button>
                )}
              </div>

              <div className="filter-block">
                <h4>Concept</h4>
                {concepts.map((c) => (
                  <div key={c} className="filter-row" onClick={() => toggle("concepts", c)}>
                    <div className="label">
                      <span className={"check " + (filters.concepts.includes(c) ? "checked" : "")}>
                        {filters.concepts.includes(c) && <Check size={9} />}
                      </span>
                      <span>{c}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="filter-block">
                <h4>Tone</h4>
                {tones.map((t) => {
                  const isOn = filters.tones.includes(t);
                  return (
                    <div key={t} className="filter-row" onClick={() => toggle("tones", t)}>
                      <div className="label">
                        <span className={"check " + (isOn ? "checked" : "")}>
                          {isOn && <Check size={9} />}
                        </span>
                        {TONE_COLOR[t] && <span className="swatch" style={{ background: TONE_COLOR[t] }} />}
                        <span>{t}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="filter-block">
                <h4>Specialty</h4>
                {specialties.slice(0, 8).map((s) => (
                  <div key={s} className="filter-row" onClick={() => toggle("specialties", s)}>
                    <div className="label">
                      <span className={"check " + (filters.specialties.includes(s) ? "checked" : "")}>
                        {filters.specialties.includes(s) && <Check size={9} />}
                      </span>
                      <span>{s}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="filter-block">
                <h4>Read time</h4>
                <div className="slider-wrap">
                  <div className="slider-labels">
                    <span>{range[0]} min</span><span>{range[1]} min</span>
                  </div>
                  <div ref={sliderRef} className="slider-track">
                    <div className="slider-fill" style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }} />
                    <div className="slider-thumb" onMouseDown={handleMouseDown("min")} style={{ left: `${minPct}%` }} />
                    <div className="slider-thumb" onMouseDown={handleMouseDown("max")} style={{ left: `${maxPct}%` }} />
                  </div>
                </div>
              </div>

              <div className="filter-block">
                <h4>Compliance</h4>
                {compliance.map((c) => (
                  <div key={c} className="filter-row" onClick={() => toggle("compliance", c)}>
                    <div className="label">
                      <span className={"check " + (filters.compliance.includes(c) ? "checked" : "")}>
                        {filters.compliance.includes(c) && <Check size={9} />}
                      </span>
                      <span>{c}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="nav-item" style={{ cursor: "default", opacity: 0.55 }}>
          <Shield size={15} />
          Admin
        </div>
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {(process.env.NEXT_PUBLIC_USER_INITIALS ?? userName.slice(0, 2).toUpperCase())}
          </div>
          <div>
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-role">{process.env.NEXT_PUBLIC_USER_ROLE ?? "Member"}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
