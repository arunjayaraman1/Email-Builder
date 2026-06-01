"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Check, ChevronDown, Users, Bookmark, Loader2 } from "lucide-react";
import { useCampaignStore } from "@/lib/store";
import { getOptions } from "@/lib/api";
import { toast } from "sonner";
import type { Options } from "@/lib/types";

type PopId = "geo" | "therapy" | "brand" | "audience" | "asset" | null;

const TA_COLORS: Record<string, string> = {
  Oncology: "#7c3aed",
  Cardiology: "#dc2626",
  Neurology: "#2563eb",
  Immunology: "#0891b2",
  Respiratory: "#ca8a04",
  "Endocrine & Metabolic": "#059669",
};

function taColor(ta: string): string {
  return TA_COLORS[ta] ?? "#6b7280";
}

function taInitial(ta: string): string {
  return ta.split(/[\s&]+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function CtxPill({ id, label, openId, toggle, children, value, icon }: {
  id: PopId;
  label: string;
  openId: PopId;
  toggle: (id: PopId) => void;
  children: React.ReactNode;
  value?: string;
  icon?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const open = openId === id;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) toggle(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, toggle]);

  return (
    <div ref={ref} style={{ position: "relative", flex: "1 1 0", minWidth: 0 }}>
      <button className={"ctxpill " + (open ? "open" : "")} onClick={() => toggle(id)} style={{ width: "100%" }}>
        <div className="pl-l">{label}</div>
        <div className="pl-v">
          {icon}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
          <ChevronDown size={12} className="chev" />
        </div>
      </button>
      {open && children}
    </div>
  );
}

function PopHead({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="ctxpop-search">
      <Search size={13} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? "Search\u2026"} autoFocus />
    </div>
  );
}

export default function ContextBar() {
  const { campaignCtx, setCampaignCtx } = useCampaignStore();
  const [openId, setOpenId] = useState<PopId>(null);
  const [q, setQ] = useState("");
  const [opts, setOpts] = useState<Options | null>(null);

  useEffect(() => {
    getOptions().then(setOpts).catch(console.error);
  }, []);

  useEffect(() => setQ(""), [openId]);

  const toggle = (id: PopId) => {
    setOpenId((cur) => (cur === id ? null : id));
    setQ("");
  };

  const close = () => setOpenId(null);

  const brands = (opts?.brands ?? []).filter(
    (b) => b.therapyArea === null || b.therapyArea === campaignCtx.therapyArea
  );

  const currentGeo = (opts?.geos ?? []).find((g) => g.label === campaignCtx.geo);
  const currentBrand = (opts?.brands ?? []).find((b) => b.label === campaignCtx.brand);
  const currentAud = (opts?.audiencesWithSizes ?? []).find((a) => a.label === campaignCtx.audience);
  const currentAsset = (opts?.assetTypes ?? []).find((a) => a.label === campaignCtx.assetType);
  const reachSize = currentAud?.size ?? 4280;

  const handleSaveContext = () => {
    localStorage.setItem("hcp_campaign_ctx", JSON.stringify(campaignCtx));
    toast.success("Context saved");
  };

  if (!opts) {
    return (
      <div className="ctxbar" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Loader2 size={12} className="animate-spin" style={{ color: "var(--muted)" }} />
        <span style={{ fontSize: 12, color: "var(--muted)" }}>Loading context\u2026</span>
      </div>
    );
  }

  const filt = (s: string) => !q || s.toLowerCase().includes(q.toLowerCase());

  return (
    <div className="ctxbar">
      <div className="ctx-label">Campaign</div>

      {/* Geo */}
      <CtxPill id="geo" label="Geo" openId={openId} toggle={toggle}
        value={currentGeo?.label ?? "Select"}
        icon={<span className="flag">{currentGeo?.flag ?? "\uD83C\uDF10"}</span>}
      >
        <div className="ctxpop">
          <PopHead value={q} onChange={setQ} placeholder="Search markets\u2026" />
          {(opts.geos ?? []).filter((g) => filt(g.label)).map((g) => (
            <div key={g.id} className={"ctxpop-item " + (campaignCtx.geo === g.label ? "on" : "")}
              onClick={() => { setCampaignCtx({ geo: g.label }); close(); }}>
              <span className="check-dot"><Check size={9} /></span>
              <span className="ic" style={{ fontSize: 16 }}>{g.flag}</span>
              <div className="body">
                <div className="title">{g.label}</div>
                <div className="sub">{g.sub}</div>
              </div>
              {g.id === "us" && <span className="pill-tag">Default</span>}
            </div>
          ))}
          <div className="ctxpop-foot">
            <span>Selecting a region scopes templates to MLR-approved variants.</span>
          </div>
        </div>
      </CtxPill>

      {/* Therapy Area */}
      <CtxPill id="therapy" label="Therapy area" openId={openId} toggle={toggle}
        value={campaignCtx.therapyArea}
        icon={<span className="swatch" style={{ background: taColor(campaignCtx.therapyArea) }} />}
      >
        <div className="ctxpop">
          <PopHead value={q} onChange={setQ} placeholder="Search therapy areas\u2026" />
          {(opts.therapyAreas ?? []).filter((t) => filt(t)).map((t) => (
            <div key={t} className={"ctxpop-item " + (campaignCtx.therapyArea === t ? "on" : "")}
              onClick={() => {
                const firstBrand = (opts.brands ?? []).find((b) => b.therapyArea === t)?.label ?? "Portfolio";
                setCampaignCtx({ therapyArea: t, brand: firstBrand });
                close();
              }}>
              <span className="check-dot"><Check size={9} /></span>
              <span className="ic" style={{ background: taColor(t), color: "white" }}>
                <span style={{ fontFamily: "var(--font-serif)", fontSize: 14 }}>{taInitial(t)}</span>
              </span>
              <div className="body">
                <div className="title">{t}</div>
              </div>
            </div>
          ))}
          <div className="ctxpop-foot">
            <span>{(opts.brands ?? []).filter((b) => b.therapyArea).length} branded products across {new Set((opts.brands ?? []).map((b) => b.therapyArea).filter(Boolean)).size} therapy areas</span>
          </div>
        </div>
      </CtxPill>

      {/* Brand */}
      <CtxPill id="brand" label="Brand" openId={openId} toggle={toggle}
        value={currentBrand?.label ?? "Select"}
        icon={currentBrand ? <span className="brandmark" style={{ background: "#7c3aed" }}>{currentBrand.label[0]}</span> : undefined}
      >
        <div className="ctxpop">
          <PopHead value={q} onChange={setQ} placeholder="Search brands\u2026" />
          {brands.filter((b) => filt(b.label)).map((b) => (
            <div key={b.id} className={"ctxpop-item " + (campaignCtx.brand === b.label ? "on" : "")}
              onClick={() => { setCampaignCtx({ brand: b.label }); close(); }}>
              <span className="check-dot"><Check size={9} /></span>
              <span className="ic brand" style={{ background: "#7c3aed" }}>{b.label[0]}</span>
              <div className="body">
                <div className="title">{b.label} {b.generic && <span style={{ color: "var(--muted)", fontSize: 11.5, fontWeight: 400 }}>({b.generic})</span>}</div>
              </div>
            </div>
          ))}
          <div className="ctxpop-foot">
            <span>Filtered by {campaignCtx.therapyArea}</span>
          </div>
        </div>
      </CtxPill>

      {/* Audience */}
      <CtxPill id="audience" label="Audience" openId={openId} toggle={toggle}
        value={currentAud?.label ?? "All HCPs"}
        icon={<Users size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />}
      >
        <div className="ctxpop">
          <PopHead value={q} onChange={setQ} placeholder="Search audiences\u2026" />
          {(opts.audiencesWithSizes ?? []).filter((a) => filt(a.label)).map((a) => (
            <div key={a.id} className={"ctxpop-item " + (campaignCtx.audience === a.label ? "on" : "")}
              onClick={() => { setCampaignCtx({ audience: a.label }); close(); }}>
              <span className="check-dot"><Check size={9} /></span>
              <span className="ic"><Users size={14} /></span>
              <div className="body">
                <div className="title">{a.label}</div>
              </div>
              <span className="pill-tag">{a.size.toLocaleString()}</span>
            </div>
          ))}
          <div className="ctxpop-foot">
            <span>{(opts.audiencesWithSizes ?? []).length} saved segments</span>
          </div>
        </div>
      </CtxPill>

      {/* Asset Type */}
      <CtxPill id="asset" label="Asset type" openId={openId} toggle={toggle}
        value={currentAsset?.label ?? "Select"}
        icon={<span style={{ fontFamily: "var(--font-serif)", fontSize: 15, color: "var(--ink)" }}>{currentAsset?.icon ?? "\u2709"}</span>}
      >
        <div className="ctxpop">
          <PopHead value={q} onChange={setQ} placeholder="Search asset types\u2026" />
          {(opts.assetTypes ?? []).filter((a) => filt(a.label)).map((a) => (
            <div key={a.id} className={"ctxpop-item " + (campaignCtx.assetType === a.label ? "on" : "")}
              onClick={() => { setCampaignCtx({ assetType: a.label }); close(); }}>
              <span className="check-dot"><Check size={9} /></span>
              <span className="ic" style={{ fontFamily: "var(--font-serif)", fontSize: 15 }}>{a.icon}</span>
              <div className="body">
                <div className="title">{a.label}</div>
                <div className="sub">{a.sub}</div>
              </div>
            </div>
          ))}
          <div className="ctxpop-foot">
            <span>Asset shapes preview, copy length, and CTA style.</span>
          </div>
        </div>
      </CtxPill>

      <div className="ctx-right">
        <div className="ctx-meta">
          <span>Reach</span>
          <b>{(reachSize).toLocaleString()} HCPs</b>
        </div>
        <button className="btn" onClick={handleSaveContext}><Bookmark size={12} /> Save context</button>
      </div>
    </div>
  );
}
