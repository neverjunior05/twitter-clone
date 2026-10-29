"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Smile, BarChart3, Hash, AtSign, X, Link2, Send, Plus } from "lucide-react";

export default function Composer() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [showPoll, setShowPoll] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [threadMode, setThreadMode] = useState(false);
  const [threadPosts, setThreadPosts] = useState<string[]>([""]);
  const maxLength = 280;
  const remaining = maxLength - text.length;

  const handlePost = () => {
    if (!text.trim() && images.length === 0 && !showPoll) return;
    alert("Post created (demo). In production, this would save to the database and broadcast via socket.");
    setText("");
    setImages([]);
    setShowPoll(false);
    setPollOptions(["", ""]);
    setExpanded(false);
    setThreadMode(false);
    setThreadPosts([""]);
  };

  return (
    <div className="rounded-3xl border border-hairline-dark/20 bg-surface-dark/40 p-5">
      <div className="flex gap-3.5">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=alice" alt="You" className="h-11 w-11 rounded-full bg-elevated-dark border border-hairline-dark/30 shrink-0" />
        <div className="min-w-0 flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={() => setExpanded(true)}
            placeholder="What's happening?"
            className="w-full resize-none bg-transparent text-[15px] leading-[1.55] text-text-dark placeholder:text-muted-dark/40 focus:outline-none min-h-[80px]"
            rows={expanded ? 3 : 2}
          />

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {/* Character ring */}
                <div className="my-3 flex items-center gap-3">
                  <div className="relative h-8 w-8 shrink-0">
                    <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#202B38" strokeWidth="2.5" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke={remaining < 0 ? "#F0445A" : remaining < 30 ? "#F5A524" : "#1D9BFF"}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${(remaining / maxLength) * 88}, 88`}
                        className="transition-all duration-300"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-bold text-muted-dark">{remaining}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowPoll(!showPoll)} className="rounded-full p-1.5 text-muted-dark hover:text-context hover:bg-context/10 transition-colors" aria-label="Poll"><BarChart3 className="h-4 w-4" /></button>
                    <button onClick={() => alert("Image picker (demo)")} className="rounded-full p-1.5 text-muted-dark hover:text-signal hover:bg-signal/10 transition-colors" aria-label="Image"><ImageIcon className="h-4 w-4" /></button>
                    <button onClick={() => setThreadMode(!threadMode)} className={`rounded-full p-1.5 transition-colors ${threadMode ? "text-signal bg-signal/10" : "text-muted-dark hover:text-context hover:bg-context/10"}`} aria-label="Thread"><Link2 className="h-4 w-4" /></button>
                  </div>
                </div>

                {showPoll && (
                  <div className="mb-3 rounded-2xl border border-hairline-dark/30 bg-elevated-dark/20 p-3 space-y-2">
                    <span className="text-xs font-bold text-muted-dark">Poll options</span>
                    {pollOptions.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const next = [...pollOptions];
                            next[i] = e.target.value;
                            setPollOptions(next);
                          }}
                          placeholder={`Option ${i + 1}`}
                          className="flex-1 rounded-xl border border-hairline-dark/30 bg-elevated-dark px-3 py-2 text-sm text-text-dark placeholder:text-muted-dark/30 focus:outline-none focus:border-signal/50"
                        />
                        <button onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))} className="text-muted-dark hover:text-error" aria-label="Remove"><X className="h-4 w-4" /></button>
                      </div>
                    ))}
                    {pollOptions.length < 4 && <button onClick={() => setPollOptions([...pollOptions, ""])} className="text-xs text-signal font-medium">+ Add option</button>}
                  </div>
                )}

                {threadMode && (
                  <div className="mb-3 space-y-3">
                    {threadPosts.map((p, i) => (
                      <textarea
                        key={i}
                        value={p}
                        onChange={(e) => {
                          const next = [...threadPosts];
                          next[i] = e.target.value;
                          setThreadPosts(next);
                        }}
                        placeholder={`Thread part ${i + 1}`}
                        className="w-full rounded-2xl border border-hairline-dark/30 bg-elevated-dark/20 px-4 py-3 text-sm text-text-dark placeholder:text-muted-dark/30 focus:outline-none focus:border-signal/50 resize-none min-h-[60px]"
                      />
                    ))}
                    <button onClick={() => setThreadPosts([...threadPosts, ""])} className="flex items-center gap-1 text-xs font-medium text-signal hover:text-signal-bright">
                      <Plus className="h-3.5 w-3.5" /> Add another post
                    </button>
                  </div>
                )}

                {/* Media previews */}
                {images.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative rounded-2xl overflow-hidden border border-hairline-dark/20 w-24 h-24">
                        <img src={img} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 rounded-full bg-black/50 text-white p-0.5 hover:bg-black/70" aria-label="Remove"><X className="h-3 w-3" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-3 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-dark">Who can reply: </span>
              <select
                className="rounded-xl bg-elevated-dark border border-hairline-dark/20 px-2 py-1 text-xs text-text-dark focus:outline-none focus:border-signal/50"
                defaultValue="everyone"
              >
                <option value="everyone">Everyone</option>
                <option value="following">People you follow</option>
                <option value="mentioned">People you mention</option>
              </select>
            </div>
            <button
              onClick={handlePost}
              disabled={!text.trim() && images.length === 0 && !showPoll}
              className="rounded-full bg-signal px-5 py-2 text-sm font-bold text-white shadow-[0_0_20px_rgba(29,155,255,0.25)] hover:shadow-[0_0_30px_rgba(29,155,255,0.4)] disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 hover:-translate-y-0.5 transition-all"
            >
              Chirp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
