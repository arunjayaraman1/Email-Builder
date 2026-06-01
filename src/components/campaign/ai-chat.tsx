"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Paperclip, Star, Eye } from "lucide-react";
import { useCampaignStore } from "@/lib/store";
import { aiChat, getOptions } from "@/lib/api";
import type { ChatRec } from "@/lib/api";
import type { TemplateCard } from "@/lib/types";

type Message =
  | { role: "assistant"; text: string; chips?: string[]; audience?: string; recs?: ChatRec[] }
  | { role: "user"; text: string };

const SEED_MESSAGE: Message = {
  role: "assistant",
  text: "Hi! I can help you find the perfect email template. What kind of campaign are you planning?",
};

export default function AIChat() {
  const { setSelectedTemplate, campaignCtx } = useCampaignStore();
  const [thread, setThread] = useState<Message[]>([SEED_MESSAGE]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [chips, setChips] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getOptions()
      .then((o) => setChips(o.campaignTypes.slice(0, 4)))
      .catch(() => setChips(["Phase III readout", "Congress invite", "CME series", "Re-engage HCPs"]));
  }, []);

  useEffect(() => {
    if (chips.length > 0 && thread.length === 1 && thread[0].role === "assistant" && !("recs" in thread[0])) {
      setThread([{ role: "assistant", text: SEED_MESSAGE.text, chips }]);
    }
  }, [chips]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread, thinking]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text };
    setThread((t) => [...t, userMsg]);
    setDraft("");
    setThinking(true);

    try {
      const res = await aiChat(text, campaignCtx.therapyArea, campaignCtx.audience);
      const botMsg: Message = {
        role: "assistant",
        text: res.text,
        audience: res.audience || undefined,
        recs: res.recs.length ? res.recs : undefined,
      };
      setThread((t) => [...t, botMsg]);
    } catch {
      setThread((t) => [...t, {
        role: "assistant",
        text: "Sorry, I ran into an issue. Please try again.",
      }]);
    } finally {
      setThinking(false);
    }
  };

  const handleSelectRec = (rec: ChatRec) => {
    const template: TemplateCard = {
      id: rec.id,
      name: rec.name,
      description: rec.reason,
      tone: rec.tone,
      concept: rec.concept,
      opens: rec.opens,
      stars: rec.stars,
      badge: null,
      duration: "—",
    };
    setSelectedTemplate(template);
  };

  return (
    <div className="ai">
      <div className="ai-thread">
        {thread.map((msg, i) => (
          <div key={i} className={`ai-msg${msg.role === "user" ? " user" : ""}`}>
            <div className={`ai-avatar${msg.role === "user" ? " user" : ""}`}>
              {msg.role === "assistant" ? <Sparkles size={12} /> : (process.env.NEXT_PUBLIC_USER_INITIALS ?? "AP")}
            </div>
            <div className={`ai-bubble${msg.role === "user" ? " user" : ""}`}>
              {msg.role === "user" ? (
                <p>{msg.text}</p>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              )}
              {"chips" in msg && msg.chips && (
                <div className="ai-suggests">
                  {msg.chips.map((c) => (
                    <button key={c} className="ai-suggest" onClick={() => send(c)}>{c}</button>
                  ))}
                </div>
              )}
              {"audience" in msg && msg.audience && (
                <div className="ai-from">
                  Suggested audience: <strong>{msg.audience}</strong>
                </div>
              )}
              {"recs" in msg && msg.recs && msg.recs.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {msg.recs.map((rec) => (
                    <div key={rec.id} className="ai-rec" onClick={() => handleSelectRec(rec)}>
                      <div className="ai-rec-thumb" />
                      <div className="ai-rec-body">
                        <div className="ai-rec-title">{rec.name}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>{rec.reason}</div>
                        <div className="ai-rec-meta">
                          <span><Eye size={9} />{rec.opens}</span>
                          <span><Star size={9} />{rec.stars}</span>
                        </div>
                      </div>
                      <div className="ai-rec-score">{rec.score}%</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="ai-msg">
            <div className="ai-avatar">
              <Sparkles size={12} />
            </div>
            <div className="ai-think">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="ai-input">
        <div className="ai-input-box">
          <Sparkles size={14} />
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), send(draft))}
            placeholder="Describe your campaign or ask for a recommendation…"
          />
          <button style={{ color: "var(--muted)", background: "none", border: 0, cursor: "pointer", flexShrink: 0 }} title="Attach brief">
            <Paperclip size={14} />
          </button>
          <button
            className="pad-btn"
            onClick={() => send(draft)}
            disabled={!draft.trim() || thinking}
          >
            <Send size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
