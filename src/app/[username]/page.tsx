"use client";
import AppLayout from "@/components/layout/app-layout";
import { ShieldCheck, Lock, MapPin, Link as LinkIcon, Calendar } from "lucide-react";

export default function ProfilePage({ params }: { params: { username: string } }) {
  const username = params.username;
  const isProtected = username === "carol";
  const isVerified = username === "alice" || username === "frank" || username === "ivy";
  const isOrg = username === "frank";

  return (
    <AppLayout>
      <div className="max-w-[640px] mx-auto">
        {/* Banner */}
        <div className="relative h-48 rounded-t-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80" alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 to-transparent" />
        </div>

        {/* Profile info */}
        <div className="relative px-5 pb-6 -mt-14">
          <div className="flex items-end gap-4">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
              alt={`${username}`}
              className={`h-24 w-24 rounded-2xl border-4 border-bg-dark bg-elevated-dark shadow-2xl ${isOrg ? "rounded-xl" : "rounded-full"}`}
            />
            <div className="flex-1" />
            <div className="flex gap-2">
              <a href="#" className="rounded-full border border-hairline-dark/40 bg-elevated-dark/40 px-4 py-2 text-sm font-semibold text-text-dark hover:bg-elevated-dark transition-colors">Edit profile</a>
              <a href="#" className="rounded-full bg-signal px-4 py-2 text-sm font-bold text-white hover:shadow-[0_0_20px_rgba(29,155,255,0.4)] transition-all">Follow</a>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-text-dark">{username.charAt(0).toUpperCase() + username.slice(1)} {isVerified ? (<ShieldCheck className="h-4 w-4 text-signal inline" />) : null}</h1>
              {isProtected && <Lock className="h-4 w-4 text-muted-dark" />}
            </div>
            <p className="text-sm text-muted-dark">@{username}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-text-dark">Building something new every day. Thoughts on tech, design, and the future of the web.</p>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-dark">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> San Francisco, CA</span>
              <a href="#" className="flex items-center gap-1 hover:text-signal"><LinkIcon className="h-3.5 w-3.5" /> example.com</a>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined 2023</span>
            </div>

            <div className="mt-3 flex gap-6 text-sm">
              <a href="#" className="hover:underline"><strong className="text-text-dark">482</strong> <span className="text-muted-dark">Following</span></a>
              <a href="#" className="hover:underline"><strong className="text-text-dark">1,204</strong> <span className="text-muted-dark">Followers</span></a>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-hairline-dark/20 px-5">
          <div className="flex gap-6">
            {["Posts", "Replies", "Media", "Likes"].map((tab) => (
              <a key={tab} href="#" className={`pb-3 text-sm font-semibold ${tab === "Posts" ? "text-signal border-b-2 border-signal" : "text-muted-dark hover:text-text-dark"}`}>
                {tab}
              </a>
            ))}
          </div>
        </div>

        <div className="px-4 py-5 space-y-4">
          <p className="text-sm text-muted-dark">This profile is for demo purposes. All data is fictional.</p>
          {isProtected && (
            <div className="rounded-2xl border border-warning/30 bg-warning/5 p-4 text-sm text-warning">
              <strong>Protected account.</strong> Only approved followers can see their posts and reply.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
