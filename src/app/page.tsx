"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SignalDot } from "@/components/ui/signal-dot";
import { ArrowRight, Zap, MessageSquare, TrendingUp, ShieldCheck, Sparkles } from "lucide-react";

export default function LandingPage() {
  const [hoverPost, setHoverPost] = useState<number | null>(null);

  const demoPosts = [
    { id: 1, author: "alice", handle: "alice", text: "Just launched our new real-time feed. Every update pulses like a live signal.", time: "2m ago", likes: 42 },
    { id: 2, author: "bob", handle: "bob", text: "Threads should feel like rooms, not walls. The conversation is the product.", time: "5m ago", likes: 128 },
    { id: 3, author: "carol", handle: "carol", text: "Working on bridging agreement for context notes. The math is fascinating.", time: "12m ago", likes: 36 },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-bg-dark text-text-dark selection:bg-signal-soft/20">
      {/* Hero */}
      <section className="relative z-10 flex min-h-[92vh] items-center justify-center px-6">
        {/* Background decorative gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-signal-deep/20 blur-[100px]" />
          <div className="absolute -right-20 top-40 h-[400px] w-[400px] rounded-full bg-context/20 blur-[80px]" />
        </div>

        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className="inline-flex items-center gap-2.5 rounded-full border border-hairline-dark/60 bg-surface-dark/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-dark backdrop-blur-md hover:border-signal/30 hover:text-signal-bright transition-colors">
              <SignalDot /> Independent demo project — not affiliated with any platform
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
            className="font-display text-[clamp(3rem,10vw,7rem)] font-extrabold leading-[0.92] tracking-tight text-text-dark"
          >
            Live conversations.
            <br />
            <span className="bg-gradient-to-r from-signal-bright via-signal to-context bg-clip-text text-transparent">Real-time signal.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="max-w-xl text-lg leading-relaxed text-muted-dark"
          >
            Chirpline is an original microblogging demo. Short posts, real-time threads, live rooms,
            and transparent ranking — built as a learning project with no proprietary assets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-4"
          >
            <Link href="/home" className="group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(29,155,255,0.3)] hover:shadow-[0_0_40px_rgba(29,155,255,0.45)] hover:-translate-y-0.5 transition-all">
              Enter the feed <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link href="#features" className="inline-flex items-center gap-2 rounded-full border border-hairline-dark/60 bg-elevated-dark/40 px-7 py-3.5 text-sm font-medium text-text-dark hover:border-hairline-dark hover:bg-elevated-dark transition-all">
              Explore features
            </Link>
          </motion.div>

          {/* Mock live timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-12 w-full max-w-md"
          >
            <div className="rounded-[20px] border border-hairline-dark/50 bg-surface-dark/40 backdrop-blur-xl p-5 shadow-2xl shadow-black/20">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-muted-dark">Live timeline</h3>
                <span className="flex items-center gap-1.5 text-[10px] text-live font-medium">
                  <SignalDot /> LIVE
                </span>
              </div>
              <div className="space-y-4">
                {demoPosts.map((post) => (
                  <button
                    key={post.id}
                    onMouseEnter={() => setHoverPost(post.id)}
                    onMouseLeave={() => setHoverPost(null)}
                    className="w-full text-left rounded-2xl bg-elevated-dark/30 border border-hairline-dark/30 p-4 hover:border-signal/40 transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt="" className="h-7 w-7 rounded-full bg-elevated-dark" />
                      <div>
                        <div className="text-xs font-semibold text-text-dark">{post.author}</div>
                        <div className="text-[10px] text-muted-dark">@{post.handle} · {post.time}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-text-dark/90">{post.text}</p>
                    <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-dark">
                      <span className="hover:text-like transition-colors">♥ {post.likes}</span>
                      <span>↻ 12</span>
                      <span>↳ 3</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-hairline-dark/30 bg-surface-dark/20 py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text-dark">Built for live conversation</h2>
            <p className="mt-4 text-muted-dark">Every feature designed around transparency, speed, and real-time interaction.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Zap, title: "Real-time feed", desc: "Live updates with scroll anchoring and a new-posts pill. Every change pulses instantly." },
              { icon: MessageSquare, title: "Threaded replies", desc: "Conversations unfold naturally with visual thread lines, reply controls, and context notes." },
              { icon: TrendingUp, title: "Transparent ranking", desc: "For You ranking uses a documented formula: recency, relationship, velocity, and topic match." },
              { icon: ShieldCheck, title: "Safety built in", desc: "Blocking, muting, reporting, and moderation tools with transparency messages and audit logs." },
              { icon: Sparkles, title: "Live rooms", desc: "Audio rooms with speaker rings, raised hands, and live chat — with a graceful WebRTC fallback." },
            ].map((f) => (
              <div key={f.title} className="group relative rounded-3xl border border-hairline-dark/30 bg-elevated-dark/20 p-8 hover:border-signal/30 hover:bg-elevated-dark/40 transition-all hover:-translate-y-1">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-signal-soft/10 text-signal">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-text-dark">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-dark">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer footer */}
      <footer className="border-t border-hairline-dark/20 bg-bg-dark/60 py-12 px-6">
        <div className="mx-auto max-w-5xl flex flex-col items-center gap-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline-dark/50 bg-surface-dark/40 px-4 py-2 text-xs text-muted-dark">
            <ShieldCheck className="h-3.5 w-3.5 text-context" />
            Independent demo — all data is fictional
          </div>
          <h3 className="font-display text-3xl font-extrabold tracking-tight">Chirpline</h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted-dark">
            Chirpline is an independent learning project inspired by the general category of microblogging platforms.
            It is NOT affiliated with, endorsed by, or a copy of any existing company. All users, posts, and media are fictional test data.
            Before any real launch: implement age verification (COPPA / GDPR-K compliance), privacy policies, content moderation duties,
            DMCA copyright processes, DSA transparency obligations, data export/deletion rights, and terms of service.
            Seek legal advice before deploying to production.
          </p>
          <div className="mt-4 text-xs text-muted-dark/60">
            Design system: Signal Newsroom · Fonts: Inter / Sora / JetBrains Mono · All imagery from Unsplash / Pexels · Avatars via DiceBear
          </div>
          <div className="mt-6 flex gap-8 text-xs text-muted-dark/40">
            <a href="#" className="hover:text-muted-dark">README</a>
            <a href="#" className="hover:text-muted-dark">Policies</a>
            <a href="#" className="hover:text-muted-dark">Credits</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
