"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Home, Search, Bell, Mail, Sparkles, Plus, Menu, User, ShieldCheck, TrendingUp,
  ChevronDown, MoreHorizontal, Heart, Repeat2, MessageSquare, Share2, Bookmark, Eye
} from "lucide-react";
import { SignalDot } from "@/components/ui/signal-dot";

const navItems = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Search", href: "/search", icon: Search },
  { label: "Topics", href: "/topics", icon: TrendingUp },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Messages", href: "/messages", icon: Mail },
  { label: "Spaces", href: "/spaces", icon: Sparkles },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-dark text-text-dark">
      <div className="mx-auto flex max-w-[1440px] gap-6 px-4 lg:px-8">
        {/* Left sidebar */}
        <aside className="hidden md:flex sticky top-0 h-screen w-[72px] lg:w-[240px] flex-col items-start gap-2 py-6">
          <Link href="/" className="flex items-center gap-3 px-3 mb-6 hover:opacity-90 transition-opacity">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-signal to-context flex items-center justify-center shadow-[0_0_20px_rgba(29,155,255,0.35)]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <span className="hidden lg:block font-display text-xl font-extrabold tracking-tight">Chirpline</span>
          </Link>

          <nav className="flex flex-col gap-1 w-full">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium text-muted-dark hover:text-text-dark hover:bg-elevated-dark/50 transition-colors">
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 w-full">
            <Link href="/compose" className="flex items-center justify-center lg:justify-start gap-2 rounded-full bg-signal px-4 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(29,155,255,0.3)] hover:shadow-[0_0_35px_rgba(29,155,255,0.45)] hover:-translate-y-0.5 transition-all w-full lg:w-auto">
              <Plus className="h-4 w-4" />
              <span className="hidden lg:inline">New Chirp</span>
              <span className="lg:hidden">Compose</span>
            </Link>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 max-w-[640px] mx-auto lg:mx-0">
          {children}
        </main>

        {/* Right sidebar */}
        <aside className="hidden xl:block w-[320px] sticky top-0 h-screen overflow-y-auto py-6">
          <RightPanel />
        </aside>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <Link href="/search" className="block rounded-2xl border border-hairline-dark/30 bg-elevated-dark/20 p-3 hover:border-hairline-dark/60 transition-colors">
        <div className="flex items-center gap-2 text-muted-dark text-sm">
          <Search className="h-4 w-4" /> Search Chirpline
        </div>
      </Link>

      {/* Trending */}
      <div className="rounded-3xl border border-hairline-dark/20 bg-surface-dark/40 p-5">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted-dark mb-4">Trending now</h3>
        <div className="space-y-4">
          {[
            { tag: "#realtime", posts: "12.4k posts", label: "Technology" },
            { tag: "#signalnewsroom", posts: "8.2k posts", label: "Design" },
            { tag: "#microblogging", posts: "4.1k posts", label: "Community" },
            { tag: "#liveconversation", posts: "2.8k posts", label: "Events" },
          ].map((trend) => (
            <Link key={trend.tag} href="#" className="block group">
              <div className="text-[10px] text-muted-dark">{trend.label}</div>
              <div className="text-sm font-semibold text-text-dark group-hover:text-signal transition-colors">{trend.tag}</div>
              <div className="text-xs text-muted-dark">{trend.posts}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Who to follow */}
      <div className="rounded-3xl border border-hairline-dark/20 bg-surface-dark/40 p-5">
        <h3 className="text-xs font-extrabold uppercase tracking-[0.1em] text-muted-dark mb-4">Who to follow</h3>
        <div className="space-y-3">
          {[
            { name: "Alice Rivera", handle: "alice", role: "Admin" },
            { name: "Bob Chen", handle: "bob", role: "Moderator" },
            { name: "Grace Kim", handle: "grace", role: "Member" },
          ].map((u) => (
            <div key={u.handle} className="flex items-center gap-3">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.handle}`} alt="" className="h-9 w-9 rounded-full bg-elevated-dark" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-text-dark truncate">{u.name}</div>
                <div className="text-xs text-muted-dark truncate">@{u.handle}</div>
              </div>
              <Link href="#" className="rounded-full bg-elevated-dark px-3 py-1 text-xs font-bold text-text-dark hover:bg-signal hover:text-white transition-colors">Follow</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-hairline-dark/20 bg-bg-dark/30 p-4 text-[11px] leading-relaxed text-muted-dark/60">
        All users, posts, and media shown here are fictional test data for a demo project.
      </div>
    </div>
  );
}
